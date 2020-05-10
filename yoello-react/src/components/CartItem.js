
import React from 'react';
/**
* Component for a navigation top bar
*/
export default class CartItem extends React.Component
{
    render()
    {
        return (
            <span>
                <div id="item-cost">
                    <img className="item-image"
                        style=
                        {
                            {
                                backgroundImage: `url("${this.props.item.image_url}")`
                            }
                        }
                    >
                    </img>
                    <div className="sub-heading">£{(this.props.item.price / 100).toFixed(2)}</div>
                </div>
                <button className="delete-button"
                onClick={this.props.clearItem}></button>
                <span>
                    <span id="beer-name" className="summary-bold-text">{this.props.item.name}</span>
                </span>
                <span className="button-group">
                    <button className="amount-button"
                    onClick={() => this.props.setAmount(this.props.amount - 1)}disabled={this.props.amount === 0}>-</button>
                    <span  className="summary-text">{this.props.amount}</span>
                    <button className="amount-button"
                    onClick={() => this.props.setAmount(this.props.amount + 1)}
                    disabled={this.props.amount === this.props.maxUnits}>+</button>
                </span>
                    <span id="description" className="summary-text">{this.props.item.tagline} ABV {this.props.item.abv}</span>
                
            </span>
        );
    }
}