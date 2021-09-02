const Department = require("../lib/Department.js");

test('creates an department object', () => {
    const department = new Department(1, "Department of Mysteries");
    expect(department.getId()).toEqual(expect.any(Number));
    expect(department.getName()).toEqual(expect.any(String));
})