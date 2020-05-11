import React from 'react';
/**
 * Component for a navigation bar
 */
export default class NavBar extends React.Component
{
  constructor(props)
  {
        super(props);
        this.state =
        {
            catagories: [{ foo: "item 1"}]
        };
  }

  renderElement(catagory)
  {
      return ( <div>Nav Bar Item</div> );
  }

  renderElements()
  {
      const elements = [];
      for (const catagory of this.state.catagories)
      {
          elements.push(this.renderElement(catagory));
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