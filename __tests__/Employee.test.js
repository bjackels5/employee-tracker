const Employee = require("../lib/Employee.js");


test('creates an Employee object', () => {
    const employee = new Employee(  1,
                                    "Brenda",
                                    "Jackels",
                                    4,
                                    5);
    expect(employee.getFirstName()).toEqual(expect.any(String));
    expect(employee.getLastName()).toEqual(expect.any(String));
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.getMgrId()).toEqual(expect.any(Number));
    expect(employee.getRoleId()).toEqual(expect.any(Number));
})
