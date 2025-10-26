const tabs = document.querySelectorAll('.tab');
const calculators = document.querySelectorAll('.calculator');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const calcId = this.getAttribute('data-calc');
    
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    calculators.forEach(c => c.classList.remove('active'));
    document.getElementById(calcId).classList.add('active');
  });
});

function addToDisplay(value) {
  const display = document.getElementById('display');
  if (display.value === 'Error') display.value = '';
  display.value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function backspace() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const display = document.getElementById('display');
  try {
    const result = eval(display.value);
    addHistory('Math', display.value + ' = ' + result);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function calcBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const result = document.getElementById('bmi-result');
  
  if (!height || !weight) {
    result.innerHTML = '<p style="color:red">Enter valid values!</p>';
    return;
  }
  
  const bmi = (weight / ((height/100) ** 2)).toFixed(2);
  let category = '';
  let className = '';
  
  if (bmi < 18.5) { category = 'Underweight'; className = 'underweight'; }
  else if (bmi < 25) { category = 'Normal'; className = 'normal'; }
  else if (bmi < 30) { category = 'Overweight'; className = 'overweight'; }
  else { category = 'Obese'; className = 'obese'; }
  
  result.innerHTML = '<p>BMI: <strong>' + bmi + '</strong> (' + category + ')</p>';
  result.className = 'result ' + className;
  addHistory('BMI', 'BMI: ' + bmi + ' (' + category + ')');
}

function calcAge() {
  const dob = document.getElementById('dob').value;
  const result = document.getElementById('age-result');
  
  if (!dob) {
    result.innerHTML = '<p style="color:red">Enter date of birth!</p>';
    return;
  }
  
  const birth = new Date(dob);
  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  result.innerHTML = '<p>Age: <strong>' + years + '</strong> years, <strong>' + months + '</strong> months, <strong>' + days + '</strong> days</p>';
  result.className = 'result normal';
  addHistory('Age', years + ' years, ' + months + ' months, ' + days + ' days');
}

function calcLoan() {
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const term = parseFloat(document.getElementById('term').value);
  const result = document.getElementById('loan-result');
  
  if (!amount || !term) {
    result.innerHTML = '<p style="color:red">Enter valid values!</p>';
    return;
  }
  
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  
  const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const total = emi * numPayments;
  const interest = total - amount;
  
  result.innerHTML = '<p><strong>EMI:</strong> ₹' + emi.toFixed(2) + '</p>' +
                     '<p><strong>Total:</strong> ₹' + total.toFixed(2) + '</p>' +
                     '<p><strong>Interest:</strong> ₹' + interest.toFixed(2) + '</p>';
  result.className = 'result normal';
  addHistory('Loan', 'EMI: ₹' + emi.toFixed(2));
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function addHistory(type, text) {
  const list = document.getElementById('history-list');
  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = '<strong>' + type + ':</strong> ' + text + '<br><small>' + new Date().toLocaleString() + '</small>';
  list.insertBefore(item, list.firstChild);
}

function clearHistory() {
  document.getElementById('history-list').innerHTML = '';
}

window.onload = function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
};