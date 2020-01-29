const Employee = require('./Employee');

class Manager extends Employee {
    officeNumber: number;
    
    constructor(name: string, email: string, num: number) {
        super(name, email)
        this.officeNumber = num;
    }
    getRole() {
        return 'Manager'
    }
}

module.exports = Manager;

export {}