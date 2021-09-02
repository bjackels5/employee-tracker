class Role {
    constructor(id, title, salary, deptId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deptId = deptId;
    }

    getId() { return this.id; };
    getTitle() { return this.title; };
    getSalary() { return this.salary; };
    getDeptId() { return this.deptId; };
};

module.exports = Role;