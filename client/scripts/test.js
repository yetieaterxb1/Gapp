console.log('test.js')

// Test POST /signup
fetch('http://localhost:8000/signup', {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({
    username: 'admin',
    password: 'password'
  }),
  headers: {
    "Content-Type": "application/json"
  }
}).then(res => res.json())
.then(response => console.log(response.message))

// Test POST /login 
fetch('http://localhost:8000/login', {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({
    username: 'admin',
    password: 'password'
  }),
  headers: {
    "Content-Type": "application/json"
  }
}).then(res => res.json())
.then(response => console.log(response.message))

fetch('http://localhost:8000/logout', {
  method:'GET'
})

