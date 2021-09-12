import { Anchor } from 'twojs-ts';
import Project from './Project';

class Snake extends Project {
    constructor(two){
        super(two);
        this.highestScore = 0;
    }
    init() {
        document.addEventListener("keydown", (e) => this.moveSnake(e));
        this.size = 20;
        this.velocity = 4;
        this.length = 5;
        this.position = new Anchor(100 + this.size / 2, 120 + this.size / 2);
        this.food = this.two.makeRoundedRectangle(0, 0, this.size, this.size, 2);
        this.food.fill = "rgb(0,0,100)";
        this.food.translation = new Anchor(0, 0);
        this.body = [];
        this.SpawnFood();
        this.coords = [this.position];
        this.vels = [];
        for (let index = 0; index < this.length; index++) {
            if (index !== 0)
                this.coords.push(this.position.clone().addSelf(new Anchor(-this.size * index, 0)));
            this.vels.push(new Anchor(this.velocity, 0));
            let square = this.two.makeRoundedRectangle(0, 0, this.size, this.size, 2);
            square.translation = this.coords[index];
            square.fill = index === 0 ? "red" : "black";
            this.body.push(square);
        }
        this.currentScore = this.two.makeText(`Score: ${this.body.length}`, 15, 50, { size: 20, alignment: "left" });
        this.maxScore = this.two.makeText(`Highest Score: ${this.highestScore ? this.highestScore : 0}`, 15, 80, { size: 20, alignment: "left" })
    }
    elongate() {
        this.coords.push(this.coords[this.coords.length - 1].clone());
        this.vels.push(new Anchor(0, 0));
        let square = this.two.makeRoundedRectangle(0, 0, this.size, this.size, 2);
        square.translation = this.coords[this.coords.length - 1];
        square.fill = "black";
        this.body.push(square);
    }
    moveSnake(e) {
        if ((e.code === "KeyW" || e.code === "ArrowUp") && this.vels[0].y === 0) {
            this.justChanged = new Anchor(0, -this.velocity);
        }
        else if ((e.code === "KeyS" || e.code === "ArrowDown") && this.vels[0].y === 0) {
            this.justChanged = new Anchor(0, this.velocity);
        }
        else if ((e.code === "KeyA" || e.code === "ArrowLeft") && this.vels[0].x === 0) {
            this.justChanged = new Anchor(-this.velocity, 0);
        }
        else if ((e.code === "KeyD" || e.code === "ArrowRight") && this.vels[0].x === 0) {
            this.justChanged = new Anchor(this.velocity, 0);
        }
        else if (e.code === "KeyE") {
            this.justChanged = this.elongate;
        }
    }
    SpawnFood() {
        var condition = true;
        var x, y;
        while(condition){
            condition = false;
            x = Math.floor(Math.random() * this.width / this.size) * this.size + this.size / 2;
            y = Math.floor(Math.random() * this.height / this.size) * this.size + this.size / 2;
            for (let index = 0; index < this.body.length; index++) {
                if(!this.body[index].translation.distanceTo(new Anchor(x, y))){
                    condition = true;
                    break;
                }  
            }  
        }      
        this.food.translation.set(x, y);
    }
    respawn() {
        this.two.clear();
        this.init();
    }
    update() {
        let died = false;
        this.coords.forEach((position, index) => {
            position.addSelf(this.vels[index]);
            if (!position.distanceTo(this.position) && index !== 0)
                died = true;
        })
        if (this.position.x < 0 || this.position.y < 0 || this.position.x > this.width || this.position.y > this.height)
            died = true;
        if (died)
            this.respawn();

        if ((this.position.x - this.size / 2) % this.size === 0 && (this.position.y - this.size / 2) % this.size === 0) {
            for (let index = this.vels.length - 1; index > 0; index--) {
                this.vels[index].copy(this.vels[index - 1]);
            }
            if (typeof this.justChanged === "function") {
                this.justChanged();
                this.justChanged = null;
            }
            else if (this.justChanged) {
                this.vels[0].copy(this.justChanged);
                this.justChanged = null;
            }
        }

        if (!this.position.distanceTo(this.food.translation)) {
            this.SpawnFood();
            this.elongate();
            this.currentScore.value = `Score: ${this.body.length}`;
            if (this.body.length > this.highestScore) {
                this.highestScore = this.body.length;
                this.maxScore.value = `Highest Score: ${this.highestScore}`;
            }
        }
    }
}
export default Snake;