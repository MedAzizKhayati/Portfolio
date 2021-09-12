import React from "react"
import Two from "twojs-ts"
import PerlinDiv from "../projects/PerlinDiv"
import TwoSvg from "./TwoSvg"

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth 
        }
        window.addEventListener("resize", () => this.resize());
    }
    resize(){
        this.setState({
            width: window.innerWidth
        })
    }
    render(){
        return (
            <div>
                <div className="navbar">
                    <h3>{this.props.title}</h3>
                    <nav>
                        <ul>
                            <li onClick={this.props.home}>Home</li>
                            <li onClick={this.props.about}>About</li>
                        </ul>
                    </nav>         
                </div>
                <TwoSvg
                    project={PerlinDiv}
                    width={this.state.width}
                    height={100}
                    type={Two.Types.svg}
                />
            </div>   
        )
    }
}

export default Navbar;