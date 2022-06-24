import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import AdderForm from '../Components/AdderForm';
import EditerForm from '../Components/EditerForm';
import '../CSS/wallet.css';
import actions from '../actions';
import Table from '../Components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { editor, idToEdit } = this.props;
    return (
      <div className="wallet-page">
        <Header />
        { editor ? <EditerForm key={ idToEdit } /> : <AdderForm />}
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => {
  const { wallet: { currencies, editor, idToEdit } } = state;
  return { currencies, editor, idToEdit };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actions.getCurrencies()),
});

Wallet.propTypes = {
  getCurrencies: propTypes.func.isRequired,
  editor: propTypes.bool.isRequired,
  idToEdit: propTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
