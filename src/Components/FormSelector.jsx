import React from 'react';
import propTypes from 'prop-types';

export default class FormSelector extends React.Component {
  render() {
    const { itemName, text, arrList, testId, stateValue, handleChange } = this.props;
    return (
      <label htmlFor={ itemName }>
        <span>{ text }</span>
        <select
          name={ itemName }
          id={ itemName }
          data-testid={ testId }
          value={ stateValue }
          onChange={ handleChange }
        >
          {
            arrList.map((item, i) => (
              <option key={ `${i}-${item}` } value={ item }>{ item }</option>
            ))
          }
        </select>
      </label>
    );
  }
}

FormSelector.propTypes = {
  itemName: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  arrList: propTypes.arrayOf(propTypes.string).isRequired,
  testId: propTypes.string.isRequired,
  stateValue: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};
