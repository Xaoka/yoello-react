import React from 'react';
import clamp from '../utils/math';
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
        this.windowStates = { CLOSED: "CLOSED", PREVIEW: "PREVIEW", OPEN: "OPEN" }
        this.tipStyles =
        {
            ZERO: (sub) => 0,
            ROUND_UP: (sub) => 100 - (sub % 100),
            TEN_PERCENT: (sub) => sub * 0.1,
            CUSTOM: (sub) => sub
        }
        this._internalState = this.windowStates.CLOSED;
        this.state =
        {
            windowState: this.windowStates.CLOSED,
            tipStyle: this.tipStyles.ROUND_UP
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
     * Sets the tip style if the input is a valid tip style
     * @param {string} state 
     */
    handleStateChange(state)
    {
        // TODO: Revisit this function, state duplication
        if (!this.windowStates[state]) { throw Error(`Invalid cart state ${state} was set.`)}
        let newState = state;
        
        // if (this.state.windowState === this.windowStates.CLOSED && this.props.item)
        // {
        //     newState = this.windowStates.PREVIEW;
        // }
        // else if (this.state.windowState === this.windowStates.PREVIEW && !this.props.item)
        // {
        //     newState = this.windowStates.CLOSED;
        // }
        this._internalState = newState;
        this.setState({...this.state, windowState: state});
    }

    /**
     * Toggles the window state between OPEN and CLOSED
     */
    toggleOpen()
    {
        if (this.state.windowState === this.windowStates.OPEN)
        {
            this.handleStateChange(this.windowStates.CLOSED);
        }
        else
        {
            this.handleStateChange(this.windowStates.OPEN);
        }
    }

    /**
     * Sets the amount of the item to purchase
     * @param {integer} amount 
     */
    setAmount(amount)
    {
        this.setState({...this.state, amount: clamp(amount, 0, this.props.storeConfig.cart.maxUnits)});
    }

    renderTipButton(style, text)
    {
        return (
            <button
                onClick={() => this.handleTipStyleChange(style)}>{text}</button>
        )
    }

    renderCartItems()
    {
        const itemEntryKeys = Object.keys(this.props.items);
        if (itemEntryKeys.length > 0)
        {
            const itemsJSX = [];
            for (const key of itemEntryKeys)
            {
                const item = this.props.items[key];
                console.log(`CART ITEM ${item}`);
                itemsJSX.push(<CartItem
                    item={item.item}
                    amount={item.amount}
                    setAmount={(v) => this.setAmount(v)}
                    config={this.props.storeConfig}/>)
            }
            return itemsJSX;
        }
        else
        {
            return (<span className="summary-text">Nothing in cart, go on, treat yourself!</span>)
        }
    }
  
    render()
    {
        // Calculate how far up to slide the window
        let offset;
        switch (this._internalState)
        {
            case this.windowStates.OPEN:
                offset = 0;
                break;
            case this.windowStates.PREVIEW:
                offset = -475;
                break;
            default:
                offset = -550;
        }

        // Caclulate the cart data
        let subtotal = 0.00;
        for (const key of Object.keys(this.props.items))
        {
            console.log(`Key ${key}, ${this.props.items[key]}`);
            subtotal += this.props.items[key].item.price;
        }
        // if (this.state.items.length > 0)
        // {
        //     subtotal = this.state.items.reduce((item1, item2) => item1.price + item2.price);
        // }
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
                    <div>Shopping Cart</div>
                </div>
                <div className="cart-body">
                    <div id="purchase-panel">
                        {this.renderCartItems()}
                        <span>
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
                                    <button className="summary-text">Confirm Payment</button>
                                </div>
                            </div>
                            
                        </span>
                    </div>
                </div>
            </div>
        );
    }
  }