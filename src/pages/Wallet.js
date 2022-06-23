import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import actions from '../actions';
import Loading from './Loading';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { userEmail, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
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
  const { email, loading } = user;
  const { currencies } = wallet;
  return { userEmail: email, currencies, loading };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actions.getCurrencies()),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
  getCurrencies: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
