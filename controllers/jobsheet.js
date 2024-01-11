const db = require("../models");
const Quiz = db.quizzes;

exports.submitOne = async (req, res) => {
// data yang didapatkan dari inputan oleh pengguna 
const jobsheet = {
    quizId: req.body.quizId,
    answer: req.body.answer,
};

try {
    let benar = 0
    let totalSoal = jobsheet.quizid.length
    for (let i = 0; i < totalSoal; i++) {
        const quiz = await Quiz.findOne({
            limit: 1,
            where: {
                id: jobsheet.quizId[i]
            },
            order: [ [ 'id', 'DESC' ]],
        });
        if(quiz.key == jobsheet.answer[i]){ 
            benar = benar + 1
        }
    }
    res.status(200).json({
        message: `benar ${benar} dari ${totalSoal} soal`
    })
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};