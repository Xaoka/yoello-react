import React from 'react';
import CartItem from './CartItem';
import { formatAsCurrency } from '../utils/text';
  /**
   * Component for handling shopping cart display and animation
   */
  export default class Cart extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.tipStyles =
        {
            ZERO: (sub) => 0,
            ROUND_UP: (sub) => (100 * (Math.ceil(sub / 100))) - sub,
            TEN_PERCENT: (sub) => sub * 0.1,
            CUSTOM: (sub) => sub
        }
        this.state =
        {
            tipStyle: this.tipStyles.ROUND_UP,
            freshCartItem: null
        }
    }

    /**
     * Sets the state if the input is a valid state
     * @param {string} style 
     */
    handleTipStyleChange(style)
    {
        console.log(`Set style ${style}`);
        this.setState({ tipStyle: style });
    }

    /**
     * Toggles the window state between OPEN and CLOSED
     */
    toggleOpen()
    {
        if (this.props.userFlowState === this.props.userStates.CART)
        {
            this.props.setUserFlowState(this.props.userStates.STORE);
        }
        else
        {
            this.props.setUserFlowState(this.props.userStates.CART);
        }
    }

    renderTipButton(style, text)
    {
        return (
            <button
                onClick={() => this.handleTipStyleChange(style)}
                // :(
                style=
                {{
                    padding: "0px 13px"
                }}    
            >{text}</button>
        )
    }

    renderCartItems()
    {
        // TODO: Sort by order added to cart
        const itemEntryKeys = Object.keys(this.props.items);
        if (itemEntryKeys.length > 0)
        {
            const itemsJSX = [];
            for (const key of itemEntryKeys)
            {
                const item = this.props.items[key];
                itemsJSX.push(<CartItem key={key}
                    item={item.item}
                    amount={item.amount}
                    setAmount={(item, amount) => this.props.updateCartEntry(item, amount)}
                    clearItem={(item) => this.props.clearItem(item)}
                    config={this.props.storeConfig}/>)
            }
            return itemsJSX;
        }
        else
        {
            return (<span className="centre-text summary-text">Nothing in here yet!</span>)
        }
    }
  
    render()
    {
        // Calculate how far up to slide the window
        let offset;
        switch (this.props.userFlowState)
        {
            case this.props.userStates.CART:
                offset = 0;
                break;
            case this.props.userStates.NEW_ITEM:
                offset = -455;
                break;
            case this.props.userStates.STORE:
            default:
                offset = -550;
        }

        // Caclulate the cart data
        let subtotal = 0.00;
        const entries = Object.values(this.props.items);
        if (entries.length > 0)
        {
            subtotal = entries.map((entry) => {return entry.item.price * entry.amount}).reduce((item1, item2) => item1 + item2);
        }

        const tip = this.state.tipStyle(subtotal);
        const total = (subtotal + tip);
        
        // Render out the cart
        return (
            <div className="cart-panel"
            style={{bottom: offset}}>
                <div className="cart-header"
                    onClick={() => this.toggleOpen()}
                >
                    <img/>
                    <div className="description-text">Shopping Cart</div>
                </div>
                <div className="cart-body">
                    <div id="purchase-panel">
                        <div className="scroll-panel">
                            {this.renderCartItems()}
                        </div>
                        <div id="summary">
                            <div className="ui-group">
                                <div className="summary-text">Tips for waiters</div>
                                <div className="button-group">
                                    {this.renderTipButton(this.tipStyles.ZERO, "ZERO")}
                                    {this.renderTipButton(this.tipStyles.ROUND_UP, "ROUND UP")}
                                    {this.renderTipButton(this.tipStyles.TEN_PERCENT, "10%")}
                                    {this.renderTipButton(this.tipStyles.CUSTOM, "CUSTOM")}
                                </div>
                            </div>
                            <div className="ui-group">
                                <div className="summary-text">Subtotal<span className="summary-text">{formatAsCurrency(subtotal)}</span></div>
                                <div className="summary-text">Tips<span className="summary-text">{formatAsCurrency(tip)}</span></div>
                            </div>
                            <div className="summary-bold-text">Total<span className="summary-bold-text">{formatAsCurrency(total)}</span></div>
                            <div className="button-group">
                                <button className="summary-text big-button">Confirm Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }