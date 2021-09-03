const Department = require("../lib/Department.js");
const vc = require('../utils/validityChecks');

test('creates an department object', () => {
    const department = new Department(1, "Department of Mysteries");
    expect(department.getId()).toEqual(expect.any(Number));
    expect(department.getName()).toEqual(expect.any(String));
})

test('checks if a departmentId is a valid departmentId', () => {
    const depts = [ new Department( 1, "Department of Mysteries"),
                    new Department( 3, "Ministry of Magic"),
                    new Department( 5, "Hogwarts"),
                    new Department( 7, "Hogsmeade"),
                    new Department( 9, "Pit of Despair"),
                ];

    expect(vc.isValidId(depts, 2)).toBe(false);
    expect(vc.isValidId(depts, 4)).toBe(false);
    expect(vc.isValidId(depts, 5)).toBe(true);
})