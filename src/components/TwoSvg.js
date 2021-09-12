import React from 'react';
import Two from 'twojs-ts'

class TwoSvg extends React.Component {
    constructor(props){
        super(props);
        if(!this.props.project.isInstanciated()){
            const type = this.props.type ? this.props.type : Two.Types.canvas;
            this.two = new Two({ width: this.props.width, height: this.props.height, type: type });
            this.props.project.getInstance(this.two);
        }else{
            this.init()
        }
        this.two.play();
        this.two.update();
    }

    init(){
        let instance = this.props.project.getInstance(this.two);
        instance.two.width = this.props.width;
        instance.two.height = this.props.height;
        this.two = instance.two;
        instance.width = this.two.width;
        instance.height = this.two.height;
    }

    render() {
        this.init();
        return (
            <div ref={(nodeElement) => { nodeElement && nodeElement.appendChild(this.two.renderer.domElement) }}>
            </div>
        )
    }
}
export default TwoSvg;