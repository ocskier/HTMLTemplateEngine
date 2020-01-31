class Employee {
  name: string;
  id: number;
  email: string;
  incrementId: Function;
  static newestId: number;

  constructor(name: string, email: string) {
    this.name = name;
    this.id = Employee.incrementId();
    this.email = email;
  }
  static incrementId() {
    if (!this.newestId && this.newestId != 0) this.newestId = 0;
    else this.newestId++;
    return this.newestId;
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
