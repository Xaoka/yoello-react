import React from 'react';
import clamp from '../utils/math';
import ItemPurchaseSummary from './ItemPurchaseSummary'
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
            ROUND_UP: (sub) => 1 - (sub % 1),
            TEN_PERCENT: (sub) => sub * 0.1,
            CUSTOM: (sub) => sub
        }
        this._internalState = this.windowStates.CLOSED;
        this.state =
        {
            windowState: this.windowStates.CLOSED,
            amount: 1,
            tipStyle: this.tipStyles.ROUND_UP,
            items: []
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
        
        if (this.state.windowState === this.windowStates.CLOSED && this.props.item)
        {
            newState = this.windowStates.PREVIEW;
        }
        else if (this.state.windowState === this.windowStates.PREVIEW && !this.props.item)
        {
            newState = this.windowStates.CLOSED;
        }
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
  
    render()
    {
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
        const item = this.props.item || { name: "Loading", description: "Loading", image_url: "imgs/beer.jpg" };
        let subtotal = 0.00;
        if (this.state.items.length > 0)
        {
            subtotal = this.state.items.reduce((item1, item2) => item1.abv + item2.abv);
        }
        const tip = this.state.tipStyle(subtotal);
        const total = (subtotal + tip);
        
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
                        <div id="item-cost">
                            <img className="item-image"
                                style=
                                {
                                    {
                                        backgroundImage: `url("${item.image_url}")`
                                    }
                                }
                            >
                            </img>
                            <div className="sub-heading">£{(item.abv * 2).toFixed(2)}</div>
                        </div>
                        <button className="delete-button"
                        onClick={this.props.clearItem}></button>
                        <span>
                            <ItemPurchaseSummary
                            item={item}
                            amount={this.state.amount}
                            setAmount={(v) => this.setAmount(v)}
                            config={this.props.storeConfig}/>
                            <div id="summary">
                                <div className="ui-group">
                                    <div className="summary-text">Tips for waiters</div>
                                    <div className="button-group">
                                        <button
                                        onClick={() => this.handleTipStyleChange(this.tipStyles.ZERO)}>ZERO</button>
                                        <button
                                        onClick={() => this.handleTipStyleChange(this.tipStyles.ROUND_UP)}>ROUND UP</button>
                                        <button
                                        onClick={() => this.handleTipStyleChange(this.tipStyles.TEN_PERCENT)}>10%</button>
                                        <button
                                        onClick={() => this.handleTipStyleChange(this.tipStyles.CUSTOM)}>CUSTOM</button>
                                    </div>
                                </div>
                                <div className="ui-group">
                                    <div className="summary-text">Subtotal<span className="summary-text">£{subtotal.toFixed(2)}</span></div>
                                    <div className="summary-text">Tips<span className="summary-text">£{tip.toFixed(2)}</span></div>
                                </div>
                                <div className="summary-bold-text">Total<span className="summary-bold-text">£{total.toFixed(2)}</span></div>
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