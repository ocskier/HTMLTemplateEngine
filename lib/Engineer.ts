const Employee = require('./Employee');

class Engineer extends Employee {
    github: string;
    
    constructor(name: string, email: string, username: string) {
        super(name, email)
        this.github = username;
    }
    getGithub() {
        return this.github
    }
    getRole() {
        return 'Engineer'
    }
}

module.exports = Engineer;
