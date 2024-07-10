function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

function calculateNPV() {
    const display = document.getElementById('display');
    const inputs = display.value.split(',').map(Number);
    const rate = inputs.shift();
    const npv = inputs.reduce((acc, cashFlow, i) => acc + cashFlow / Math.pow(1 + rate, i + 1), 0);
    display.value = npv.toFixed(2);
}

function calculateIRR() {
    const display = document.getElementById('display');
    const cashFlows = display.value.split(',').map(Number);
    const irr = (values) => {
        let irr = 0.1, NPV = 0, iterations = 0;
        const precision = 1e-6, maxIterations = 100;
        
        do {
            NPV = values.reduce((acc, val, i) => acc + val / Math.pow(1 + irr, i), 0);
            let derivative = values.reduce((acc, val, i) => acc - i * val / Math.pow(1 + irr, i + 1), 0);
            irr -= NPV / derivative;
            iterations++;
        } while (Math.abs(NPV) > precision && iterations < maxIterations);
        
        return irr * 100;
    }
    display.value = irr(cashFlows).toFixed(2) + '%';
}

function convertUnit() {
    const display = document.getElementById('display');
    const input = display.value.split(' ');
    const value = parseFloat(input[0]);
    const fromUnit = input[1];
    const toUnit = input[3];

    const conversionRates = {
        'miles to km': 1.60934,
        'km to miles': 0.621371,
        'kg to lbs': 2.20462,
        'lbs to kg': 0.453592,
        'usd to eur': 0.84,  // Example rate, update with real-time data
        'eur to usd': 1.19   // Example rate, update with real-time data
    };

    const key = `${fromUnit} to ${toUnit}`;
    const result = value * (conversionRates[key] || 1);
    display.value = result.toFixed(2) + ' ' + toUnit;
}
