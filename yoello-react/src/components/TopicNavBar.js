
import React from 'react';
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
        //   onClick={() => this.props.onClick(`ALL`)}
        style =
        {
            {
                //color: this.props.catagory === "ALL" ? "white" : "lightgrey",
                backgroundImage: `url("${img_url}")`
            }
        }></img>
    );
  }

  render()
  {
      // TODO: Fix code reuse
      return (
          <div className="nav-bar flex-fill"
              style={{filter: `blur(${this.props.shouldBlur ? 6 : 0}px)`}}>
              {this.renderImage("COFFEE", "imgs/coffee.jpg")}
              {this.renderImage("CUTLERY", "imgs/cutlery.png")}
              {this.renderImage("PERCENT", "imgs/percent.png")}
              {this.renderImage("SEARCH", "imgs/search.png")}
          </div>
      );
  }
}