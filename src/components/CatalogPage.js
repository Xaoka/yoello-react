import StoreItem from './StoreItem.js';
import React from 'react';
  /**
   * Component for rendering a catalog page
   */
  export default class CatalogPage extends React.Component
  {

    /**
     * Item in the store to render
     * @param {integer} itemIndex 
     */
    renderStoreItem(itemIndex)
    {
        const entry = this.props.storeEntries[itemIndex];
        return <StoreItem key={itemIndex}
        value={ entry || { name: "Loading", image_url: "imgs/beer.jpg" } }
        onClick={() => this.props.onClick(entry.id)}
        />;
    }

    renderStoreItems()
    {
        const items = [];
        const start = (this.props.page - 1) * this.props.itemsPerPage;
        const end = start + this.props.itemsPerPage;
        for (let i = start; i < end; i++)
        {
            items.push(this.renderStoreItem(i))
        }
        return items;
    }
  
    render()
    {
        return ( <div>{this.renderStoreItems()}</div>);
    }
  }
  