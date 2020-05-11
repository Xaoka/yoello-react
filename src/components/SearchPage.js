import React from 'react';

/**
 * A page for changing the search options
 */
export default class SearchPage extends React.Component
{
    renderButton(index, str)
    {
        const buttonSelected = (index === this.props.option);
        return <button className="option-button" key={`opt_${index}`}
        onClick={() => this.props.changeSearchOption(index)}
        style=
        {{  
            backgroundColor: buttonSelected ? "var(--yoello-yellow)" : "var(--dark-navy)",
            color: buttonSelected ? "var(--dark-navy)" : "var(--yoello-yellow)"
        }}>{str}</button>;
    }
    
    renderButtons()
    {
        const buttons = [];
        buttons.push(this.renderButton(0, "ABV Ascending"));
        buttons.push(this.renderButton(1, "ABV Descending"));
        buttons.push(this.renderButton(2, "Name Ascending"));
        buttons.push(this.renderButton(3, "Name Descending"));
        return buttons;
    }

    render()
    {

        return (<div className="centre-text centre-page-text">
                Search Options
                {this.renderButtons()}
            </div>);
    }
  }