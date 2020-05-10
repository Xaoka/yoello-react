
import React from 'react';
/**
* Component for a navigation top bar
*/
export default class CartItem extends React.Component
{
    renderAmountButton(func, limit, text)
    {
        return <button className="amount-button"
        onClick={() => this.props.setAmount(this.props.item, func(this.props.amount))}disabled={this.props.amount === limit}>{text}</button>
    }

    render()
    {
        return (
            <div className="margin-overflow">
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
                <span className="button-group">
                    {this.renderAmountButton((v) => v - 1, 0, '-')}
                    <span  className="summary-text">{this.props.amount}</span>
                    {this.renderAmountButton((v) => v + 1, this.props.config.cart.maxUnits, '+')}
                </span>
                <div id="description" className="summary-text">{this.props.item.tagline}</div>
                </span>
                
            </div>
        );
    }
}