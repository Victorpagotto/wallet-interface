import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div className="wallet-page">
        <header className="wallet-header">
          <h2 className="user-email" data-testid="email-field">{ userEmail }</h2>
          <p className="user-revenue">
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
  const { user } = state;
  const { email } = user;
  return { userEmail: email };
};

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
