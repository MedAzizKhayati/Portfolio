import Two, { Anchor } from 'twojs-ts';
import Project from './Project';

class DoublePendulum extends Project {
    init() {
        this.intervalFunction = this.controlPendulum;
        this.m1 = this.m2 = this.height / 30;
        this.r1 = this.r2 = this.height / 4;
        this.g = 0.05;
        this.a1 = [3.9, 0, 0];
        this.a2 = [2.5, 0, 0];
        this.path = [];
        this.position = new Anchor(this.width / 2, this.height / 3);
        this.masses = [new Two.Circle(0, 0, this.m1), new Two.Circle(0, 0, this.m2)];
        this.masses.forEach((mass) => {
            mass.translation = new Anchor();
            mass.fill = "black";
        })
        this.firstLine = this.two.makeLine();
        this.secondLine = this.two.makeLine();
        this.firstLine.vertices = [this.position, this.masses[0].translation];
        this.secondLine.vertices = [ this.masses[1].translation, this.masses[0].translation];
        this.two.add(this.masses);
        this.text = new Two.Text("Hold and drag to change masses' position..", 10, 30, {alignment: "left", size: this.height / 20});
        this.two.add(this.text);
    }
    controlPendulum(){
        let mousePos = new Anchor(this.mx, this.my);
        if(mousePos.distanceTo(this.masses[0].translation) < mousePos.distanceTo(this.masses[1].translation)){
            mousePos.subSelf(this.position);
            mousePos.normalize();
            this.a1[0] = Math.atan2(mousePos.x, mousePos.y);
        }else{
            mousePos.subSelf(this.masses[0].translation);
            mousePos.normalize();
            this.a2[0] = Math.atan2(mousePos.x, mousePos.y);
        }
        this.a1[1] = this.a2[1] = 0;
    }
    update() {
        const sin1 = Math.sin(this.a1[0])
        const cos1 = Math.cos(this.a1[0])
        const sin2 = Math.sin(this.a2[0])
        const cos2 = Math.cos(this.a2[0])

        this.a1[2] = -this.g * (2 * this.m1 + this.m2) * sin1 - this.m2 * this.g * Math.sin(this.a1[0] - 2 * this.a2[0])
        this.a1[2] -= 2 * Math.sin(this.a1[0] - this.a2[0]) * this.m2 * (this.a2[1] * this.a2[1] * this.r2 + this.a1[1] * this.a1[1] * this.r1 * Math.cos(this.a1[0] - this.a2[0]))
        this.a1[2] *= 1 / (this.r1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1[0] - 2 * this.a2[0])))

        this.a2[2] = 2 * Math.sin(this.a1[0] - this.a2[0])
        this.a2[2] *= (this.a1[1] * this.a1[1] * this.r1 * (this.m1 + this.m2) + this.g * (this.m1 + this.m2) * cos1 + this.a2[1] * this.a2[1] * this.r2 * this.m2 * Math.cos(this.a1[0] - this.a2[0]))
        this.a2[2] *= 1 / (this.r2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1[0] - 2 * this.a2[0])))

        this.a1[1] += this.a1[2]
        this.a2[1] += this.a2[2]
        this.a1[0] += this.a1[1]
        this.a2[0] += this.a2[1]

        this.masses[0].translation.set(this.position.x + sin1 * this.r1, this.position.y + cos1 * this.r1);
        this.masses[1].translation.set(this.masses[0].translation.x + sin2 * this.r2, this.masses[0].translation.y + cos2 * this.r2);

        this.two.remove(this.traject);
        if(this.path.length > 255)
            this.path.shift();
        this.path.push(this.masses[1].translation.clone());
        this.traject = new Two.Path(this.path, false);
        this.two.add(this.traject);
        this.traject.noFill();
    }
}
export default DoublePendulum;