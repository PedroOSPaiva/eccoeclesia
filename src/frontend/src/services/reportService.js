import expenseService from './expenseService.js';
import inventoryService from './inventoryService.js';
import revenueService from './revenueService.js';

function sumAmounts(records) {
  return records.reduce((acc, entry) => acc + Number(entry.amount ?? 0), 0);
}

function groupByCategory(records) {
  return records.reduce((acc, entry) => {
    const category = entry.category ?? 'Não categorizado';
    acc[category] = (acc[category] ?? 0) + Number(entry.amount ?? 0);
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
  async loadDashboardData(filters = {}) {
    const [expenses, revenues, inventoryItems, alerts] = await Promise.all([
      expenseService.list(filters),
      revenueService.list(filters),
      inventoryService.listItems(),
      inventoryService.listAlerts()
    ]);

    const expenseTotal = sumAmounts(expenses);
    const revenueTotal = sumAmounts(revenues);
    const groupedExpenses = groupByCategory(expenses);
    const groupedRevenues = groupByCategory(revenues);
    const inventorySummary = computeInventoryTotals(inventoryItems);

    return {
      expenses,
      revenues,
      expenseTotal,
      revenueTotal,
      netResult: revenueTotal - expenseTotal,
      groupedExpenses,
      groupedRevenues,
      inventoryItems,
      inventorySummary,
      alerts
    };
  },

  async loadFinancialData(filters = {}) {
    const [expenses, revenues] = await Promise.all([
      expenseService.list(filters),
      revenueService.list(filters)
    ]);
    return {
      expenses,
      revenues
    };
  }
};

export default reportService;
