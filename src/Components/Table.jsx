import React from 'react';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';
import '../CSS/adderForm.css';
// import actions from '../actions';

class Table extends React.Component {
  render() {
    return (
      <div className="Table-page">
        <table>
          <th>
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
          </th>
        </table>
      </div>);
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

Table.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
