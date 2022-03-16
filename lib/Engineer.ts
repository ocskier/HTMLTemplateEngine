const { prompt } = require('inquirer');

const Employee = require('./Employee');
const { validateInput } = require('../utils/helpers');

class Engineer extends Employee {
  github: string;

  constructor() {
    super();
    this.github = '';
  }
  async getEngineerInfo() {
    const { githubId } = await prompt([
      {
        message: 'Enter his/her Github id: ',
        name: 'githubId',
        validate: validateInput,
      },
    ]);
    this.github = githubId;
    return;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return 'Engineer';
  }
}

module.exports = Engineer;

export {};
