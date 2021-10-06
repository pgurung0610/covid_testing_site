# Project: Covid Testing Site

## Scenario:
Stony Brook is preparing to start mass weekly testing for all students, faculty and hospital employees (approximately 28K people) using saliva tests. 

Since they cannot test all 28K samples, multiple tests will be mixed together in the same "pool" to be tested at once. A lab employee will put this pool in a testing "well" once it becomes available. If the well turns out negative, all the tests are negative. 

If the well turns out positive, they have to continue testing the remaining saliva for all the participants (also in this binary testing fashion, that is, 50% in a separate well and 50% in another well, and the process continues until all positives are found). 

From 1 saliva sample, they can dilute it to a fixed maximum number of samples (3-5). Given that the positivity cases rate is 0.97-1.29%, at most 50 samples will be batched together in the first step. 
We will develop the Web interface for this testing.

## Technologies used in this project:
Node.js, Express.js, MySQL, EJS

## How it works:
### A] Homepage
In the start of the web page, a login page for Stony Brook employees will be introduced. Below the page, there is also a provided link to login as a Lab Technican, which will take the user to the Lab login page.

### B] Stony Brook employees
Once logged in as an employee, the employee can view their group covid result. For security, it should not be possible for employees to view covid results of other employees.

### C] Lab technicians
If logged in as a technician instead, the technician can choose a number of actions to do:
1. Test Collection:
This is where Stony Brook employees are given a testID
2. Pool Mapping:
This is where Stony Brook employees are grouped to take a test
3. Well Testing:
This is where the group of Stony Brook employees are determined if at least one person in the group has a positive result or not


## How to run the project:
1. To set up the database, look into directory:

        .\covid_testing_site\pgurung_omliu_junholee_covidTestingSite\sql
       
    There are 2 *.sql* files in the foler. 
    
    One file creates the tables and another inserts samples of data for the program to use.

2. To run the project, point directory to:
        
        .\covid_testing_site\pgurung_omliu_junholee_covidTestingSite

    then on console, type:
    
        node index.js

    then on web browser, connect to:

        localhost:3000 
    
    It should present you with the employee homepage.
