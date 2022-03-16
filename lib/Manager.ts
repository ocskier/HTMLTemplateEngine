const { prompt } = require('inquirer');

const Employee = require('./Employee');
const { validateInput } = require('../utils/helpers');

class Manager extends Employee {
  officeNum: number;

  constructor() {
    super();
    this.officeNumber = null;
  }
  async getManagerInfo() {
    const { officeNum } = await prompt([
      {
        message: `Enter manager's office number: `,
        name: 'officeNum',
        validate: validateInput,
      },
    ]);
    this.officeNum = officeNum;
    return;
  }
  getRole() {
    return 'Manager';
  }
}

module.exports = Manager;

export {};
