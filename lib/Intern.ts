const { prompt } = require('inquirer');

const Employee = require('./Employee');
const { validateInput } = require('../utils/helpers');

class Intern extends Employee {
  school: string;

  constructor() {
    super();
    this.school = '';
  }
  async getInternInfo() {
    const { school } = await prompt([
      {
        message: 'Enter his/her school: ',
        name: 'school',
        validate: validateInput,
      },
    ]);
    this.school = school;
    return;
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
