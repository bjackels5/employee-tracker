class Employee {
    constructor(id, firstName, lastName, roleId, managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
        this.id = id;
    }

    getFirstName() { return this.firstName; };
    getLastName() { return this.lastName; };
    getName() { return this.firstName + " " + this.lastName; }
    getRoleId() { return this.roleId; }
    getMgrId() { return this.managerId; }
    getId() { return this.id; };
}

module.exports = Employee;