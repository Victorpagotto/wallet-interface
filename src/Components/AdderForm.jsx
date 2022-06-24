import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import FormSelector from './FormSelector';
import '../CSS/adderForm.css';
import actions from '../actions';
import Loading from './Loading';

class AdderForm extends React.Component {
  state = {
    value: 0,
    description: '',
    chosenCurrency: '',
    method: '',
    category: '',
    methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    categories: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  }

  componentDidMount() {
    const { methods, categories } = this.state;
    this.setState({
      method: methods[0],
      category: categories[0],
    });
  }

  getExpenseID = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      let biggestID = expenses.sort((a, b) => b.id - a.id)[0].id;
      biggestID += 1;
      return biggestID;
    }
    return 0;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { currencies, sendExpense, loading } = this.props;
    const { value, description, chosenCurrency, method, category } = this.state;
    const { methods, categories } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="adder-form-container">
        <form className="adder-form">
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <FormSelector
            itemName="chosenCurrency"
            text="Moeda"
            arrList={ currencies }
            testId="currency-input"
            stateValue={ chosenCurrency }
            handleChange={ this.handleChange }
          />
          <FormSelector
            itemName="method"
            text="Pagamento por"
            arrList={ methods }
            testId="method-input"
            stateValue={ method }
            handleChange={ this.handleChange }
          />
          <FormSelector
            itemName="category"
            text="Tag"
            arrList={ categories }
            testId="tag-input"
            stateValue={ category }
            handleChange={ this.handleChange }
          />
          <label htmlFor="value">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ () => {
              sendExpense({
                id: this.getExpenseID(),
                currency: chosenCurrency === '' ? currencies[0] : chosenCurrency,
                tag: category,
                value,
                description,
                method,
              });
              this.setState({ value: 0 });
            } }
          >
            Adicionar despesa
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, loading } }) => ({
  currencies,
  expenses,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (info) => dispatch(actions.expensesAct(info)),
});

AdderForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  sendExpense: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
  })).isRequired,
  loading: propTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdderForm);
