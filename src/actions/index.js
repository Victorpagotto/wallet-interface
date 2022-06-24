// Coloque aqui suas actions
// currencies: [], // array de string
// expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
// editor: false, // valor booleano que indica de uma despesa está sendo editada
// idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

async function getExchanges() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endPoint)
    .then((res) => res.json());
}

// User actions

function emailAct(info) {
  return { type: 'EMAIL', info };
}

function passwordAct(info) {
  return { type: 'PASSWORD', info };
}

function loadingAct() {
  return { type: 'LOAD' };
}

// Wallet actions

function currenciesAct(...info) {
  return { type: 'CURRENCIES', info: [...info] };
}

function totalExpense(total, exchange) {
  const converted = total * exchange;
  return { type: 'TOTALEXPENSE', info: converted };
}

function expensesAct(info) {
  return async (dispatch) => {
    const { id, value, description, currency, method, tag } = info;
    const exchangeRates = await getExchanges();
    const infoObject = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const ExchangeValue = parseFloat(Object.values(exchangeRates).find((exRate) => (
      exRate.code === currency
    )).ask);
    dispatch(totalExpense(value, ExchangeValue));
    dispatch({ type: 'EXPENSES', info: infoObject });
  };
}

function editorAct() {
  return { type: 'EDITOR' };
}

function IdToEditAct(info) {
  return { type: 'IDTOEDIT', info };
}

// API calling

function getCurrencies() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(loadingAct());
    return fetch(endPoint)
      .then((res) => res.json())
      .then(async (res) => {
        dispatch(currenciesAct(...Object.keys(res).filter((curr) => curr !== 'USDT')));
        dispatch(loadingAct());
      })
      .catch((error) => {
        dispatch(loadingAct());
        throw new Error(error);
      });
  };
}

const actions = {
  emailAct,
  passwordAct,
  currenciesAct,
  expensesAct,
  editorAct,
  IdToEditAct,
  getCurrencies,
  getExchanges,
  totalExpense,
};

export default actions;
