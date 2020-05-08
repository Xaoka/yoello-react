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
    constructor(props)
    {
        super(props);
        this.state =
        {
          squares: Array(9).fill(null),
        };
        punkApiRequest((data) =>
        {
            const beers = data.map((beer) => beer.name);
            console.log(beers)
            this.setState({ squares: beers });
        })
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.squares[i];
        this.setState({squares: squares});
      }

    renderStoreItem(i)
    {
        return <StoreItem
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />;
    }
  
    render()
    {
      const status = 'Demo App';
  
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

    handleClick(i) {
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
                <button onClick={() => this.handleClick(0)}>Pizza</button>
                <button onClick={() => this.handleClick(1)}>Steak</button>
                <button onClick={() => this.handleClick(2)}>All</button>
            </div>
        );
    }
    //   const status = 'Demo App';
  
    //   return (
    //     <div>
    //       <div className="store-title">{status}</div>
    //       <div className="store-view">
    //         <div className="store-row">
    //             {this.renderStoreItem(0)}
    //             {this.renderStoreItem(1)}
    //             {this.renderStoreItem(2)}
    //         </div>
    //         <div className="store-row">
    //             {this.renderStoreItem(3)}
    //             {this.renderStoreItem(4)}
    //             {this.renderStoreItem(5)}
    //         </div>
    //         <div className="store-row">
    //             {this.renderStoreItem(6)}
    //             {this.renderStoreItem(7)}
    //             {this.renderStoreItem(8)}
    //         </div>
    //       </div>
    //     </div>
    //   );
  }

  /**
   * A Store holds all items from a particular vendor
   */
  class Store extends React.Component
  {
    render()
    {
        return (
        <div className="store">
            <div className="store-title">Demo App</div>
            <NavBar> </NavBar>
            <div className="catalog">
                <Catalog />
            </div>
        </div>
        );
    }
  }
  
  
  ReactDOM.render(
    <Store />,
    document.getElementById('root')
  );
  