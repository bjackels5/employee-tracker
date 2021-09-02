const Role = require("../lib/Role.js");

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