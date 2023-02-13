import db from "../db/init";

class Subject {
  constructor(DepartmentName, Semester, SubjectName, SubjectCode) {
    (this.DepartmentName = DepartmentName),
      (this.Semester = Semester),
      (this.SubjectName = SubjectName),
      (this.SubjectCode = SubjectCode);
  }
  async save() {
    return db
      .collection("Subjects")
      .add({
        DepartmentName: this.DepartmentName,
        Semester: this.Semester,
        Semester: this.SubjectName,
        SubjectCode: this.SubjectCode,
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      })
      .catch(() => {
        return new Promise((resolve, reject) => {
          reject(true);
        });
      });
  }
}

export default Subject;
