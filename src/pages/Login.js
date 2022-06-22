import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import actions from '../actions';

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
    const { loginEmail, loginPassword } = this.props;
    const { email, password, emailMatch } = this.state;
    const PASSSIZE = 5;
    console.log(emailMatch);
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <span>Password</span>
              <input
                type="text"
                id="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={ () => {
                if (emailMatch && password.length > PASSSIZE) {
                  console.log('test');
                  loginEmail(email);
                  loginPassword(password);
                }
              } }
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
};

export default connect(null, mapDispatchToProps)(Login);
