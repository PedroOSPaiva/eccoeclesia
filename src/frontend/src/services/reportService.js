import expenseService from './expenseService.js';
import inventoryService from './inventoryService.js';

function sumExpenses(expenses) {
  return expenses.reduce((acc, expense) => acc + Number(expense.amount ?? 0), 0);
}

function groupByCategory(expenses) {
  return expenses.reduce((acc, expense) => {
    const category = expense.category ?? 'Não categorizado';
    acc[category] = (acc[category] ?? 0) + Number(expense.amount ?? 0);
    return acc;
  }, {});
}

function computeInventoryTotals(items) {
  const totals = {
    totalItems: items.length,
    consumables: items.filter((item) => item.type === 'CONSUMABLE').length,
    durables: items.filter((item) => item.type === 'DURABLE').length,
    lowStock: items.filter((item) => item.quantity <= item.minimumQuantity).length
  };
  return totals;
}

const reportService = {
  async loadDashboardData() {
    const [expenses, inventoryItems, alerts] = await Promise.all([
      expenseService.list(),
      inventoryService.listItems(),
      inventoryService.listAlerts()
    ]);

    const expenseTotal = sumExpenses(expenses);
    const groupedExpenses = groupByCategory(expenses);
    const inventorySummary = computeInventoryTotals(inventoryItems);

    return {
      expenses,
      expenseTotal,
      groupedExpenses,
      inventoryItems,
      inventorySummary,
      alerts
    };
  }
};

export default reportService;
