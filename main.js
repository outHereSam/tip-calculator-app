const bill = document.getElementById('billAmount');
const numPeople = document.getElementById('numPeople');
const tipPerPerson = document.getElementById('tipAmount');
const totalPerPerson = document.getElementById('totalPerPerson');

const tipPercentages = document.querySelectorAll('.tip-percentage');
const customTip = document.getElementById('customValue');
const reset = document.getElementById('reset');

// Setting initial values
let billAmount = 0.0;
let numberOfPeople = 1;
let tipAmountPerPerson = '$' + (0.00).toFixed(2);
let totalAmountPerPerson = '$' + (0.00).toFixed(2);

tipPerPerson.innerHTML = tipAmountPerPerson;
totalPerPerson.innerHTML = totalAmountPerPerson;

let tipValue = 0.15;
let customTipPercentage = 0.00;

function getBill() {
    if (bill.value) {
        billAmount = parseFloat(bill.value);
        console.log(billAmount);
    }
}

function getNumPeople() {
    if (numPeople.value < 1) {
        numPeople.style.border = "solid 3px hsl(0, 100%, 70%)";
        document.querySelector('.people-label').classList.add('error-label');
    } else {
        numPeople.style.border = "solid 3px hsl(172, 67%, 45%)";
        document.querySelector('.people-label').classList.remove('error-label');
        numberOfPeople = parseInt(numPeople.value);
        console.log(numberOfPeople);
    }
    calcTip();
}

function handleClick(e) {
    tipPercentages.forEach(tip => {
        tip.classList.remove('selected-percentage');
        if (e.target.innerHTML === tip.innerHTML) {
            tip.classList.add('selected-percentage');
            tipValue = parseFloat(tip.innerHTML.slice(0, -1)) / 100;
        }
    });

    calcTip();
}

function getCustomTip() {
    tipPercentages.forEach(tip => {
        tip.classList.remove('selected-percentage');
    });
    customTipPercentage = parseFloat(customTip.value) / 100
    calcTip();
}

function resetValues() {
    bill.value = "";
    numPeople.value = "";
    tipPerPerson.innerHTML = tipAmountPerPerson;
    totalPerPerson.innerHTML = totalAmountPerPerson;
    customTip.value = "";

    tipPercentages.forEach(tip => {
        tip.classList.remove('selected-percentage');
    });
}

bill.addEventListener('input', getBill);

tipPercentages.forEach(percentage => {
    percentage.addEventListener('click', handleClick);
});

customTip.addEventListener('input', getCustomTip);

numPeople.addEventListener('input', getNumPeople);

reset.addEventListener('click', resetValues);

function calcTip() {
    if (numberOfPeople >= 1) {
        // Calculate the tip
        let tipAmount = billAmount * tipValue;
        let tipValuePerPerson = parseFloat((tipAmount / numberOfPeople).toFixed(2));
        tipPerPerson.innerHTML = "$" + tipValuePerPerson;

        let billPerPerson = parseFloat((billAmount / numberOfPeople).toFixed(2));

       let totalBillPerPerson = billPerPerson + tipValuePerPerson;

        totalPerPerson.innerHTML = "$" + totalBillPerPerson;
    }
}