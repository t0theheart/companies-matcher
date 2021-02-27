async function start() {
    createMessagesContainer();
    await getAndCreateToggleList('/multiplicators/list', 'multiplicators-toggles');
    await getAndCreateToggleList('/reports/income/topics', 'income-toggles');
    await getAndCreateToggleList('/reports/balance/topics', 'balance-toggles');
    await getAndCreateToggleList('/reports/cash/topics', 'cash-toggles');
    createDividendRow();
}