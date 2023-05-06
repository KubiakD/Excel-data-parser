const mongoose =  require('mongoose');

const questionsSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: String,
    difficultyLevel: String,
    index: String
});
const Question = mongoose.model('Question', questionsSchema);
module.exports = Question;