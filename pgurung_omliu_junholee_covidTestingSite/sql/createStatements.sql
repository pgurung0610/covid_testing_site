CREATE DATABASE COVID_19_Testing;

USE COVID_19_Testing;

CREATE TABLE Employee (
    employeeID VARCHAR(20),
    email VARCHAR(50), -- key
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    passcode VARCHAR(50),
    PRIMARY KEY (employeeID),
    UNIQUE (email)
);

CREATE TABLE LabEmployee (
    labID VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (labID),
    UNIQUE (email)
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
    testBarcode VARCHAR(50),
    poolBarcode VARCHAR(50),
    FOREIGN KEY (testBarcode) REFERENCES EmployeeTest(testBarcode),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
);

CREATE TABLE WellTesting (
    poolBarcode VARCHAR(50),
    wellBarcode VARCHAR(50),
    testingStartTime DATETIME,
    testingEndTime DATETIME,
    result VARCHAR(11) DEFAULT "in progress",
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode),
    FOREIGN KEY (wellBarcode) REFERENCES Well(wellBarcode)
);