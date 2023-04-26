const xlsx = require('xlsx');
const file = xlsx.readFile('./LoreQuiz.xlsx');
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
            correctAnswer: questionObj.correctAnswer
        };
        modifiedQuestionArr.push(modifiedObj);
    })
}