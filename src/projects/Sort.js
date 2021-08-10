import { Noise } from 'noisejs';
import Project from './Project';

class Sort extends Project {
    init() {
        this.two.clear();
        this.justStarted = true;
        this.noise = new Noise(Math.random());
        this.rectWidth = 1;
        this.algorithm = null;
        this.length = this.width / this.rectWidth;
        this.rects = Array(this.length).fill(0).map((value, index) => {
            let rect = this.two.makeRectangle(
                index * this.rectWidth,
                this.height / 2,
                this.rectWidth,
                this.noise.perlin2(index * 0.02, 0) * this.height / 2 + this.height / 2
                //this.height * (this.length - index) / this.length
            );
            rect.fill = "black";
            return rect;
        })
    }
    changeState(e) {
        if (e.code === "KeyS") {
            this.algorithm = this.iterativeQuickSort;
            this.algorithmState = "justStarted";
        } else if (e.code === "KeyR") {
            this.init();
        }
    }
    swap(i, j) {
        let tmp = this.rects[i].height;
        this.rects[i].height = this.rects[j].height;
        this.rects[j].height = tmp;
    }
    partitionHigh(low, high) {
        let pivot = this.rects[high].height;
        let i = low;
        for (let j = low; j < high; j++) {
            if (this.rects[j].height <= pivot) {
                this.swap(i, j);
                i++;
            }
        }
        this.swap(i, high);
        return i;
    }
    iterativeQuickSort() {
        if (this.justStarted) {
            this.stack = [];
            this.start = 0;
            this.end = this.rects.length - 1;
            this.stack.push({ x: this.start, y: this.end });
            this.justStarted = false;
        }
        if (this.stack.length) {
            const { x, y } = this.stack.shift();
            const PI = this.partitionHigh(x, y);

            if (PI - 1 > x) {
                this.stack.push({ x: x, y: PI - 1 });
            }
            if (PI + 1 < y) {
                this.stack.push({ x: PI + 1, y: y });
            }
        } else {
            this.i = 0;
            this.algorithm = this.greenAll;
        }
    }
    bubbleSort() {
        if (this.justStarted) {
            this.i = 0;
            this.j = 0;
            this.justStarted = false;
        }
        if (this.i < this.length - 1) {
            if (this.j < this.length - this.i - 1) {
                if (this.rects[this.j].height > this.rects[this.j + 1].height) {
                    this.swap(this.j, this.j + 1);
                }
                this.j++;
            }
            else {
                this.j = 0;
                this.i++;
            }
        } else {
            this.i = 0;
            this.algorithm = this.greenAll;
        }
    }
    insertionSort() {
        if (this.justStarted) {
            this.i = 1;
            this.j = 0;
            this.current = this.rects[this.i].height;
            this.justStarted = false;
        }
        if (this.i < this.length) {
            if (this.j > - 1 && this.current < this.rects[this.j].height) {
                this.rects[this.j + 1].height = this.rects[this.j].height;
                this.j--;
            } else {
                this.rects[this.j + 1].height = this.current;
                this.i++;
                this.j = this.i - 1;
                if (this.i < this.length)
                    this.current = this.rects[this.i].height;
            }
        } else {
            this.i = 0;
            this.algorithm = this.greenAll;
        }
    }
    selectionSort() {
        if (this.justStarted) {
            this.i = 0;
            this.j = this.i + 1;
            this.min = this.i;
            this.justStarted = false;
        }
        if (this.i < this.length) {
            if (this.j < this.length) {
                if (this.rects[this.j].height < this.rects[this.min].height) {
                    this.min = this.j
                }
                this.j++;
            } else {
                this.swap(this.i, this.min);
                this.i++;
                this.j = this.i + 1;
                this.min = this.i;
            }
        } else {
            this.i = 0;
            this.algorithm = this.greenAll;
        }
    }
    greenAll() {
        if (this.i < this.length) {
            this.rects[this.i].fill = "green";
            this.rects[this.i].stroke = "green";
            this.i++;
        } else {
            this.init();
        }
    }
    update() {
        if (this.algorithm)
            this.algorithm();
    }
}
export default Sort;