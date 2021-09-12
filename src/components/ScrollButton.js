import React from "react";

class ScrollButton extends React.Component {
    goDown(y){
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    render() { 
        return ( 
            <button 
                className='scroll-button'
                onClick={() => this.goDown(this.props.scroll)}>
                    <h2>{this.props.name}</h2>
            </button>
         );
    }
}
 
export default ScrollButton;
