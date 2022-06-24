import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/adderForm.css';
// import actions from '../actions';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="Table-page">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const {
                  currency, exchangeRates, value, method, tag, description, id,
                } = expense;
                const currencyData = Object.values(exchangeRates)
                  .find((exRate) => exRate.code === currency);
                const currName = currencyData.name.split('/')[0];
                return (
                  <tr key={ id }>
                    <td>{ description }</td>
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
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
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

const mapDispatchToProps = () => ({
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
