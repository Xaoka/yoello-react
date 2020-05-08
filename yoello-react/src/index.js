import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import punkApiRequest from './punkapi/api.js';

/**
 * A store item component handles a single item (e.g. a beer)
 */
class StoreItem extends React.Component
{
    render()
    {
        return (
        <button className="storeItem"
            onClick={() => this.props.onClick()}
        >
            <div></div>
            {this.props.value}
        </button>
        );
    }
  }
  
  class Catalog extends React.Component
  {
    handleClick(i)
    {
        const squares = this.state.squares.slice();
        squares[i] = this.state.squares[i];
        this.setState({squares: squares});
    }

    renderStoreItem(i)
    {
        return <StoreItem
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    render()
    {
      return (
        <div>
          <div className="store-view">
            <div className="store-row">
                {this.renderStoreItem(0)}
                {this.renderStoreItem(1)}
                {this.renderStoreItem(2)}
            </div>
            <div className="store-row">
                {this.renderStoreItem(3)}
                {this.renderStoreItem(4)}
                {this.renderStoreItem(5)}
            </div>
            <div className="store-row">
                {this.renderStoreItem(6)}
                {this.renderStoreItem(7)}
                {this.renderStoreItem(8)}
            </div>
          </div>
        </div>
      );
    }
  }
  
  class NavBar extends React.Component
  {

    filters = [`pizza`, `steak`, `all`];
    constructor(props)
    {
        super(props);
        // this.state =
        // {
        //   squares: Array(9).fill(null),
        // };
        // punkApiRequest((data) =>
        // {
        //     const beers = data.map((beer) => beer.name);
        //     console.log(beers)
        //     this.setState({ squares: beers });
        // })
    }

    handleClick(i)
    {
        // const squares = this.state.squares.slice();
        // squares[i] = this.state.squares[i];
        // this.setState({squares: squares});
    }

    renderStoreItem(i)
    {
        // return <StoreItem
        // value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        // />;
    }
  
    render()
    {
        return (
            <div className="nav-bar">
                <button onClick={() => this.props.onClick(`Pizza`)}>Pizza</button>
                <button onClick={() => this.props.onClick(`Steak`)}>Steak</button>
                <button onClick={() => this.props.onClick(`All`)}>All</button>
            </div>
        );
    }
  }

  /**
   * A Store holds all items from a particular vendor
   */
  class Store extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.catalogData = [];
        this.filters =
        {
            "All": () => true,
            "Steak": (entry) => entry.id <= 4,
            "Pizza": (entry) => entry.id % 2 === 0
        };
        this.state =
        {
          squares: Array(9).fill(null),
          navFilter: `Stake`
        };
        punkApiRequest((data) =>
        {
            const beers = data.map((beer) => beer.name);
            console.log(beers);
            this.catalogData = data;
            // this.setState({ squares: beers });
            this.handleCatagorySelected(`All`);
        })
    }

    handleItemSelected(i)
    {
        alert(`item ${i} selected`);
    }

    handleCatagorySelected(catagory)
    {
        // alert(`catagory ${catagory} selected`)
        console.log(`${catagory} selected from "${Object.keys(this.filters)}"`)
        const entries = this.catalogData.filter(this.filters[catagory]);
        this.setState({ ...this.state, squares: entries.map(entry => entry.name)})
    }

    render()
    {
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <NavBar
                onClick={(i) => this.handleCatagorySelected(i)}>
            </NavBar>
            <div className="catalog">
                <Catalog
                squares={this.state.squares}
                onClick={(i) => this.handleItemSelected(i)}
                />
            </div>
        </div>
        );
    }
  }
  
  
  ReactDOM.render(
    <Store />,
    document.getElementById('root')
  );
  