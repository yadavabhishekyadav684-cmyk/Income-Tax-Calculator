// New Tax Regime Slabs (FY 2026-27)
const SLABS = [
{upto:400000, rate:0},
{upto:800000, rate:0.05},
{upto:1200000, rate:0.10},
{upto:1600000, rate:0.15},
{upto:2000000, rate:0.20},
{upto:2400000, rate:0.25},
{upto:Infinity, rate:0.30},     // js me array and object dono me trailing commas(,) allowed hai for(future me new element add karna easy)
];

const STANDARD_DEDUCTION = 75000;   // annual income pe deducted amount --> (Tax amt.=Annual Income-Standard Deduction)
const REBATE_LIMIT = 1200000;   //upto 12 lakh yearly income tk if preson is Residental individual then they don't need to pay tax (according to section 87A)
// conclusion if person yearly income is 12 lakh 75 thousnad(1275000) then they dont need to pay tax 
const CESS_RATE = 0.04; // for health and education tax 


// har slab me uske hissa count hoga
function CalculateSlabTax(taxable){     // taxable is user input amount (i.e annual salary of an individual)
    let tax=0;  // initial tax = 0
    let prevLimit=0;    // to store previous upto value

    for(let slab of SLABS){
        if(taxable>prevLimit) {
            const amountInSlab = Math.min(taxable,slab.upto)-prevLimit;
            tax+=amountInSlab*slab.rate;
        }
        prevLimit=slab.upto;
    }
    return tax;
}

// 12 lakh tk tax 0 uske baad marginal relief
function appylRebate(taxable, tax){
    if(taxable<=REBATE_LIMIT) return 0;
    return Math.min(tax, taxable-REBATE_LIMIT);
}

// Calculate additional surcharge rate
function getSurchargeRate(taxable) {
    if(taxable>20000000) return 0.25;
    if(taxable>10000000) return 0.15;
    if(taxable>5000000) return 0.10;
    return 0;
}

    const form = document.querySelector('form');
    const result = document.querySelector('#result');

    form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const income = Number(document.querySelector('#income').value);  // income ki user ke through string me aata hai we have to convert it into number
    const isSalaried = document.querySelector('#salaried').checked;     // .checked returns bool value true or false
    const deduction = isSalaried?STANDARD_DEDUCTION:0;  // ternary operator (to check if salaried then do deduction else no deduction)

    const taxableIncome = Math.max(0,income-deduction);     // in case if person is salaried(able for deduction) but his income less than 75000 in this case it return 0

    const slabTax = CalculateSlabTax(taxableIncome);    // return slabtax amount

    const tax = appylRebate(taxableIncome,slabTax);     // return after rebate/marginal relief

    const surcharge = tax*getSurchargeRate(taxableIncome);

    const cess = (tax + surcharge)*CESS_RATE;

    const totalTax = Math.round(tax + surcharge + cess);

    result.textContent = `Total Tax : ₹ ${totalTax.toLocaleString('en-IN')}`;        // ctrl+alt+4 for rupees Symbol
    // toLocaleString() --> number ko local style me text bna do
    // 'en-IN' --> style ka code(en -> English language, IN -> India)
    form.reset();

    
});