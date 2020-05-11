import React from 'react';
import TopicNavBar from './TopicNavBar.js';
import Catalog from './Catalog.js';
import CatagoryNavBar from './CatagoryNavBar.js';
import ItemPreview from './ItemPreview.js';
import Cart from './Cart.js';
import clamp from '../utils/math.js';
import { punkApiRequest, initRequest } from '../punkapi/api.js';
import '../utils/swipe'
  
  /**
   * A Store holds ALL items from a particular vendor and holds the sub-components such as navigation bar and catalog
   */
  export default class Store extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.catalogData = [];
        initRequest().then((config) =>
        {
            this.storeConfig = config;
        });
        this.filters =
        {
            "ALL": () => true,
            "PIZZA": (entry) => entry.id % 2 === 0,
            "STEAK": (entry) => entry.id <= 4
        };
        this.state =
        {
            storeEntries: Array(9).fill(null),
            navFilter: this.filters[0],
            catagory: "",
            previewItem: null,
            cart: {},
            itemsPerPage: 9,
            page: 1
        };
        document.addEventListener('swipe', (evt) => this.handleSwipeEvent(evt));
        punkApiRequest({ page: this.state.page, perPage: this.state.itemsPerPage}, (data) =>
        {
            // const beers = data.map((beer) => beer.name);
            // console.log(beers);
            this.catalogData = data.map(entry =>
                { return {
                    ...entry,
                    // Dummy price out as double abv, in pennies
                    price: entry.abv * 2 * 100
                }});
            // this.setState({ storeEntries: data });
            this.handleCatagorySelected(`ALL`);
        })
    }

    /**
     * Event handler callback for when an item is initially selected
     * @param {integer} itemIndex
     */
    handleItemSelected(itemIndex)
    {
        this.setState({...this.state, previewItem: this.catalogData[itemIndex]});
    }

    handleSwipeEvent(evt)
    {
        const keys = Object.keys(this.filters);
        let desiredIndex = keys.indexOf(this.state.catagory);
        switch (evt.detail.direction)
        {
            case 'left':
                desiredIndex = clamp(desiredIndex + 1, 0, keys.length - 1);
                break;
            case 'right':
                desiredIndex = clamp(desiredIndex - 1, 0, keys.length - 1);
                break;
        }
        this.handleCatagorySelected(keys[desiredIndex]);
    }

    handleCatalogPageChange(page)
    {
        page = clamp(page, 1, Math.ceil(this.catalogData.length / this.state.itemsPerPage));
        this.setState({...this.state, page});
    }

    /**
     * Event callback handler when an item catagory is selected
     * @param {string} catagory 
     */
    handleCatagorySelected(catagory)
    {
        console.log(`${catagory} selected from "${Object.keys(this.filters)}"`)
        const entries = this.catalogData.map((entry) => {return {...entry, visible: this.filters[catagory](entry)}});
        // console.log(`Found ${entries.length} entries:\n${JSON.stringify(entries)}`)
        this.setState({ ...this.state, storeEntries: entries, catagory})
    }

    /**
     * Event callback handler when an item is added to pre-cart (Amount selection)
     * @param {Item} item 
     */
    updateCartEntry(item, amount)
    {
        const itemEntry = this.state.cart[item.name] || { amount: 0, item };
        itemEntry.amount = clamp(amount, 0, this.storeConfig.cart.maxUnits);
        const newCart = this.state.cart;
        newCart[item.name] = itemEntry;
        // console.log(`Added entry to cart ${JSON.stringify(itemEntry)}`)
        this.setState({...this.state, previewItem: null, cart: newCart})
    }

    render()
    {
        const blurInterface = this.state.previewItem !== null;
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <TopicNavBar
                shouldBlur={blurInterface}/>
            <CatagoryNavBar
                shouldBlur={blurInterface}
                onClick={(i) => this.handleCatagorySelected(i)}
                catagory={this.state.catagory}/>

            <div className="catalog">
                <Catalog
                shouldBlur={blurInterface}
                storeEntries={this.state.storeEntries}
                onClick={(i) => this.handleItemSelected(i)}
                pageChange={(page) => this.handleCatalogPageChange(page)}
                page={this.state.page}
                itemsPerPage={this.state.itemsPerPage}
                />
            </div>
            <Cart
            items={this.state.cart}
            updateCartEntry={(item, amount) => this.updateCartEntry(item, amount)}
            clearItem={() => null}//this.itemAddedToPreCart(null)}
            storeConfig={this.storeConfig}/>
            <ItemPreview
            item={this.state.previewItem}
            onClick={(item, amount) => this.updateCartEntry(item, amount)}/>
        </div>
        );
    }
  }