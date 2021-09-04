
const Role = require('../lib/Role.js');
const Employee = require("../lib/Employee.js");
const vc = require('../utils/validityChecks');


test('creates an Employee object', () => {
    let employee = new Employee(  1,
                                  "Brenda",
                                  "Jackels",
                                  new Role(4, "Software Engineer"),
                                  null);
    expect(employee.getFirstName()).toEqual(expect.any(String));
    expect(employee.getLastName()).toEqual(expect.any(String));
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.hasManager()).toBe(false);
    expect(employee.getRole().getId()).toEqual(expect.any(Number));

    let employee2 = new Employee(1, "Sarah","Molina", new Role(5, "Event Management"), employee);
    expect(employee2.getFirstName()).toEqual(expect.any(String));
    expect(employee2.getLastName()).toEqual(expect.any(String));
    expect(employee2.getName()).toEqual(expect.any(String));
    expect(employee2.getId()).toEqual(expect.any(Number));
    expect(employee2.hasManager()).toBe(true);
    expect(employee2.getManager().getId()).toEqual(expect.any(Number));
    expect(employee2.getRole().getId()).toEqual(expect.any(Number));
    
    
})

test('updates an Employee role', () => {
    const employee = new Employee(  1,
                                    "Brenda",
                                    "Jackels",
                                    new Role(4, "Software Engineer"),
                                    null);
    expect(employee.getRole().getId()).toBe(4);
    // employee role is 4, changing it to 6
    employee.updateRole(new Role(6, "Event Directory"));
    expect(employee.getRole().getId()).toBe(6);
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