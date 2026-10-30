# Income Tax Calculator (New Tax Regime)

A simple web-based income tax calculator for Indian taxpayers, built with plain HTML, CSS and JavaScript. It calculates tax under the **New Tax Regime** (FY 2026-27 / AY 2027-28) from a yearly income.

## Features

- Slab-wise tax calculation (7 slabs, 0% to 30%)
- Standard deduction of ₹75,000 for salaried individuals
- Section 87A rebate (zero tax up to ₹12 lakh taxable income)
- Marginal relief just above ₹12 lakh
- Surcharge for high incomes (above ₹50 lakh)
- 4% Health & Education Cess
- Indian number format in the output (e.g. 15,00,000)

## Project Structure

```
Income-Tax-Calculator/
├── index.html   # Page layout: input, checkbox, button, result
├── first.js     # All calculation logic
├── style.css    # Styling
└── README.md    # Project documentation
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any browser, or use the **Live Server** extension in VS Code.
3. Enter your yearly income, tick **Salaried hoon** if applicable, and click **Calculate Income**.

## Tax Slabs Used (New Regime)

| Taxable income | Tax rate |
|---|---|
| Up to ₹4 lakh | Nil |
| ₹4 – ₹8 lakh | 5% |
| ₹8 – ₹12 lakh | 10% |
| ₹12 – ₹16 lakh | 15% |
| ₹16 – ₹20 lakh | 20% |
| ₹20 – ₹24 lakh | 25% |
| Above ₹24 lakh | 30% |

Each rate applies only to the part of income that falls inside that slab.

## Surcharge Rates

| Total income | Surcharge |
|---|---|
| Up to ₹50 lakh | Nil |
| ₹50 lakh – ₹1 crore | 10% |
| ₹1 crore – ₹2 crore | 15% |
| Above ₹2 crore | 25% |

## How the Calculation Works

1. Take the yearly income from the input.
2. If salaried, subtract the standard deduction (₹75,000) to get the **taxable income**.
3. Calculate **slab-wise tax** on the taxable income.
4. Apply the **rebate and marginal relief**:
   - Taxable income up to ₹12 lakh: tax is ₹0.
   - Above ₹12 lakh: tax = the smaller of (slab tax, income above ₹12 lakh).
5. Add **surcharge** (on the tax) if applicable.
6. Add **4% cess** on (tax + surcharge).
7. Round the final amount and show it on screen.

## Sample Test Cases

| Yearly income | Salaried? | Expected total tax |
|---|---|---|
| ₹12,00,000 | No | ₹0 |
| ₹12,10,000 | No | ₹10,400 |
| ₹15,00,000 | No | ₹1,09,200 |
| ₹15,00,000 | Yes | ₹97,500 |
| ₹60,00,000 | No | ₹15,78,720 |

## Code Overview (`first.js`)

| Part | Purpose |
|---|---|
| `SLABS` | Array of objects holding each slab's upper limit (`upto`) and `rate` |
| `calculateSlabTax()` | Loops over slabs and adds tax on the portion of income in each slab |
| `applyRebate()` | Applies the 87A rebate and marginal relief |
| `getSurchargeRate()` | Returns the surcharge rate for the given income |
| Submit handler | Reads the inputs, runs the steps above, and prints the result |

## Limitations

- Only the New Tax Regime is supported (no Old Regime comparison).
- Surcharge marginal relief (near ₹50 lakh, ₹1 crore, ₹2 crore) is not implemented.
- No input validation for empty or negative values.
- Treats every user as a resident individual (NRIs are not eligible for the 87A rebate).
- Does not handle capital gains, family pension or employer NPS contribution.
- TDS / advance tax adjustment is not included yet.

## Future Improvements

- [ ] Input validation and error messages
- [ ] Surcharge marginal relief
- [ ] Show a breakdown (taxable income, tax, surcharge, cess)
- [ ] TDS field to show balance tax or refund
- [ ] Old Regime and a side-by-side comparison
- [ ] Better styling with CSS

---

## Disclaimer

This project is for learning purposes. Tax rules can change, so please verify the final numbers on the official Income Tax portal or with a Chartered Accountant before filing.
