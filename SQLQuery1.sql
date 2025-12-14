CREATE DATABASE EmployeeMaster;

CREATE TABLE Departments (
    DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
    DepartmentCode NVARCHAR(10) NOT NULL UNIQUE,
    DepartmentName NVARCHAR(100) NOT NULL
);


CREATE TABLE Employees (
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Salary DECIMAL(18,2) NOT NULL,
    DepartmentId INT NOT NULL,
    CONSTRAINT FK_Employees_Departments
        FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);
