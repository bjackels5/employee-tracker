const Employee = require("../lib/Employee.js");
const vc = require('../utils/validityChecks');


test('creates an Employee object', () => {
    let employee = new Employee(  1,
                                    "Brenda",
                                    "Jackels",
                                    4,
                                    null);
    expect(employee.getFirstName()).toEqual(expect.any(String));
    expect(employee.getLastName()).toEqual(expect.any(String));
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.hasManager()).toBe(false);
    expect(employee.getRoleId()).toEqual(expect.any(Number));

    employee = new Employee(  1, "Sarah","Molina",5, 3);
    expect(employee.getFirstName()).toEqual(expect.any(String));
    expect(employee.getLastName()).toEqual(expect.any(String));
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.hasManager()).toBe(true);
    expect(employee.getMgrId()).toEqual(expect.any(Number));
    expect(employee.getRoleId()).toEqual(expect.any(Number));
    
    
})

test('updates an Employee role', () => {
    const employee = new Employee(  1,
                                    "Brenda",
                                    "Jackels",
                                    4,
                                    5);
    expect(employee.getRoleId()).toBe(4);
    // employee role is 4, changing it to 6
    employee.updateRoleId(6);
    expect(employee.getRoleId()).toBe(6);
})

test('checks if an employeeId is a valid eployeeId', () => {
    const employees =   [   new Employee(1, "Brenda", "Jackels", 4, 5),
                            new Employee(3, "Sarah", "Molina", 4, 5),
                            new Employee(5, "Isaac", "Molina", 4, 5)
                ];

    expect(vc.isValidId(employees, 2)).toBe(false);
    expect(vc.isValidId(employees, 4)).toBe(false);
    expect(vc.isValidId(employees, 5)).toBe(true);
})