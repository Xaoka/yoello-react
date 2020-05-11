
import React from 'react';
import coffeeImage from '../imgs/coffee.png'
import cutleryImage from '../imgs/cutlery.png'
import percentImage from '../imgs/percent.png'
import searchImage from '../imgs/search.png'
  /**
 * Component for a navigation top bar
 */
export default class TopicNavBar extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state =
      {
        catagory: ""
      };
  }

  renderImage(catagory, img_url)
  {
    return (
        <img className="topic-image"
        src={img_url}></img>
    );
  }

  render()
  {
      // TODO: Fix code reuse
      return (
          <div className="nav-bar flex-fill"
              style={{filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`}}>
              {this.renderImage("COFFEE", coffeeImage)}
              {this.renderImage("CUTLERY", cutleryImage)}
              {this.renderImage("PERCENT", percentImage)}
              {this.renderImage("SEARCH", searchImage)}
          </div>
      );
  }
}