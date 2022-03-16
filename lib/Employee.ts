const { prompt } = require('inquirer');
const validator = require('validator');

const { validateInput } = require('../utils/helpers');

class Employee {
  name: string;
  id: number;
  email: string;
  incrementId: Function;
  static newestId: number;

  constructor() {
    this.name = '';
    this.id = Employee.incrementId();
    this.email = '';
  }
  static incrementId() {
    if (!this.newestId && this.newestId != 0) this.newestId = 0;
    else this.newestId++;
    return this.newestId;
  }
  async getEmpInfo(employeeType: string) {
    const { name, email } = await prompt([
      {
        message: `Enter ${employeeType} name: `,
        name: 'name',
        validate: validateInput,
      },
      {
        message: `Enter the ${employeeType} email: `,
        name: 'email',
        validate: async (input: string) => {
          if (validator.isEmail(input)) return true;
          else return 'Please enter a valid email address!';
        },
      },
    ]);
    this.name = name;
    this.email = email;
    return;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return 'Employee';
  }
}

module.exports = Employee;

export {};
