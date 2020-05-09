import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import punkApiRequest from './punkapi/api.js';

/**
 * A store item component handles a single item (e.g. a beer)
 */
class StoreItem extends React.Component
{
    render()
    {
        const rawName = this.props.value.name;
        const name = rawName.length > 10 ? `${rawName.substring(0, 15)}...` : rawName;
        return (
        <button className="storeItem"
            style =
            {
                {
                    display: this.props.value.visible ? "" : "none"
                }
            }
            onClick={() => this.props.onClick()}
            // background-image=url("imgs/beer.jpg");
        >
            <div>
                <div
                style=
                {
                    {
                        backgroundImage: `url("${this.props.value.image_url}")`
                    }
                }></div>
            </div>
            {name}<br/>
            (ABV{this.props.value.abv})
        </button>
        );
    }
  }
  
  /**
   * Component for rendering a paginated catalog
   */
  class Catalog extends React.Component
  {
    handleClick(i)
    {
        const storeEntries = this.state.storeEntries.slice();
        storeEntries[i] = this.state.storeEntries[i];
        this.setState({storeEntries: storeEntries});
    }

    renderStoreItem(i)
    {
        const entry = this.props.storeEntries[i];
        return <StoreItem
        value={ entry || { name: "Loading", image_url: "imgs/beer.jpg" } }
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    render()
    {
      return (
        <div>
          <div className="store-view">
                {this.renderStoreItem(0)}
                {this.renderStoreItem(1)}
                {this.renderStoreItem(2)}
                {this.renderStoreItem(3)}
                {this.renderStoreItem(4)}
                {this.renderStoreItem(5)}
                {this.renderStoreItem(6)}
                {this.renderStoreItem(7)}
                {this.renderStoreItem(8)}
            {/* </div>
            <div className="store-row">
            </div>
            <div className="store-row">
            <div className="store-row">
            </div> */}
          </div>
        </div>
      );
    }
  }
  

/**
 * Component for a navigation top bar
 */
  class NavBar extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.state =
        {
          catagory: ""
        };
    }

    handleClick(i)
    {
    }

    renderStoreItem(i)
    {
    }
  
    render()
    {
        // TODO: Fix code reuse
        return (
            <div className="nav-bar">
                <button onClick={() => this.props.onClick(`PIZZA`)}
                style =
                {
                    {
                        color: this.props.catagory === "PIZZA" ? "white" : "lightgrey"
                    }
                }>PIZZA</button>
                <button onClick={() => this.props.onClick(`STEAK`)}
                style =
                {
                    {
                        color: this.props.catagory === "STEAK" ? "white" : "lightgrey"
                    }
                }>STEAK</button>
                <button onClick={() => this.props.onClick(`ALL`)}
                style =
                {
                    {
                        color: this.props.catagory === "ALL" ? "white" : "lightgrey"
                    }
                }>ALL</button>
            </div>
        );
    }
  }

  /**
   * Component for handling shopping cart display and animation
   */
  class Cart extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.windowStates = { CLOSED: "CLOSED", PREVIEW: "PREVIEW", OPEN: "OPEN" }
        this.state =
        {
            windowState: this.windowStates.CLOSED
        }
    }

    handleStateChage(state)
    {
        if (!this.windowStates[state]) { throw Error(`Invalid cart state ${state} was set.`)}
        console.log(`Set state ${state}`)
        this.setState({ windowState: state });
    }

    toggleOpen()
    {
        if (this.state.windowState == this.windowStates.OPEN)
        {
            this.handleStateChage(this.windowStates.CLOSED);
        }
        else
        {
            this.handleStateChage(this.windowStates.OPEN);
        }
    }
  
    render()
    {
        let offset;
        if (this.state.windowState == this.windowStates.CLOSED && this.props.item)
        {
            this.state.windowState = this.windowStates.PREVIEW;
        }
        switch (this.state.windowState)
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
                            <img
                                style=
                                {
                                    {
                                        backgroundImage: `url("${item.image_url}")`
                                    }
                                }>
                            </img>
                            <div>£00</div>
                        </div>
                        <button className="delete-button"></button>
                        <span>
                            <ItemPurchaseSummary
                            item={item}
                            amount={0}/>
                            <div id="summary">
                                <div className="ui-group">
                                    <div className="cart-text">Tips for waiters</div>
                                    <div className="button-group">
                                        <button>ZERO</button>
                                        <button>ROUND UP</button>
                                        <button>10%</button>
                                        <button>CUSTOM</button>
                                    </div>
                                </div>
                                <div className="ui-group">
                                    <div className="cart-text">Subtotal<span className="cart-text">£10.01</span></div>
                                    <div className="cart-text">Tips<span className="cart-text">£0.10</span></div>
                                </div>
                                <div className="cart-text">Total<span className="cart-text">£12.34</span></div>
                                <div className="button-group">
                                    <button className="cart-text">Confirm Payment</button>
                                </div>
                            </div>
                            
                        </span>
                    </div>
                </div>
            </div>
        );
    }
  }

  
  /**
   * Component for handling shopping cart display and animation
   */
  class ItemPurchaseSummary extends React.Component
  {
    constructor(props)
    {
        super(props);
    }
  
    render()
    {
        const item = this.props.item || { name: "Loading", description: "Loading", image_url: "imgs/beer.jpg" };
        return (
            <span>
                <span id="beer-name" className="cart-text">{item.name}</span>
                <span className="button-group">
                    <button className="amount-button">-</button>
                    <span  className="cart-text">{this.props.amount}</span>
                    <button className="amount-button">+</button>
                </span>
                <span id="description" className="cart-text">{item.description}</span>
            </span>
        );
    }
  }

  /**
   * Component for handling shopping cart display and animation
   */
  class ItemPreview extends React.Component
  {
    render()
    {
        const item = this.props.item;
        if (!item) { return null; }
        return (
            <div className="float-window">
                <div className="content">
                    <span>
                        <div className="title-text">{item.name}</div>
                        <div className="cart-text">
                            <div style={{fontStyle: "italic"}}>{item.tagline}</div>
                            <div>{`ABV: ${item.abv}`}</div>
                            <div>{this.truncate(item.description, 80)}</div>
                            <div>{this.truncate(`Pairs well with; ${item.food_pairing.join(", ")}`, 80)}</div>
                        </div>
                    </span>
                    <img>
                    </img>
                </div>
                <div className="button-group">
                    <button
                    onClick={() => this.props.onClick(item)}>ADD TO CART</button>
                </div>
            </div>
        );
    }

    // TODO: Utility
    truncate(str, len)
    {
        if (str.length > len)
        {
            return `${str.substring(0, len)}...`;
        }
        else
        {
            return str;
        }
    }
  }

  /**
   * A Store holds ALL items from a particular vendor and holds the sub-components such as navigation bar and catalog
   */
  class Store extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.catalogData = [];
        this.filters =
        {
            "ALL": () => true,
            "STEAK": (entry) => entry.id <= 4,
            "PIZZA": (entry) => entry.id % 2 === 0
        };
        this.state =
        {
          storeEntries: Array(9).fill(null),
          navFilter: this.filters[0],
          catagory: "",
          previewItem: null,
          preCartItem: null
        };
        punkApiRequest((data) =>
        {
            // const beers = data.map((beer) => beer.name);
            // console.log(beers);
            this.catalogData = data;
            // this.setState({ storeEntries: data });
            this.handleCatagorySelected(`ALL`);
        })
    }

    handleItemSelected(i)
    {
        this.setState({...this.state, previewItem: this.catalogData[i]});
    }

    handleCatagorySelected(catagory)
    {
        console.log(`${catagory} selected from "${Object.keys(this.filters)}"`)
        const entries = this.catalogData.map((entry) => {return {...entry, visible: this.filters[catagory](entry)}});
        // console.log(`Found ${entries.length} entries:\n${JSON.stringify(entries)}`)
        this.setState({ ...this.state, storeEntries: entries, catagory})
    }

    itemAddedToPreCart(item)
    {
        this.setState({...this.state, previewItem: null, preCartItem: item})
    }

    render()
    {
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <NavBar
                onClick={(i) => this.handleCatagorySelected(i)}
                catagory={this.state.catagory}/>

            <div className="catalog">
                <Catalog
                storeEntries={this.state.storeEntries}
                onClick={(i) => this.handleItemSelected(i)}
                />
            </div>
            <Cart
            item={this.state.preCartItem}/>
            <ItemPreview
            item={this.state.previewItem}
            onClick={(i) => this.itemAddedToPreCart(i)}/>
        </div>
        );
    }
  }
  
  /**
   * Render the top level component
   */
  ReactDOM.render(
    <Store />,
    document.getElementById('root')
  );
  