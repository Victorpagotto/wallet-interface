import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/header.css';

class Header extends React.Component {
  totalCalculator(expenses) {
    return expenses.reduce((acc, expense) => {
      const { value } = expense;
      const exRate = parseFloat(Object.values(expense.exchangeRates)
        .find((curr) => curr.code === expense.currency).ask);
      acc += parseFloat(value) * exRate;
      return acc;
    }, 0);
  }

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header className="header">
        <div className="header-container">
          <h2 className="user-email" data-testid="email-field">{ userEmail }</h2>
          <p className="user-revenue">
            Total:
            <span className="money-amount" data-testid="total-field">
              { this.totalCalculator(expenses).toFixed(2) }
            </span>
            <span className="money-amount-currency" data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </div>
      </header>);
  }
}

const mapStateToProps = (state) => {
  const { user: { email }, wallet: { expenses } } = state;
  return { userEmail: email, expenses };
};

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
