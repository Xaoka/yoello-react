import StoreItem from './StoreItem.js';
import React from 'react';
  /**
   * Component for rendering a paginated catalog
   */
  export default class Catalog extends React.Component
  {
    constructor(props)
    {
      super(props);
      
      document.addEventListener('swipe', (evt) => this.handleSwipeEvent(evt));
    }

    handleSwipeEvent(evt)
    {
      switch (evt.detail.direction)
      {
        case 'up':
          this.props.pageChange(this.props.page + 1)
          break;
        case 'down':
          this.props.pageChange(this.props.page - 1)
          break;
      }
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
      //
      return (
          <div className="store-view"
          style={{filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`}}>
                {this.renderStoreItems()}
          </div>
      );
    }
  }
  