// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = { email: '', password: '', loading: false };

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { ...state, email: action.info };
  case 'PASSWORD':
    return { ...state, password: action.info };
  case 'LOAD':
    return { ...state, loading: !state.loading };
  default:
    return state;
  }
};

export default user;
