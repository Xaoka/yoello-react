import StoreItem from './StoreItem.js';
import React from 'react';
  /**
   * Component for rendering a paginated catalog
   */
  export default class Catalog extends React.Component
  {
    handleClick(i)
    {
        const storeEntries = this.state.storeEntries.slice();
        storeEntries[i] = this.state.storeEntries[i];
        this.setState({storeEntries: storeEntries});
    }

    /**
     * Item in the store to render
     * @param {integer} itemIndex 
     */
    renderStoreItem(itemIndex)
    {
        const entry = this.props.storeEntries[itemIndex];
        return <StoreItem
        value={ entry || { name: "Loading", image_url: "imgs/beer.jpg" } }
        onClick={() => this.props.onClick(itemIndex)}
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
          </div>
        </div>
      );
    }
  }
  