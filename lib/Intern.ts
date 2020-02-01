const Employee = require('./Employee');

class Intern extends Employee {
  school: string;

  constructor(name: string, email: string, school: string) {
    super(name, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return 'Intern';
  }
}

module.exports = Intern;

export {};
