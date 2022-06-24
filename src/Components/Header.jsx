import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/header.css';

class Header extends React.Component {
  render() {
    const { userEmail, totalExpense } = this.props;
    return (
      <header className="header">
        <div className="header-container">
          <h2 className="user-email" data-testid="email-field">{ userEmail }</h2>
          <p className="user-revenue">
            Total:
            <span className="money-amount" data-testid="total-field">
              { totalExpense ? totalExpense.toFixed(2) : 0 }
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
  const { user: { email }, wallet: { totalExpense } } = state;
  return { userEmail: email, totalExpense };
};

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  totalExpense: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
