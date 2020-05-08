import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './punkapi/api.js';

class StoreItem extends React.Component {
    render() {
      return (
        <button className="square">
          {/* TODO */}
        </button>
      );
    }
  }
  
  class Catalog extends React.Component {
    renderStoreItem(i) {
      return <StoreItem />;
    }
  
    render() {
      const status = 'Demo App';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="store-row">
            {this.renderStoreItem(0)}
            {this.renderStoreItem(1)}
            {this.renderStoreItem(2)}
          </div>
          <div className="store-row">
            {this.renderStoreItem(3)}
            {this.renderStoreItem(4)}
            {this.renderStoreItem(5)}
          </div>
          <div className="store-row">
            {this.renderStoreItem(6)}
            {this.renderStoreItem(7)}
            {this.renderStoreItem(8)}
          </div>
        </div>
      );
    }
  }
  
  class Store extends React.Component {
    render() {
      return (
        <div className="store">
          <div className="catalog">
            <Catalog />
          </div>
          <div className="navigation-bar">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Store />,
    document.getElementById('root')
  );
  