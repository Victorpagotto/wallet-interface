// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.info };
  case 'EXPENSES':
    return { ...state, expenses: action.info };
  case 'EDITOR':
    return { ...state, editor: !state.wallet.editor };
  case 'IDTOEDIT':
    return { ...state, idToEdit: action.info };
  default:
    return state;
  }
};

export default wallet;
