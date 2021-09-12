import React from "react";
import Two, { Anchor } from "twojs-ts";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.myRef = React.createRef();
    }
    render() {
        return (
            <div className='card' ref={this.myRef}>
                <h3>{this.props.data.title}</h3>
                <h4>{this.props.data.location}</h4>
                <ul>
                    {this.props.data.list.map(value => <li>{value}</li>)}
                    <h3>CLICK ME!</h3>
                </ul>
            </div>
        );
    }
    onmousemove(e) {
        this.mx = e.clientX;
        this.my = e.clientY;
        this.mouse = new Anchor(this.mx - this.node.getBoundingClientRect().left - this.node.offsetWidth / 2,
            this.my - this.node.getBoundingClientRect().top - this.node.offsetHeight / 2);
        this.node.style.transform = `
        rotateX(${-this.mouse.clone().normalize().y * 10}deg) 
        rotateY(${this.mouse.clone().normalize().x * 10}deg) 
        translateX(${this.mouse.x * 0.05}px) 
        translateY(${this.mouse.y * 0.05}px)`;
    }
    click(){
        this.position = this.mouse.clone().normalize().multiplyScalar(500);
        this.node.style.setProperty('--cardX', this.position.x+'px');
        this.node.style.setProperty('--cardY', this.position.y+'px');
        this.node.style.animation = `node`;
        setTimeout(() => this.node.style.animation = `card-throw 0.2s linear`, 1);  
        this.index += 4;
        this.node.style.setProperty('--card-index', this.index);
        setTimeout(() => this.node.style.animation = `none`, 220);
    }
    componentDidMount() {
        this.node = this.myRef.current;
        this.node.style.setProperty('--card-index', this.props.index);
        this.index = this.props.index;
        document.addEventListener('mousemove', (e) => this.onmousemove(e));
        this.node.addEventListener('click', () => this.click())
    }
}

export default Card;