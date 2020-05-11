import React from 'react';
import NavBar from './NavBar.js'
/**
 * Component for a navigation top bar
 */
export default class TextNavBar extends NavBar
{
  constructor(props)
  {
      super(props);
      this.state =
      {
        catagories:
        [
            "ALL",
            "PIZZA",
            "STEAK"
        ]
      };
  }

  renderElement(catagory)
  {
      return (
          <button onClick={() => this.props.onClick(`${catagory}`)}
          style =
          {
              {
                  color: this.props.catagory === catagory ? "white" : "var(--ui-light-grey)"
              }
          }>{catagory}</button>
      );
  }
}