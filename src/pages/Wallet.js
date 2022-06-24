import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import AdderForm from '../Components/AdderForm';
import '../CSS/wallet.css';
import actions from '../actions';
import Table from '../Components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    return (
      <div className="wallet-page">
        <Header />
        <AdderForm />
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => {
  const { wallet: { currencies } } = state;
  return { currencies };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actions.getCurrencies()),
});

Wallet.propTypes = {
  getCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
