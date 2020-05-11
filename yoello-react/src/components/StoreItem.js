import React from 'react';
import truncate from '../utils/text.js'

/**
 * A store item component handles a single item (e.g. a beer)
 */
export default class StoreItem extends React.Component
{
    render()
    {
        return (
        <button className="store-item sub-title"
            style =
            {
                {
                    display: this.props.value.visible ? "" : "none"
                }
            }
            onClick={() => this.props.onClick()} >
            <div>
                <img className="item-image"
                src={this.props.value.image_url}
                ></img>
            </div>
            {truncate(this.props.value.name, 20)}<br/>
            (ABV {this.props.value.abv})
        </button>
        );
    }
  }