const mongoose =  require('mongoose');

const easyQuestionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String
});
const mediumQuestionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String
});
const hardQuestionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String
});

const easyQuestionModel = mongoose.model('Easy', easyQuestionSchema);
const mediumQuestionModel = mongoose.model('Medium', mediumQuestionSchema);
const hardQuestionModel = mongoose.model('Hard', hardQuestionSchema);
module.exports = {
    Easy: easyQuestionModel,
    Medium: mediumQuestionModel,
    Hard: hardQuestionModel
};