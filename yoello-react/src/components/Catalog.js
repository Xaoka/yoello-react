import CatalogPage from './CatalogPage.js';
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

    renderPages()
    {
        const pages = []
        for (let i = 1; i <= this.props.maxPages; i++)
        {
            pages.push(<CatalogPage key={i}
              storeEntries={this.props.storeEntries}
              onClick={(item) => this.props.handleItemSelected(item)}
              page={i}
              itemsPerPage={this.props.itemsPerPage}>
                </CatalogPage>)
        }
        return pages;
    }
  
    render()
    {
      // TODO: Fix magic number (Height 100% was not behaving)
      return (
          <div className="store-view"
            style=
            {{
              filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`,
              marginTop: `-${490 * (this.props.page - 1)}px`
            }}>
            {this.renderPages()}
          </div>
      );
    }
  }
  