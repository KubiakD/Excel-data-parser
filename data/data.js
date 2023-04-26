const mongoose =  require('mongoose');

const questionsSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String,
    difficultyLevel: String
});
const Question = mongoose.model('Question', questionsSchema);
module.exports = Question;