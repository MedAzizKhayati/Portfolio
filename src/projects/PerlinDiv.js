import Two, { Anchor } from 'twojs-ts';
import { Noise } from 'noisejs';
import Project from './Project';

class PerlinDiv extends Project {
    init(){
        this.noise = new Noise(Math.random());
        this.blob = new Two.Path([], true, true);
        this.two.add(this.blob);
        this.blob.fill = "#333";
        this.blob.noStroke();
        this.noiseLayer = 0;
    }
    update(){
        const vertices = [];
        vertices.push(new Anchor(0, 0));
        this.noiseLayer += 0.007;
        for(let i = 0; i <= this.width; i += 10){
            vertices.push(new Anchor(i, this.height / 2 + this.noise.perlin2(i * 0.005, this.noiseLayer) * this.height / 2));
        }
        vertices.push(new Anchor(this.width, 0));
        this.blob.vertices = vertices;
    }
}
export default PerlinDiv;