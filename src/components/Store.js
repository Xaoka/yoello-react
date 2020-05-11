import React from 'react';
import ImageNavBar from './ImageNavBar.js';
import Catalog from './Catalog.js';
import TextNavBar from './TextNavBar.js';
import ItemPreview from './ItemPreview.js';
import Cart from './Cart.js';
import clamp from '../utils/math.js';
import { punkApiRequest, initRequest } from '../punkapi/api.js';
import '../utils/swipe'
import coffeeImage from '../imgs/coffee.png'
import cutleryImage from '../imgs/cutlery.png'
import percentImage from '../imgs/percent.png'
import searchImage from '../imgs/search.png'
import SearchPage from './SearchPage'
  
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
        this.userStates =
        {
            STORE: "STORE",
            NEW_ITEM: "NEW_ITEM",
            CART: "CART"
        }
        this.uiEnabled = true;
        this.topics =
        [
            {
                name: "DRINKS",
                catagories:
                [
                    {
                        filterFunc: () => true,
                        name: "ALL"
                    },
                    {
                        filterFunc: (entry) => entry.id % 2 === 0,
                        name: "PIZZA"
                    },
                    {
                        filterFunc: (entry) => entry.id % 2 === 1,
                        name: "STEAK"
                    }
                ]
            },
            {
                name: "FOOD",
                catagories:
                [
                    {
                        filterFunc: () => true,
                        name: "All Food"
                    }
                ]
            },
            {
                name: "SALES",
                catagories:
                [
                    {
                        filterFunc: () => true,
                        name: "Sales"
                    }
                ]
            },
            {
                name: "SEARCH",
                catagories:
                [
                    {
                        filterFunc: () => true,
                        name: "Search"
                    }
                ]
            }
        ];
        this.state =
        {
            storeEntries: Array(9).fill(null),
            catagoryIndex: 0,
            topicIndex: 0,
            previewItem:
            {
                item: null,
                isNew: false
            },
            cart: {},
            itemsPerPage: 9,
            page: 1,
            maxPages: 0,
            userFlowState: this.userStates.STORE,
            searchOption: 0
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
            this.setState({...this.state, maxPages: Math.ceil(this.catalogData.length / this.state.itemsPerPage)});
            // this.setState({ storeEntries: data });
            this.handleCatagorySelected(0);
            this.onSearchOptionChanged(0);
        })
    }

    /**
     * Event handler callback for when an item is initially selected
     * @param {integer} itemID
     */
    handleItemSelected(itemID)
    {
        if (!this.uiEnabled) { return; }
        console.log(`Item ${itemID}`);
        const item = this.catalogData[itemID - 1];
        const isNew = (!this.state.cart[item.name]);
        this.setState({...this.state, previewItem: { item, isNew } });
    }

    handleSwipeEvent(evt)
    {
        if (!this.uiEnabled) { return; }
        let catagoryIndex = this.state.catagoryIndex;
        const catagories = this.topics[this.state.topicIndex].catagories;
        let offset = 0;

        if (evt.detail.direction === 'left')
        {
            offset = 1;
            if (catagoryIndex === catagories.length - 1)
            {
                const topicIndex = clamp(this.state.topicIndex + offset, 0, this.topics.length - 1);
                catagoryIndex = 0;
                this.handleTopicChanged(topicIndex);
            }
            else
            {
                catagoryIndex = clamp(catagoryIndex + offset, 0, catagories.length - 1);
            }
        }
        else
        {
            offset = -1;
            if (catagoryIndex === 0)
            {
                const topicIndex = clamp(this.state.topicIndex + offset, 0, this.topics.length - 1);
                catagoryIndex = 0;
                this.handleTopicChanged(topicIndex);
            }
            else
            {
                catagoryIndex = clamp(catagoryIndex + offset, 0, catagories.length - 1);
            }
        }
        this.handleCatagorySelected(catagoryIndex);
    }

    handleTopicChanged(topicIndex)
    {
        if (topicIndex === this.state.topicIndex) { return }
        console.log(`Topic ${topicIndex}`)
        this.setState({...this.state, topicIndex, catagoryIndex: 0, page: 1})
    }

    handleCatalogPageChange(page)
    {
        if (!this.uiEnabled) { return; }
        this.setState({...this.state, page: clamp(page, 1, this.state.maxPages)});
    }

    /**
     * Event callback handler when an item catagory is selected
     * @param {integer} catagoryIndex
     */
    handleCatagorySelected(catagoryIndex)
    {
        console.log(`catagory ${catagoryIndex}`)
        if (!this.uiEnabled) { return; }
        if (!this.topics[this.state.topicIndex].catagories[catagoryIndex])
        {
            throw Error(`Tried to set invalid catagory '${catagoryIndex}`);
        }
        let page = this.state.page;
        if (catagoryIndex !== this.state.catagoryIndex)
        {
            page = 1;
        }
        const entries = [...this.catalogData].map((entry) => {return {...entry, visible: this.topics[this.state.topicIndex].catagories[catagoryIndex].filterFunc(entry)}});
        // TODO: Change max pages here
        this.setState({ ...this.state, catagoryIndex, page, storeEntries: entries})
    }

    addItemToCart(item)
    {
        if (item)
        {
            const cartEntry = this.state.cart[item.name];
            const amount = cartEntry ? cartEntry.amount + 1 : 1;
            this.updateCartEntry(item, clamp(amount, 0, this.storeConfig.cart.maxUnits));
        }
        else
        {
            this.setState({...this.state, previewItem: { item: null, amount: 0}})
        }
    }

    /**
     * Event callback handler when an item is added to pre-cart (Amount selection)
     * @param {Item} item 
     */
    updateCartEntry(item, amount)
    {
        let itemEntry;
        let userFlowState = this.state.userFlowState;
        if (this.state.cart[item.name])
        {
            // TODO: If we have it in cart, change the button text
            itemEntry = this.state.cart[item.name]
            userFlowState = this.userStates.CART;
        }
        else
        {
            userFlowState = this.userStates.NEW_ITEM;
            itemEntry = { amount: 0, item };
        }
        itemEntry.amount = clamp(amount, 0, this.storeConfig.cart.maxUnits);
        const newCart = {...this.state.cart};
        newCart[item.name] = itemEntry;
        // console.log(`Added entry to cart ${JSON.stringify(itemEntry)}`)
        this.setState({...this.state, previewItem: { item: null, isNew: false }, cart: newCart, userFlowState})
    }

    removeItemFromCart(item)
    {
        const newCart = {...this.state.cart};
        delete(newCart[item.name]);
        this.setState({...this.state, cart: newCart});
    }

    setUserFlowState(state)
    {
        if (!this.userStates[state])
        {
            throw Error(`Invalid user flow state '${state}' set! Valid options are: ${Object.keys(this.userStates).join(", ")}.`);
        }
        this.setState({...this.state, userFlowState: state});
    }

    renderPlaceholder(text, key)
    {
        return (<div className="centre-text centre-page-text" key={key}
        >{text}</div>)
    }

    onSearchOptionChanged(index)
    {
        let sortFunc;
        switch (index)
        {
            case 0:
                sortFunc = (i1, i2) => parseFloat(i1.abv) - parseFloat(i2.abv);
                break;
            case 1:
                sortFunc = (i1, i2) => parseFloat(i2.abv) - parseFloat(i1.abv);
                break;
            case 2:
                sortFunc = (i1, i2) => i1.name.toLowerCase().localeCompare(i2.name.toLowerCase());
                break;
            case 3:
                sortFunc = (i1, i2) => i2.name.toLowerCase().localeCompare(i1.name.toLowerCase());
                break;
            default:
                sortFunc = (i1, i2) => 0;
                break;
        }
        console.log(`Sorting by ${sortFunc}`)
        const items = [...this.state.storeEntries].sort(sortFunc);
        this.setState({...this.state, searchOption: index, storeEntries: items});
    }

    renderView(shouldBlur)
    {
        // TODO: Move these out into render function classes/configs
        let sections = [];
        /** Catalog always has to render due to transition, TODO: change this */
        sections.push(<div className="catalog" key={"catalog"}
            style=
            {{
                display: this.state.topicIndex === 0 ? null : "none"
            }}>
            <Catalog
            shouldBlur={shouldBlur}
            storeEntries={this.state.storeEntries}
            handleItemSelected={(i) => this.handleItemSelected(i)}
            pageChange={(page) => this.handleCatalogPageChange(page)}
            page={this.state.page}
            itemsPerPage={this.state.itemsPerPage}
            maxPages={this.state.maxPages}
            />
            </div>);
        switch (this.state.topicIndex)
        {
            case 0:
                break;
            case 1:
                sections.push(this.renderPlaceholder("Tasty food coming soon to Demo App!", "Food"));
                break;
            case 2:
                sections.push(this.renderPlaceholder("No sales on right now, try again later", "Sales"));
                break;
            case 3:
                sections.push(<SearchPage id={"search_page"}
                changeSearchOption={(index) => this.onSearchOptionChanged(index)}
                option={this.state.searchOption}></SearchPage>);
                break;
            default:
                sections.push(this.renderPlaceholder("404 - Uhoh", "404"));
                break;
        }
        return sections;
    }

    render()
    {
        this.uiEnabled = (this.state.userFlowState !== this.userStates.CART && this.state.previewItem.item == null);
        // TODO: Move nav bar catagories into a settings file
        const hasPreviewItem = this.state.previewItem.item !== null;
        const cartOpen = this.state.userFlowState === this.userStates.CART;
        const blurInterface = hasPreviewItem || cartOpen;
        if (!this.topics[this.state.topicIndex])
        {
            throw Error(`UHOH: ${this.state.topicIndex}\n${JSON.stringify(this.topics[this.state.topicIndex])}`)
        }
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <ImageNavBar
                shouldBlur={blurInterface}
                catagory={this.state.topicIndex}
                onClick={(topic) => this.handleTopicChanged(topic)}
                catagories={
                [
                    { name: "DRINKS", url: coffeeImage },
                    { name: "FOOD", url: cutleryImage },
                    { name: "SALES", url: percentImage },
                    { name: "SEARCH", url: searchImage },
                ]}/>
            <TextNavBar
                shouldBlur={blurInterface}
                onClick={(index) => this.handleCatagorySelected(index)}
                catagory={this.state.catagoryIndex}
                catagories={this.topics[this.state.topicIndex].catagories}/>
            {this.renderView(blurInterface)}
            <Cart
            items={this.state.cart}
            updateCartEntry={(item, amount) => this.updateCartEntry(item, amount)}
            clearItem={(item) => this.removeItemFromCart(item)}
            storeConfig={this.storeConfig}
            userFlowState={this.state.userFlowState}
            setUserFlowState={(state) => this.setUserFlowState(state)}
            userStates={this.userStates}/>

            <ItemPreview
            itemDetails={this.state.previewItem}
            onClick={(item) => this.addItemToCart(item)}/>
        </div>
        );
    }
  }