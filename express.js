const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

let todo = [
  {id: 0, Task: "Dinner", Status: "Incomplete"},
  {id: 1, Task: "Washing", Status: "Complete"},
  {id: 2, Task: "Kitty Cuddling", Status: "Ongoing"}
];

let id = 2;

app.use(bodyParser.json())

app.get('/api/todos', (req, res) => {
  console.log('GET todo')
  res.send(todo)
})

app.get('/api/todos/:id', (req, res) => {
  console.log('GET todo')
  res.send(todo[req.params.id])
})

app.put('/api/todos/:id', (req, res) =>{
  console.log('PUT todo')
  req.body.id = parseInt(req.params.id);
  todo[req.params.id] = req.body
  res.send(todo[req.params.id])
})

app.delete('/api/todos/:id', (req, res) => {
  console.log('DELETE todo')
  res.send(todo)
})

app.post('/api/todos', (req, res) =>{
  req.body.id = ++id
  todo.push(req.body);
  res.send(todo);
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port);
