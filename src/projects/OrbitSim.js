import Two, { Anchor } from 'twojs-ts';
import Project from './Project';

const G = 100;

class Planet {
    constructor(position, mass, two, orbitSim) {
        this.orbitSim = orbitSim;
        this.two = two;
        this.position = position;
        this.mass = mass;
        this.radius = mass * 10;
        this.init();
        this.sandbox = false;
    }
    init() {
        this.twoObject = new Two.Circle(this.position.x, this.position.y, this.radius);
        this.two.add(this.twoObject);
        this.twoObject.fill = "black";
        this.twoObject.translation = this.position;
    }
}
class Moon extends Planet {
    constructor(position, velocity, mass, two, planets, orbitSim) {
        super(position, mass, two, orbitSim);
        this.velocity = velocity;
        this.planets = planets;
        this.acceleration = new Two.Anchor();
        this.trajectory = [];
    }
    update() {
        let collided = false;
        this.planets.forEach(planet => {
            let ab = new Anchor();
            ab.sub(planet.position, this.position);
            ab.multiplyScalar(G * planet.mass / Math.pow(ab.length(), 3));
            this.velocity.addSelf(ab);
            if (ab.sub(this.position, planet.position).length() < this.radius + planet.radius) {
                collided = true;
                if (!this.sandbox)
                    this.orbitSim.removeMoon(this);
            }
        });
        this.position.addSelf(this.velocity);
        if (this.position.length() > 5000)
            this.sandbox ? collided = true : this.orbitSim.removeMoon(this);
        if (collided && !this.sandbox)
            this.two.unbind('update', this.update);
        if (!this.sandbox && !collided) {
            if (this.trajectory.length > 255)
                this.trajectory.shift();
            this.trajectory.push(this.position.clone());
            this.two.remove(this.orbit);
            this.orbit = new Two.Path(this.trajectory, false, true);
            this.two.add(this.orbit);
            this.orbit.noFill();
        }
        return collided;
    }
}

class OrbitSim extends Project {
    init() {
        this.intervalFunction = this.spawnMoon;
        this.mouse = false;
        this.mousePos = new Anchor();
        this.planets = [new Planet(new Anchor(this.width / 2, this.height / 2), this.height / 100, this.two, this)];
        this.moons = [new Moon(new Anchor(this.width / 4, this.height / 2), new Anchor(0, 1.5), this.height / 350, this.two, this.planets, this)]
        this.ui = new Two.Text(`Planets remaining: ${this.moons.length}`, 10, 20, { alignment: "left", size: this.height / 15 });
        this.two.add(this.ui);
    }
    update() {
        this.ui.value = `Planets remaining: ${this.moons.length}`;
        for (let index = 0; index < this.moons.length; index++) {
            this.moons[index].update();
        }
    }
    removeMoon(moon) {
        let index = this.moons.indexOf(moon);
        if (index > 0)
            this.moons.splice(index, 1);
        this.two.unbind('update', moon.update);
        this.two.remove(moon.orbit);
        this.two.remove(moon.twoObject);
    }
    onMouseDown() {
        this.tempPosition = this.mousePos.clone();
        this.tempMoon = new Moon(this.mousePos.clone(), new Anchor(0, 0), Math.random() * this.height / 150 + 0.1, this.two, this.planets, this);
        this.tempMoon.sandbox = true;
        this.mouse = setInterval(() => this.spawnMoon(), 10);
    }
    onMouseUp() {
        if (this.mouse) {
            clearInterval(this.mouse);
            this.moons.push(this.tempMoon);
            this.tempMoon.position = this.tempPosition.clone();
            this.tempMoon.twoObject.translation = this.tempMoon.position;
            this.tempMoon.velocity = this.getMoonMouseVelocity();
            this.tempMoon.sandbox = false;
            this.mouse = false;
            this.two.remove(this.group);
            this.two.remove(this.powerLine);
        }
    }
    getMoonMouseVelocity() {
        let ab = new Anchor();
        ab.sub(this.tempMoon.position, this.mousePos);
        ab.multiplyScalar(0.01);
        return ab;
    }
    spawnMoon() {
        this.two.remove(this.group);
        this.two.remove(this.powerLine);
        this.tempMoon.position = this.tempPosition.clone();
        this.tempMoon.velocity = this.getMoonMouseVelocity();
        this.powerLine = this.two.makeLine(this.mousePos.x, this.mousePos.y, this.tempMoon.position.x, this.tempMoon.position.y);
        const iterations = 500;
        const futurePositions = [];
        for (let index = 0; index < iterations; index++) {
            if (this.tempMoon.update())
                break;
            if (index % 20 === 0) {
                futurePositions.push(new Two.Circle(this.tempMoon.position.x, this.tempMoon.position.y, 1));
                const rgb = 255 * index / iterations;
                futurePositions[futurePositions.length - 1].fill = `rgb(${rgb}, ${rgb}, ${rgb})`
                futurePositions[futurePositions.length - 1].stroke = `rgb(${rgb}, ${rgb}, ${rgb})`
            }
        }
        this.group = this.two.makeGroup(futurePositions);
    }

}

export default OrbitSim;