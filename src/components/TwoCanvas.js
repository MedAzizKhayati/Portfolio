import React from 'react';
import Two from 'twojs-ts'

class TwoCanvas extends React.Component{
    constructor(props){
        super(props);
        const type = props.type ? props.type : Two.Types.canvas;
        this.two = new Two({ width: props.width, height: props.height, type: type});
        this.project = new props.project(this.two);
        this.two.renderer.domElement.className = "TwoCanvas";
        this.two.renderer.domElement.addEventListener("mouseenter", () => this.two.play());
        this.two.renderer.domElement.addEventListener("mouseleave", () => this.two.pause());
        this.two.update();
        this.two.pause();
    }
    render(){
        return(
        <div className="divTwo" ref={(nodeElement) => 
            {nodeElement && nodeElement.appendChild(this.two.renderer.domElement)}}>
        </div>
        )
    }
}
export default TwoCanvas;