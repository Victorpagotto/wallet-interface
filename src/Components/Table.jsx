import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/adderForm.css';
import actions from '../actions';
import '../CSS/table.css';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpense, editExpense, isEditing } = this.props;
    return (
      <div className="table-page">
        <table className="expenses-table">
          <tbody>
            <tr className="table-head">
              <th className="description-cell">Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expenses.map((expense) => {
                const {
                  currency, exchangeRates, value, method, tag, description, id,
                } = expense;
                const currencyData = Object.values(exchangeRates)
                  .find((exRate) => exRate.code === currency);
                const currName = currencyData.name.split('/')[0];
                return (
                  <tr key={ id } className="table-info">
                    <td className="description-cell">{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ parseFloat(value).toFixed(2) }</td>
                    <td>{ currName }</td>
                    <td>{ parseFloat(currencyData.ask).toFixed(2) }</td>
                    <td>
                      {
                        (value * parseFloat(currencyData.ask))
                          .toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => {
                          editExpense(id);
                          isEditing();
                        } }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => {
                          deleteExpense(id);
                        } }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actions.deleteExpense(id)),
  editExpense: (id) => dispatch(actions.IdToEditAct(id)),
  isEditing: () => dispatch(actions.editorAct()),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteExpense: propTypes.func.isRequired,
  editExpense: propTypes.func.isRequired,
  isEditing: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
