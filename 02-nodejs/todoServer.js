/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/todos', getTodos)
app.post('/todos', insertIntoTodo)
app.get('/todos/:id', getElementById)
app.put('/todos/:id', updateById)
app.delete('/todos/:id', deleteById)
app.use(middleware);
function middleware(req,res,next){
  res.status(404).send("Not Found")
}
var todoList = [];
var id = 0;
function getTodos(req, res) {
   res.status(200).send(todoList);
}
function insertIntoTodo(req, res) {
   let input = req.body;
   input["ID"] = ++id;
   todoList.push(input);
   var idObj = {
     id: id
   }
   res.status(201).send(idObj);
 }
 function getElementById(req, res) {
  let id = parseInt(req.params.id);
  let flag = false;
  if (todoList.length > 0 && id > 0) {
    for (var i = 0; i < todoList.length; i++) {
      let eachId = todoList[i]["ID"]
      if (eachId === id) {
        flag = true;
        break;
      }
    }
  }
  if (flag)
    res.status(200).send(todoList[i])
  else
    res.status(404).send("Not Found")
}
function updateById(req, res) {     // updates the attributes which are sent in the input only 
  let id = parseInt(req.params.id);
  let input = req.body;
  let flag = false;
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["ID"] === id) {
      if (input.title) {
        todoList[i]["title"] = input.title;
      }
      if (input.title) {
        todoList[i]["description"] = input.description;
      }
      if (input.title) {
        todoList[i]["completed"] = input.completed;
      }
      flag = true;
      break;
    }
}
  if (flag)
    res.status(200).send();
  else
    res.status(404).send("Not Found")
}
function deleteById(req, res) {
  let id = parseInt(req.params.id);
  let flag = false;
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i]["ID"] === id) {
      todoList.splice(i, 1);
      flag = true;
      break;
    }
  }
  if (flag)
    res.status(200).send();
  else
    res.status(404).send("Not Found")
}
app.use(bodyParser.json());
//app.listen(3000);
module.exports = app;

