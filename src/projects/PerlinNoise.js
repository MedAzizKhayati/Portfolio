import Two from 'twojs-ts';
import { Noise } from 'noisejs';
import Project from './Project';

class PerlinNoise extends Project {
    init(){
        this.noise = new Noise(Math.random());
        this.position = new Two.Vector(this.width / 2, this.height / 2);
        this.radius = this.two.height / 3;
        this.noiseLayer = 0;
        this.blob = new Two.Path([], true, true);
        this.two.add(this.blob);
        this.blob.fill = 'rgb(0,0,40)'
        this.blob.noStroke();
    }
    update() {
        const vertices = [];
        this.noiseLayer += 0.01;
        for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
            var x = Math.cos(angle);
            var y = Math.sin(angle);

            var position = new Two.Anchor(x, y);
            var radius = this.noise.perlin3(x*2, y*2, this.noiseLayer) * this.radius/3 + this.radius;

            position.multiplyScalar(radius);
            position.addSelf(this.position);

            vertices.push(position);
        }
        this.blob.vertices = vertices;
    }
}
export default PerlinNoise;