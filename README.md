# Employee Tracker
This challenge for Module 12 of the Coding Bootcamp is to create an app to track employees.

* [User Story](#userStory)

* [Requirements](#requirements)

* [Bonus Requirements](#bonusRequirements)

* [Technologies Used](#techUsed)

* [What I Learned](#whatILearned)

* [Employee Tracker Screenshot](#webImage)

* [Employee Tracker Demo](#projectDemo)

* [Contact Me](#contactMe)


---

<a id="userStory"></a>
## User Story

* AS A business owner
* I WANT to be able to view and manage the departments, roles, and employees in my company
* SO THAT I can organize and plan my business
--- 


<a id="requirements"></a>
## Requirements
* When the command line application starts up, the user is presented with the following options:
    * View all departments
        * The user is presented with a formatted table showing department names and department ids
    * view all roles
        * The user is presented with the job title, role id, the department that role belongs to, and the salary for that role
    * view all employees
        * The user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    * add a department
        * The user is prompted to enter the name of the department and that department is added to the database
    * add a role
        * The user is prompted to enter the name, salary, and department for the role and that role is added to the database
    * add an employee
        * The user is prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database. An employee is not required to have a manager.
    * update an employee role
        * The user is prompted to select an employee to update and their new role and this information is updated in the database
* The database schema must follow this schema:
![Employee Tracker Schema](./media/12-sql-homework-demo-02.png)

    * Department:
        * id: INT PRIMARY KEY
        * name: VARCHAR(30) to hold department name
    * Role
        * id: INT PRIMARY KEY
        * title: VARCHAR(30) to hold role title
        * salary: DECIMAL to hold role salary
        * department_id: INT to hold reference to department role belongs to

    * Employee
        * id: INT PRIMARY KEY
        * first_name: VARCHAR(30) to hold employee first name
        * last_name: VARCHAR(30) to hold employee last name
        * role_id: INT to hold reference to employee role
        * manager_id: INT to hold reference to another employee that is manager of the current employee. This field might be null if the employee has no manager.

---

<a id="bonusRequirements"></a>
## Bonus Requirements

* Update employee managers.
* View employees by manager.
* View employees by department.
* Delete departments, roles, and employees.
* View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

---


<a id="techUsed"></a>
## Technologies Used
* inquirer
* mysql2.0
* console table package

--- 

<a id="whatILearned"></a>
## I learned how to
* Configure a Node.js application to connect to a MySQL database.
* Create and drop databases and tables.
* Use CRUD (create, read, update, and delete) methods to work with persistent data.
* Create schema and seed files for the development of your application.
* Write join statements to establish relations between data in three separate tables using primary and foreign keys.
* Explain the use and importance of prepared statements.

---

<a id="webImage"></a>
## Employee Tracker Screenshot

![Employee Tracker](./media/employee-tracker.png)

---

## Employee Tracker Demo

<a id="projectDemo"></a>

<a href="https://youtu.be/TRyEJ-cYpcg">
   <img src="./media/employee-tracker-demo.png">
</a>

---

<a id="contactMe"></a>
## Contact Me
You can reach me, Brenda Jackels, at bjackels5@gmail.com.
