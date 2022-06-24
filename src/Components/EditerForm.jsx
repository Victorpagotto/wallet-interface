import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import FormSelector from './FormSelector';
import '../CSS/adderForm.css';
import actions from '../actions';
// import actions from '../actions';

class AdderForm extends React.Component {
  state = {
    value: 0,
    description: '',
    chosenCurrency: '',
    method: '',
    category: '',
    exchangeList: [],
    methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    categories: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  }

  componentDidMount() {
    const { expenses, id } = this.props;
    const info = expenses.find((expense) => expense.id === id);
    this.setState({
      value: info.value,
      description: info.description,
      chosenCurrency: info.currency,
      method: info.method,
      category: info.tag,
      exchangeList: info.exchangeRates,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { currencies, editExpense, id, isEditing } = this.props;
    const {
      value, description, chosenCurrency, method, category, exchangeList,
    } = this.state;
    const { methods, categories } = this.state;
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
              isEditing();
              editExpense({
                id,
                currency: chosenCurrency === '' ? currencies[0] : chosenCurrency,
                tag: category,
                value,
                description,
                method,
                exchangeRates: exchangeList,
              });
            } }
          >
            Editar despesa
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, idToEdit } }) => ({
  currencies,
  expenses,
  id: idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (info) => dispatch(actions.editExpense(info)),
  isEditing: () => dispatch(actions.editorAct()),
});

AdderForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
  })).isRequired,
  id: propTypes.number.isRequired,
  editExpense: propTypes.func.isRequired,
  isEditing: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdderForm);
