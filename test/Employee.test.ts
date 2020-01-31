const Employee = require('../lib/Employee');

test('Can instantiate Employee instance', () => {
  const e = new Employee();
  expect(typeof e).toBe('object');
});

test('Can set name via constructor arguments', () => {
  const name = 'Alice';
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test('Can set id via constructor argument', () => {
  const testValue = typeof 100;
  const e = new Employee('Foo');
  expect(typeof e.id).toBe(testValue);
});

test('Can set email via constructor argument', () => {
  const testValue = 'test@test.com';
  const e = new Employee('Foo', testValue);
  expect(e.email).toBe(testValue);
});

test('Can get name via getName()', () => {
  const testValue = 'Alice';
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test('Can get id via getId()', () => {
  const testValue = typeof 100;
  const e = new Employee('Foo');
  expect(typeof e.getId()).toBe(testValue);
});

test('Can get email via getEmail()', () => {
  const testValue = 'test@test.com';
  const e = new Employee('Foo', testValue);
  expect(e.getEmail()).toBe(testValue);
});

test('getRole() should return "Employee"', () => {
  const testValue = 'Employee';
  const e = new Employee('Alice', 'test@test.com');
  expect(e.getRole()).toBe(testValue);
});

export {};
