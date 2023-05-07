const xlsx = require('xlsx');
const file = xlsx.readFile('./LoreQuiz.xlsx');
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./data/data');

const checkAndUpdate = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('db connected!');
  // fetch questions from db
  const existingQuestions = await Question.find({},{'_id':0, '__v':0}).lean();
  for (const sheet in file.Sheets) {
    const currentSheet = file.Sheets[sheet];
    const questionsArr = xlsx.utils.sheet_to_json(currentSheet);
    // transform answers into array 
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
        index: questionObj.index
      };
      modifiedQuestionArr.push(modifiedObj);
    });
    // filter out questions for update 
    const filteredExistingQuestions = existingQuestions.filter(question => question.difficultyLevel === sheet);
    const questionsForUpdate = [];
    for (const question of modifiedQuestionArr){
      const dbCounterpart = filteredExistingQuestions.find(q=>question.index === q.index);
      if(JSON.stringify(dbCounterpart)!== JSON.stringify(question)) {
       questionsForUpdate.push(question);
      } else {
        console.log('No changes detected');
      };
    };
    // filter out questions for delete 
    const existingQuestionsIndexArr = filteredExistingQuestions.map(question => question.index);
    const readQuestionsIndexArr = modifiedQuestionArr.map(question => question.index);
    const questionIndexesToRemove = existingQuestionsIndexArr.filter(index => !readQuestionsIndexArr.includes(index)); 
    // update questions in db 
    for (const question of questionsForUpdate) {
        await Question.updateOne({index: question.index}, {$set: {...question}});
        console.log(`Question ${question.question} updated!`);
    };
    // delete questions in db 
    for (const index of questionIndexesToRemove) {
      await Question.deleteOne({index});
      console.log(`Question ${index} deleted!`);
    };
  };
};
checkAndUpdate();
