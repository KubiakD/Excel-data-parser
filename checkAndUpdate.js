const xlsx = require('xlsx');
const file = xlsx.readFile('./LoreQuiz.xlsx');
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./data/data');

const checkAndUpdate = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('db connected!');
  for (const sheet in file.Sheets) {
    const currentSheet = file.Sheets[sheet];
    const questionsArr = xlsx.utils.sheet_to_json(currentSheet);
    let modifiedQuestionArr = [];
    questionsArr.map((questionObj) => {
      let answers = [];
      for (const key in questionObj) {
        if (key.includes('answer')) {
          answers.push(questionObj[key]);
        }
      }
      const modifiedObj = {
        question: questionObj.question,
        answers,
        correctAnswer: questionObj.correctAnswer,
        difficultyLevel: questionObj.difficultyLevel,
      };
      modifiedQuestionArr.push(modifiedObj);
    });
    const existingQuestions = await Question.find({},{'_id':0, '__v':0}).lean();
    // const questionsForUpdate = modifiedQuestionArr.filter((question) => {
    //   const existingQuestion = existingQuestions.find(q=>question.correctAnswer === q.correctAnswer);
    //   return JSON.stringify(existingQuestion) !== JSON.stringify(question);
    // });
    let questionsForUpdate = [];
    let questionsForDeleting = [];
    for (const question of modifiedQuestionArr){
      const dbCounterpart = existingQuestions.find(q=>question.correctAnswer === q.correctAnswer);
      if(JSON.stringify(dbCounterpart)!== JSON.stringify(question)) {
        questionsForUpdate.push(question);
      } else if (!dbCounterpart || dbCounterpart.length === 0) {
        questionsForDeleting.push(question);
      } else {
        console.log('No changes detected');
      };
    }
    for (const question of questionsForUpdate) {
        await Question.updateOne({correctAnswer: question.correctAnswer}, {$set: {...question}});
        console.log(`Question ${question.question} updated!`)
    };
  };
};
checkAndUpdate();
