
# Tech stack used:
 - React JS with styled components on frontend
 - Node JS on backend
 - MongoDB as database

## System Requirements

System should have Node and mongoDB.

# Steps to run:

## Backend:

Go to `/server` directory and runs the server in the development mode.
- Install dependencies:
### `npm install`

- Start MongoDB server:
### `sudo systemctl start mongodb`


- Run server:
### `npm start`

It will run on port 3001

### `npm run seed`

Seeds data on /server to generate extra salary & paid holiday tables content.

-----------------------------------------------------------------
## Frontend:

Go to `/client` directory and runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## Statement:
I didn't fully understand the requirement for this challenge.
I have done the task by what I get from the shared test document.

Which includes:
- Fill project name and its description (project field) 
- create API to publish it, which will be stored in the database.
- For calculate balance, I have use the stated formula:

 - "2 Learning Units (LU) + 80 Experience Units (EU) = 1 PDU"

- On Professional Developement Units, it will show how many PDUs are get generated with EU & LU values
- To go to next level, it will show how many EU & LU on "TO GO" section
- I have created two "get apis" for "Extra Salary" and "Paid Holidays"
- And integrated it on frontend
- Added a text editor on frontend for taking project description
