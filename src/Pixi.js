import React from 'react';
import Two from 'twojs-ts';


class Pixi extends React.Component{
    constructor(props){
        super(props);
        this.two = new Two({ width: 1280, height: 720, type: Two.Types.canvas});
        this.project = new props.project(this.two);
    }
    render(){
        var circle = this.two.makeCircle(-70, 0, 50);
        var rect = this.two.makeRectangle(70, 0, 100, 100);
        circle.fill = '#FF8000';
        rect.fill = 'rgba(0, 200, 255, 0.75)';

        var group = this.two.makeGroup(circle, rect);
        group.translation.set(this.two.width / 2, this.two.height / 2);
        group.scale = 0;
        group.noStroke();

        // Bind a function to scale and rotate the group
        // to the animation loop.
        this.two.bind('update', function (frameCount) {
            // This code is called everytime two.update() is called.
            // Effectively 60 times per second.
            if (group.scale > 0.9999) {
                group.scale = group.rotation = 0;
            }
            var t = (1 - group.scale) * 0.125;
            group.scale += t;
            group.rotation += t * 4 * Math.PI;
            
        }).play();  // Finally, start the animation loop 
        



        return(
        <div ref={(nodeElement) => 
            {nodeElement && nodeElement.appendChild(this.two.renderer.domElement)}}>
        </div>
        )
    }
}
export default Pixi;