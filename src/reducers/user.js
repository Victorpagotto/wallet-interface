// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = { email: '', password: '', loading: false };

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { ...state, user: { ...state.user, email: action.info } };
  case 'PASSWORD':
    return { ...state, user: { ...state.user, password: action.info } };
  case 'LOADING':
    return { ...state, user: { ...state.user, loading: !state.user.loading } };
  default:
    return state;
  }
};

export default user;
