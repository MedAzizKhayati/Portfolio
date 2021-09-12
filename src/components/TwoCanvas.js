import React from 'react';
import Two from 'twojs-ts'

class TwoCanvas extends React.Component {
    constructor(props){
        super(props);
        const type = this.props.type ? this.props.type : Two.Types.canvas;
        if(!this.props.project.isInstanciated()){
            this.two = new Two({ width: this.props.width, height: this.props.height, type: type });
            this.props.project.getInstance(this.two);
            this.two.renderer.domElement.className = "TwoCanvas";
            this.two.renderer.domElement.addEventListener("mouseenter", () => this.play());
            this.two.renderer.domElement.addEventListener("mouseleave", () => this.pause());
        }else{
            let instance = this.props.project.getInstance(this.two);
            if(instance.width != this.props.width){
                let instance = this.props.project.getInstance(this.two);
                instance.width = instance.two.width = this.props.width;
                instance.height = instance.two.height = this.props.height;
                instance.two.clear();
                instance.init();
            }
            this.two = instance.two;
        }
    }
    play(){
        return !this.two.maximized ? this.two.play(): null;
    }
    pause(){
        return !this.two.maximized ? this.two.pause(): null;
    }

    init() {
        this.two.maximized = this.props.maximized;
        if (!this.props.maximized) {
            this.two.renderer.domElement.style.background = null;
            this.two.pause();
        } else {
            this.two.renderer.domElement.style.background = "rgba(255, 255, 255, 1)";
            this.two.play();
        }
        this.two.update();
    }
    render() {
        this.init();
        return (
            <div ref={(nodeElement) => { nodeElement && nodeElement.appendChild(this.two.renderer.domElement) }}>
            </div>
        )
    }
}
export default TwoCanvas;