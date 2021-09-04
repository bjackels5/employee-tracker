class Employee {
    constructor(id, firstName, lastName, role, manager = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
        this.id = id;
    }

    getFirstName() { return this.firstName; };
    getLastName() { return this.lastName; };
    getName() { return this.firstName + " " + this.lastName; }
    getRole() { return this.role; }
    getManager() { return this.manager; }
    getId() { return this.id; };
    
    hasManager() { return Boolean(this.manager != null); }

    updateRole(role) { this.role = role; }
}



module.exports = Employee;