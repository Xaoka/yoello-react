import React from 'react';
import TopicNavBar from './TopicNavBar.js';
import Catalog from './Catalog.js';
import CatagoryNavBar from './CatagoryNavBar.js';
import ItemPreview from './ItemPreview.js';
import Cart from './Cart.js';
import { punkApiRequest, initRequest } from '../punkapi/api.js';
  
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

    /**
     * Event handler callback for when an item is initially selected
     * @param {integer} itemIndex
     */
    handleItemSelected(itemIndex)
    {
        this.setState({...this.state, previewItem: this.catalogData[itemIndex]});
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
    itemAddedToPreCart(item)
    {
        this.setState({...this.state, previewItem: null, preCartItem: item})
    }

    render()
    {
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <TopicNavBar/>
            <CatagoryNavBar
                onClick={(i) => this.handleCatagorySelected(i)}
                catagory={this.state.catagory}/>

            <div className="catalog">
                <Catalog
                storeEntries={this.state.storeEntries}
                onClick={(i) => this.handleItemSelected(i)}
                />
            </div>
            <Cart
            item={this.state.preCartItem}
            clearItem={() => this.itemAddedToPreCart(null)}
            storeConfig={this.storeConfig}/>
            <ItemPreview
            item={this.state.previewItem}
            onClick={(i) => this.itemAddedToPreCart(i)}/>
        </div>
        );
    }
  }