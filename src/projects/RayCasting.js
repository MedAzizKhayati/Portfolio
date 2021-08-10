import Two, { Anchor } from 'twojs-ts';
import Project from './Project';

const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const sqrt = Math.sqrt;

function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    let seg1 = ua >= 0 && ua <= 1;
    let seg2 = ub >= 0 && ub <= 1;
    if(seg1 && seg2)
        return new Anchor(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
    else 
        return null;
}

class LightSource {
    constructor(rc) {
        this.rc = rc;
        this.position = rc.mousePos;
        this.rayCount = 101;
    }
    drawRays() {
        this.rc.two.remove(this.rays);
        this.rays = new Two.Group();
        for (let theta = 0; theta < 2 * PI; theta += 2 * PI / this.rayCount) {
            let x1 = this.position.x + this.rc.width / sqrt(1 + (sin(theta) / cos(theta)) ** 2);
            let x2 = this.position.x - this.rc.width / sqrt(1 + (sin(theta) / cos(theta)) ** 2);
            let y1 = this.position.y + (x1 - this.position.x) * sin(theta) / cos(theta);
            let y2 = this.position.y + (x2 - this.position.x) * sin(theta) / cos(theta);
            let point1 = new Anchor(x1, y1);
            let point2 = new Anchor(x2, y2);
            this.rc.obstacles.forEach(element => {
                let point = line_intersect(
                    x1, y1,
                    x2, y2,
                    element[0].x, element[0].y,
                    element[1].x, element[1].y
                );
                if (point && (x1 - this.position.x) * (point.x - this.position.x) > 0){
                    if (point.distanceTo(this.position) < point1.distanceTo(this.position))
                        point1.copy(point);
                }    
                else if (point){
                    if (point.distanceTo(this.position) < this.position.distanceTo(point2))
                        point2.copy(point);
                }               
            });
            let line = new Two.Line(point1.x, point1.y, point2.x, point2.y);
            line.stroke = "white";
            this.rays.add(line);
        }
        this.rc.two.add(this.rays);
    }
}

class RayCasting extends Project {
    init() {
        this.rect = this.two.makeRectangle(this.width / 2, this.height / 2, this.width, this.height);
        this.rect.fill = "black";
        this.setObstacles();  
        this.lightSource = new LightSource(this);
        
    }
    setObstacles(){
        this.two.remove(this.lines);
        this.lines = new Two.Group();
        this.obstacles = []
        for (let i = 0; i < 5; i++) {
            let x1 = Math.random()*this.width;
            let x2 = Math.random()*this.width;
            let y1 = Math.random()*this.height;
            let y2 = Math.random()*this.height;
            let obstacle = new Two.Line(x1, y1, x2, y2);
            obstacle.stroke = "white";
            this.lines.add(obstacle);
            this.obstacles.push([new Anchor(x1, y1), new Anchor(x2, y2)]);
        }
        this.two.add(this.lines);
    }
    update() {
        this.lightSource.drawRays();
    }
    changeState(e){
        if(e.code === "KeyR"){
            this.setObstacles();
        }
    }
}
export default RayCasting;