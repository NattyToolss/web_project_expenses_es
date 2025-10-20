let budgetValue = 0;
let totalExpensesValue = 0;
let expenseEntries = [];
let balanceColor = "green";

// Datos iniciales
expenseEntries.push(["groceries", 33]);
expenseEntries.push(["restaurants", 50]);
expenseEntries.push(["transport", 12]);
expenseEntries.push(["home", 70]);
expenseEntries.push(["subscriptions", 14]);
expenseEntries.push(["groceries", 28]);
expenseEntries.push(["subscriptions", 12]);

// Cálculos
function calculateTotalExpenses() {
  totalExpensesValue = 0;
  expenseEntries.forEach(([_, amt]) => (totalExpensesValue += amt));
  return totalExpensesValue;
}

function calculateAverageExpense() {
  return expenseEntries.length ? totalExpensesValue / expenseEntries.length : 0;
}

function calculateBalance() {
  return budgetValue - totalExpensesValue;
}

// Actualiza la variable global balanceColor
function updateBalanceColor(balance) {
  if (budgetValue === 0) balanceColor = "green";
  else if (balance < 0) balanceColor = "red";
  else if (balance < budgetValue * 0.25) balanceColor = "orange";
  else balanceColor = "green";

  return balanceColor;
}

// Gastos por categoría
function calculateCategoryExpenses(category) {
  return expenseEntries
    .filter(([cat]) => cat === category)
    .reduce((sum, [_, amt]) => sum + amt, 0);
}

function calculateLargestCategory() {
  const categories = [
    "groceries",
    "restaurants",
    "transport",
    "home",
    "subscriptions",
  ];
  let maxCat = "",
    maxValue = 0;

  categories.forEach((cat) => {
    const total = calculateCategoryExpenses(cat);
    if (total > maxValue) {
      maxValue = total;
      maxCat = cat;
    }
  });

  return [maxCat, maxValue];
}

function addExpenseEntry(entry) {
  expenseEntries.push(entry);
  calculateTotalExpenses();
  updateStats();
}

function parseBudgetInput(raw) {
  if (typeof raw !== "string") raw = String(raw || "");
  let cleaned = raw.trim().replace(/[^0-9.,-]/g, "");

  if (cleaned.indexOf(",") !== -1 && cleaned.indexOf(".") === -1) {
    cleaned = cleaned.replace(/,/g, "");
  } else {
    cleaned = cleaned.replace(/,/g, "");
  }

  const num = Number(cleaned);
  return isNaN(num) ? NaN : num;
}

function initBudgetHandler() {
  const setBtn = document.querySelector(".budget__set-btn");
  const input = document.querySelector(".budget__input");
  if (!setBtn || !input) return;

  setBtn.addEventListener("click", () => {
    const value = parseBudgetInput(input.value);
    if (!isNaN(value) && value >= 0) {
      budgetValue = value;
      const balance = calculateBalance();
      updateBalanceColor(balance); // actualiza balanceColor global
      updateStats();
    } else {
      alert("Ingresa un presupuesto válido");
    }
  });
}

function updateStats() {
  calculateTotalExpenses();
  const balance = calculateBalance();
  updateBalanceColor(balance);
}
