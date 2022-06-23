import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import actions from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div className="wallet-page">
        <header className="wallet-header">
          <h2 className="user-email" data-testid="email-field">{ userEmail }</h2>
          <p className="user-revenue">
            Total:
            <span className="money-amount" data-testid="total-field">
              { 0 }
            </span>
            <span className="money-amount-currency" data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => {
  const { user, wallet } = state;
  const { email } = user;
  const { currencies } = wallet;
  return { userEmail: email, currencies };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actions.getCurrencies()),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
  getCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
