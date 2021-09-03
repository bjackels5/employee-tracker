const Role = require("../lib/Role.js");
const vc = require('../utils/validityChecks');

test('creates a Role object', () => {
    const role = new Role(  1,
                            "Engineer",
                            60000.52,
                            2);

    expect(role.getTitle()).toEqual(expect.any(String));
    expect(role.getId()).toEqual(expect.any(Number));
    expect(role.getSalary()).toEqual(expect.any(Number));
    expect(role.getDeptId()).toEqual(expect.any(Number));
})

test('checks if a roleId is a valid roleId', () => {
    const roles = [ new Role( 1, "Engineer", 60000.52, 2),
                    new Role( 3, "Role 2", 32.10, 2),
                    new Role( 5, "Role 2", 32.10, 2),
                    new Role( 7, "Role 2", 32.10, 2),
                    new Role( 9, "Role 2", 32.10, 2)
                ];

    expect(vc.isValidId(roles, 2)).toBe(false);
    expect(vc.isValidId(roles, 4)).toBe(false);
    expect(vc.isValidId(roles, 5)).toBe(true);
})