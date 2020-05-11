import React from 'react';
/**
 * Component for a navigation bar
 */
export default class NavBar extends React.Component
{
  renderElement(catagory, index)
  {
  return ( <div>Nav Bar Item {index}</div> );
  }

  renderElements()
  {
      const elements = [];
      for (let i = 0; i < this.props.catagories.length; i++)
      {
          elements.push(this.renderElement(this.props.catagories[i], i));
      }
      return elements;
  }

  render()
  {
      return (
          <div className="nav-bar flex-fill"
                style={{filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`}}>
              {this.renderElements()}
          </div>
      );
  }
}