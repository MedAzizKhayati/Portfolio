import React from 'react';
import Two from 'twojs-ts'

class TwoCanvas extends React.Component {
    init() {
        const type = this.props.type ? this.props.type : Two.Types.canvas;
        this.two = new Two({ width: this.props.width, height: this.props.height, type: type });
        this.project = new this.props.project(this.two);
        this.two.renderer.domElement.className = "TwoCanvas";
        if (!this.props.maximized) {
            this.two.renderer.domElement.addEventListener("mouseenter", () => this.two.play());
            this.two.renderer.domElement.addEventListener("mouseleave", () => this.two.pause());
            this.two.pause();
        } else {
            this.two.renderer.domElement.style.background = "rgba(255, 255, 255, 1)"
            this.two.play();
        }
        this.two.update();
    }
    render() {
        if (this.two) {
            let domElement = this.two.renderer.domElement;
            if (domElement.parentElement)
                domElement.parentElement.removeChild(domElement);
            this.two = null;
        }
        this.init();
        return (
            <div ref={(nodeElement) => { nodeElement && nodeElement.appendChild(this.two.renderer.domElement) }}>
            </div>
        )
    }
}
export default TwoCanvas;