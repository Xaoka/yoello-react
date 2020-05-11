import React from 'react';
import NavBar from './NavBar.js'
/**
 * Component for a navigation top bar
 */
export default class TextNavBar extends NavBar
{
  renderElement(catagory, index)
  {
      return (
          <button key={index}
          onClick={() => this.props.onClick(index)}
          style =
          {
              {
                  color: this.props.catagory === index ? "white" : "var(--ui-light-grey)"
              }
          }>{catagory.name}</button>
      );
  }
}