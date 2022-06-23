// Coloque aqui suas actions
// currencies: [], // array de string
// expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
// editor: false, // valor booleano que indica de uma despesa está sendo editada
// idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

// User actions
function loadAct() {
  return { type: 'LOAD' };
}

function emailAct(info) {
  return { type: 'EMAIL', info };
}

function passwordAct(info) {
  return { type: 'PASSWORD', info };
}

// Wallet actions

function currenciesAct(...info) {
  return { type: 'CURRENCIES', info: [...info] };
}

function expensesAct(...info) {
  return { type: 'EXPENSES', info: [...info] };
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
    dispatch(loadAct());
    return fetch(endPoint)
      .then((res) => res.json())
      .then((res) => {
        dispatch(currenciesAct(...Object.keys(res).filter((curr) => curr !== 'USDT')));
        dispatch(loadAct());
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

const actions = {
  loadAct,
  emailAct,
  passwordAct,
  currenciesAct,
  expensesAct,
  editorAct,
  IdToEditAct,
  getCurrencies,
};

export default actions;
