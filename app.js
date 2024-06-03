const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b !== 0 ? a / b : 'Cannot divide by zero';
}

app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const result = add(Number(num1), Number(num2));
    res.send(`Result: ${result}`);
});

app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    const result = subtract(Number(num1), Number(num2));
    res.send(`Result: ${result}`);
});

app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const result = multiply(Number(num1), Number(num2));
    res.send(`Result: ${result}`);
});

app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    const result = divide(Number(num1), Number(num2));
    res.send(`Result: ${result}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
});

module.exports = { app, server, add, subtract, multiply, divide };
