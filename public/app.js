document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    fetch(`/${operation}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `num1=${num1}&num2=${num2}`
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('result').textContent = data;
    })
    .catch(error => console.error('Error:', error));
});
