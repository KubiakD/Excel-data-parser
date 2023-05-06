const mongoose =  require('mongoose');

const questionsSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String,
    difficultyLevel: String,
    index: Number
});
const Question = mongoose.model('Question', questionsSchema);
module.exports = Question;