# Todo List App
A simple full-stack todo list app

I wanted to try out some technologies I haven't used before (GraphQL/Apollo Client, Material UI (in the context of React), React Context API) by building a simple app. The application is full-stack and updates to the list are automatically persisted in the Database.

Technologies Used: React (with functional components & hooks), Material UI, Context API, GraphQL, Apollo Client, NodeJS, Express, MySQL

Check out this short demo gif of the app: 
![todo-list-demo](https://user-images.githubusercontent.com/26422409/124152565-a7648e00-da61-11eb-9aaa-979ea491ad0b.gif)


## Usage
To run locally: 
1. Create database/table via ```todoDbCreate.sql``` script
2. Add user with read/write permissions to Db
3. Update ```server.js``` lines 50-51 with your new local Db username and password


4. Install server dependencies - in ```root``` run ```npm install```
5. Install client dependencies - in ```client/``` run ```npm install```


7. Start server - in ```root``` run ```npm run start``` (http://localhost:4000)
8. Start client - in ```client/``` run ```npm run start``` (http://localhost:3000/)
