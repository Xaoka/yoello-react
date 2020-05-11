
import React from 'react';
import NavBar from './NavBar.js'
import coffeeImage from '../imgs/coffee.png'
import cutleryImage from '../imgs/cutlery.png'
import percentImage from '../imgs/percent.png'
import searchImage from '../imgs/search.png'

/**
 * Component for a navigation top bar
 */
export default class ImageNavBar extends NavBar
{
  constructor(props)
  {
      super(props);
      this.state =
      {
        catagories:
        [
            { catagory: "COFFEE", url: coffeeImage },
            { catagory: "CUTLERY", url: cutleryImage },
            { catagory: "PERCENT", url: percentImage },
            { catagory: "SEARCH", url: searchImage },
        ]
      };
  }

  renderElement(catagory)
  {
    return (
        <img className="topic-image"
        src={catagory.url}></img>
    );
  }
}