class Department {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }

    getName() { return this.name; };
    getId() { return this.id; };
}

module.exports = Department;
