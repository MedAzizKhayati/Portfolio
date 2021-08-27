import Two, { Anchor } from 'twojs-ts';
import Project from './Project';

var G = 0;
class MassBall {
    constructor(position, velocity, radius, two) {
        this.acceleration = new Anchor(0, G);
        this.two = two;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.mass = radius / 10;
        this.circle = this.two.makeCircle(0, 0, radius);
        this.circle.translation = position;
        this.circle.fill = "black";
    }
    update() {
        this.acceleration.y = G;
        this.velocity.addSelf(this.acceleration);
        this.position.addSelf(this.velocity);

        if (this.position.y + this.radius > this.two.height) {
            this.position.y = this.two.height - this.radius;
            this.velocity.y *= -0.7;
        } else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= -0.95;
        }
        if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.x *= -0.95;
        } else if (this.position.x > this.two.width - this.radius) {
            this.position.x = this.two.width - this.radius;
            this.velocity.x *= -0.95;
        }
    }
}

class ElascticCollisions extends Project {
    constructor(two) {
        super(two);
        for (let i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
            this.randomBallSpawner();
        }
    }
    randomBallSpawner(radius = -1){
        let x = Math.random() * this.width;
        let y = Math.random() * this.height;
        let pos = new Anchor(x, y);
        let vel = new Anchor(Math.random() * 2 - 1, Math.random() * 2 - 1);
        if(radius === -1)
            radius = Math.random() * 35 + 5;
        this.massBalls.push(new MassBall(pos, vel, radius, this.two));
    }
    init() {
        this.two.clear();
        this.gravityIndicator = this.two.makeText(G === 0 ? "Gravity OFF" : "Gravity ON", this.two.width / 2, 15, {size: 15});
        this.frameCountAtChange = 0;
        this.massBalls = [];
    }
    detectCollisions() {
        this.massBalls.sort((a, b) => {
            return a.position.x - b.position.x;
        });
        for (let i = 0; i < this.massBalls.length - 1; i++) {
            for (let j = i + 1; j < this.massBalls.length; j++) {
                let r1 = this.massBalls[i].radius;
                let r2 = this.massBalls[j].radius;
                let p1 = this.massBalls[i].position;
                let p2 = this.massBalls[j].position;
                if (p1.distanceTo(p2) < r1 + r2) {
                    let m1 = this.massBalls[i].mass;
                    let m2 = this.massBalls[j].mass;
                    let v1 = this.massBalls[i].velocity;
                    let v2 = this.massBalls[j].velocity;
                    let normal = new Anchor();
                    normal.sub(p1, p2).normalize();
                    //Teleporting one of the mass balls to prevent it from merging with the other one.
                    if (r1 > r2)
                        p2.sub(p1, normal.clone().multiplyScalar(r1 + r2));
                    else
                        p1.add(normal.clone().multiplyScalar(r1 + r2), p2);
                    normal.sub(p1, p2).normalize();
                    let vr = new Anchor();
                    let vn = normal.clone().multiplyScalar(vr.sub(v1, v2).dot(normal));
                    v1.subSelf(vn.clone().multiplyScalar(2 * m2 / (m1 + m2)));
                    v2.addSelf(vn.clone().multiplyScalar(2 * m1 / (m1 + m2)));
                } else if (Math.abs(p1.x - p2.x) > 100)
                    break;
            }
        }
    }
    update() {
        // console.log(this.uniqueId);
        for (let i = 0; i < this.massBalls.length; i++) {
            this.massBalls[i].update();
        }
        this.detectCollisions();
    }
    simulateAtoms() {
        this.init();
        let radius = 5
        for (let i = 0; i < 100; i++) {
            this.randomBallSpawner(radius);
        }
    }
    controlBall() {
        let d = new Date();
        let n = d.getTime();
        this.currentBall.radius = 5 + Math.abs(Math.sin(n / 1000)) * 30;
        this.currentBall.mass = this.currentBall.radius / 10;
        this.currentBall.circle.radius = this.currentBall.radius;
        this.two.remove(this.line);
        this.line = this.two.makeLine(this.mousePos.x, this.mousePos.y, this.currentBall.position.x, this.currentBall.position.y);
        this.currentBall.velocity.sub(this.currentBall.position, this.mousePos).multiplyScalar(0.05);
    }
    onMouseDown() {
        this.currentBall = new MassBall(this.mousePos.clone(), new Anchor(), 25, this.two);
        this.currentPos = this.mousePos.clone();
        if (this.controlBall)
            this.interval = setInterval(() => this.controlBall(), 10);
    }
    onMouseUp() {
        if (this.currentBall)
            this.massBalls.push(this.currentBall);
        this.two.remove(this.line);
        clearInterval(this.interval);
        this.interval = false;
    }
    changeState(e) {
        if (e.code === "KeyR") {
            this.init();
        } else if (e.code === "KeyG") {
            if (this.two.frameCount - this.frameCountAtChange > 10) {
                G = G === 0 ? 0.1 : 0;
                this.gravityIndicator.value = G === 0 ? "Gravity OFF" : "Gravity ON";
                this.frameCountAtChange = this.two.frameCount;
            }
        } else if (e.code === "KeyQ") {
            if (this.two.frameCount - this.frameCountAtChange > 10) {
                this.simulateAtoms();
                this.frameCountAtChange = this.two.frameCount;
            }
        } else if (e.code === "KeyS") {
            for (let index = 0; index < 1000; index++) {
                this.update();
            }
        }
    }
}

export default ElascticCollisions;