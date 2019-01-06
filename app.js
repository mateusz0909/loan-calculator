document.getElementById('loan-form').addEventListener('submit', function (e) {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('results').style.display = 'none';

  setTimeout(calculateAmount, 1500);
  e.preventDefault();
});

function calculateAmount() {

  //UI variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);


  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (calculatedPayments * monthly).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loader').style.display = 'none';

  } else {

    if (!document.querySelector('.alert')) {
      showError('Please check the input values');
      document.getElementById('loader').style.display = 'none'
    } else {
      false
    }


  }


}

function showError(text) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(text));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  card.insertBefore(errorDiv, heading);

  setTimeout(removeAlert, 3000);


}

function removeAlert() {
  document.querySelector('.alert').remove();
}