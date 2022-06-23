import React from 'react';
import '../CSS/loading.css';

export default class loading extends React.Component {
  render() {
    return (
      <div className="loading-page">
        <h1 className="loading-message">Carregando...</h1>
      </div>);
  }
}
