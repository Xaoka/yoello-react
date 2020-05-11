
import React from 'react';
import NavBar from './NavBar.js'

/**
 * Component for a navigation top bar
 */
export default class ImageNavBar extends NavBar
{
  renderElement(catagory, index)
  {
    return (
        <img key={index}
        className="topic-image"
        src={catagory.url}
        onClick={() => this.props.onClick(index)}
        style=
        {{
          backgroundColor: this.props.catagory === index ? "var(--ui-grey)" : "transparent"
        }}
        ></img>
    );
  }
}