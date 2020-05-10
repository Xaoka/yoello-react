import React from 'react';
import truncate from '../utils/text'
  /**
   * Component for handling shopping cart display and animation
   */
  export default class ItemPreview extends React.Component
  {
    render()
    {
        const item = this.props.item;
        if (!item) { return null; } // TODO: Change to allow anim
        return (
            <div className="float-window">
                <div className="close-button" id="preview-close"
                onClick={() => this.props.onClick(null)}>
                    CLOSE
                </div>
                <div className="content">
                    <img className="item-image"
                    style=
                    {{
                        backgroundImage: `url("${item.image_url}")`
                    }}
                    />
                    <span>
                        <div className="title-text">{item.name}</div>
                        <div className="cart-text">
                            <div className="description-text" style={{fontStyle: "italic"}}>{item.tagline}</div>
                            <div className="description-text">
                                {`ABV: ${item.abv}`}<br></br>
                                {truncate(item.description, 30)}<br></br>
                                {truncate(`Pairs well with; ${item.food_pairing.join(", ")}`, 30)}
                            </div>
                        </div>
                    </span>
                </div>
                <div className="button-group">
                    <button
                    onClick={() => this.props.onClick(item, 1)}>ADD TO CART</button>
                </div>
            </div>
        );
    }
  }