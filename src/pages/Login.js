import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import actions from '../actions';
import '../CSS/login.css';

class Login extends React.Component {
  state = {
    email: '',
    emailMatch: false,
    password: '',
  }

  handleChange = ({ target }) => {
    const { value, name, type } = target;
    if (type === 'email') {
      this.setState({ [name]: value, emailMatch: !target.validity.typeMismatch });
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { loginEmail, loginPassword, history } = this.props;
    const { email, password, emailMatch } = this.state;
    const PASSSIZE = 5;
    return (
      <div className="login-page">
        <form className="login-form">
          <div className="login-container">
            <label htmlFor="email" className="login-input-label">
              <span>Email</span>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="email-input"
                placeholder="Insira seu e-mail."
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="login-container">
            <label htmlFor="password" className="login-input-label">
              <span>Password</span>
              <input
                type="text"
                id="password"
                name="password"
                data-testid="password-input"
                placeholder="Insira sua senha."
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="login-button">
            <button
              type="button"
              onClick={ () => {
                loginEmail(email);
                loginPassword(password);
                history.push('/carteira');
              } }
              disabled={ !(emailMatch && password.length > PASSSIZE) }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (info) => dispatch(actions.emailAct(info)),
  loginPassword: (info) => dispatch(actions.passwordAct(info)),
});

Login.propTypes = {
  loginEmail: propTypes.func.isRequired,
  loginPassword: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
