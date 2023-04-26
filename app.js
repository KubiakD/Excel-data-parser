const xlsx = require('xlsx');
const file = xlsx.readFile('./LoreQuiz.xlsx');
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./data/data');

const readAndSave = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected!')
    for (const sheet in file.Sheets) {
        const currentSheet = file.Sheets[sheet]
        const questionsArr = xlsx.utils.sheet_to_json(currentSheet);
    let modifiedQuestionArr = [];
    questionsArr.map(questionObj => {
        let answers = []
        for (const key in questionObj) {
            if (key.includes('answer')) {
                answers.push(questionObj[key])
            };
        }
        const modifiedObj = {
            question: questionObj.question,
            answers,
            correctAnswer: questionObj.correctAnswer,
            difficultyLevel: questionObj.difficultyLevel
        };
        modifiedQuestionArr.push(modifiedObj);
    })
    for( const question of modifiedQuestionArr) {
                const newQuestion = new Question(question);
                await newQuestion.save();
                console.log('Question saved!')
    }};
    return console.log('Saving finished!')
};
readAndSave();