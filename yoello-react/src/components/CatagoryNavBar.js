import React from 'react';
/**
 * Component for a navigation top bar
 */
export default class CatagoryNavBar extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state =
      {
        catagory: ""
      };
  }

  renderButton(catagory)
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

  render()
  {
      return (
          <div className="nav-bar flex-fill"
                style={{filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`}}>
              {this.renderButton("ALL")}
              {this.renderButton("PIZZA")}
              {this.renderButton("STEAK")}
          </div>
      );
  }
}