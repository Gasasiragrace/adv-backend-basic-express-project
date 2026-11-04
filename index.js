const express = require('express');
const app = express();
const PORT = 3000;

// parse JSON request bodies
app.use(express.json());

// middleware that runs on every request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

app.get('/about', (req, res) => {
  res.send('About page: this server is built with Express.js.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at hello@example.com');
});

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.send(`You requested user with ID: ${id}`);
});

app.get('/search', (req, res) => {
  const name = req.query.name;
  res.send(`You searched for: ${name}`);
});

app.post('/users', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User received', user });
});

// Optional challenge: Courses API
const courses = [
  { id: 1, title: 'Intro to Node.js' },
  { id: 2, title: 'Express Fundamentals' },
];

app.get('/courses', (req, res) => res.json(courses));

app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

app.post('/courses', (req, res) => {
  const newCourse = { id: courses.length + 1, title: req.body.title };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
