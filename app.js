const http = require('http')
const port = 3000

let students = [
  'Chris',
  'Travis',
  'Lorenzo'
];

let todo = {};

todo['Dinner'] = 'Not Done';
todo['Washing'] = 'Done';


function handleMyRequest(request, response) {
  if (request.url === '/students') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.end(JSON.stringify(students));
  }
  else if (request.url === '/api/todos') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    if (request.method === 'GET') {
      response.end(JSON.stringify(todo));
    }
    else if (request.method === 'POST') {
      request.on('end', function() {
      var search = location.search.substring(1);
      search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                       function(key, value) { return key===""?value:decodeURIComponent(value) }):{};
      response.end(JSON.stringify(todo));
      todo.push(JSON.parse(search));
    })
    }
  }
  else if (request.url === '/kitten') {
    response.end(`I'm a kitten! Meow!`);
  }
  else if (request.url === '/api/teapot') {
    response.writeHead(418)
    response.end(`I'm a teapot!`)
  }
  else {
    response.writeHead(404);
    response.end();
  }
}

const server = http.createServer(handleMyRequest)

console.log(`Server is running on port ${port}`)
server.listen(port);
