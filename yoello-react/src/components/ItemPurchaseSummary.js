import React from 'react';
  /**
   * Component for handling shopping cart display and animation
   */
  export default class ItemPurchaseSummary extends React.Component
  {
    render()
    {
        const item = this.props.item || { name: "Loading", description: "Loading", image_url: "imgs/beer.jpg" };
        return (
            <span>
                <span id="beer-name" className="summary-text">{item.name}</span>
                <span className="button-group">
                    <button className="amount-button"
                    onClick={() => this.props.setAmount(this.props.amount - 1)}disabled={this.props.amount === 0}>-</button>
                    <span  className="summary-text">{this.props.amount}</span>
                    <button className="amount-button"
                    onClick={() => this.props.setAmount(this.props.amount + 1)}
                    disabled={this.props.amount === this.props.maxUnits}>+</button>
                </span>
                <span id="description" className="summary-text">{item.description}</span>
            </span>
        );
    }
  }