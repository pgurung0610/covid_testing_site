-- Only include this first command if the database already exists, otherwise comment it out
DROP DATABASE COVID_19_Testing;

CREATE DATABASE COVID_19_Testing;

USE COVID_19_Testing;

CREATE TABLE Employee (
    employeeID VARCHAR(20),
    email VARCHAR(50), -- key
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (employeeID),
    UNIQUE (email)
);

CREATE TABLE LabEmployee (
    labID VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (labID)
);

CREATE TABLE Pool (
    poolBarcode VARCHAR(50),
    PRIMARY KEY (poolBarcode)
);

CREATE TABLE Well (
    wellBarcode VARCHAR(50),
    PRIMARY KEY (wellBarcode)
);

CREATE TABLE EmployeeTest (
    testBarcode VARCHAR(50),
    employeeID VARCHAR (20) NOT NULL,
    collectionTime DATETIME,
    collectedBy VARCHAR(50),
    PRIMARY KEY (testBarcode),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (collectedBy) REFERENCES LabEmployee(labID)
);

CREATE TABLE PoolMap (
    poolBarcode VARCHAR(50),
    testBarcode VARCHAR(50),
    PRIMARY KEY (poolBarcode, testBarcode),
    FOREIGN KEY (testBarcode) REFERENCES EmployeeTest(testBarcode),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
);

CREATE TABLE WellTesting (
    wellBarcode VARCHAR(50),
    poolBarcode VARCHAR(50),
    testingStartTime DATETIME,
    testingEndTime DATETIME,
    result VARCHAR(11) DEFAULT "in progress",
    PRIMARY KEY (wellBarcode, poolBarcode),
	FOREIGN KEY (wellBarcode) REFERENCES Well(wellBarcode),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
);