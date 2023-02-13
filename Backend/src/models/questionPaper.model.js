import db from '../db/init';

class QuestionPaper {

    constructor(departmentName, semester, subjectName, year, examName, fileUrl,uid,fileName,qid) {
        this.departmentName = departmentName;
        this.semester = semester;
        this.subjectName = subjectName;
        this.year = year;
        this.examName = examName;
        this.fileUrl = fileUrl;
        this.uid=uid;
        this.fileName=fileName;
    }
    async save() {
        return db.collection('questionPaper').add({
            'departmentName': this.departmentName,
            'semester': this.semester,
            'subjectName': this.subjectName,
            'year': this.year,
            'examName': this.examName,
            'fileUrl': this.fileUrl,
            'uid':this.uid,
            'fileName':this.fileName
        }).then(() => {
            return new Promise((resolve, reject) => {
                resolve(true)
            })
        }).catch((e) => {
            return new Promise((resolve, reject) => {
                reject(false)
            })
        })
    }

    async find() {
        return db.collection('questionPapers').get().then((snapshot) => {
            let papers = [];
            snapshot.forEach((doc) => {
                papers.push(doc.data());
            });
            return new Promise((resolve, reject) => {
                resolve(papers);
            })
        }).catch((e) => {
            return new Promise((resolve, reject) => {
                reject(false);
            })
        })
    }
}

export default QuestionPaper;