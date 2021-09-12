import { Noise } from 'noisejs';
import Two, { Anchor } from 'twojs-ts';
import Project from './Project';

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class PathFinder extends Project {
    init() {
        this.two.clear();
        this.start = null;
        this.end = null;
        this.state = "drawing";
        this.algorithm = null
        this.grid = [];
        this.size = 20;
        this.algorithmState = "justStarted";
        this.intervalFunction = this.draw;
        this.gridHeight = this.height / this.size;
        this.gridWidth = this.width / this.size;
        this.lineGroup = new Two.Group();
        if (this.lineGroup.children.length < this.gridWidth * this.gridHeight) {
            for (let i = 0; i < this.gridWidth; i++) {
                this.grid.push([]);
                let line = new Two.Line(i * this.size, 0, i * this.size, this.height);
                line.stroke = "lightblue";
                this.lineGroup.add(line);
                if (i < this.gridHeight) {
                    let line = new Two.Line(0, i * this.size, this.width, i * this.size);
                    line.stroke = "lightblue";
                    this.lineGroup.add(line);
                }
            }
        } else {
            for (let i = 0; i < this.gridWidth; i++) {
                this.grid.push([]);
            }
        }

        this.two.add(this.lineGroup);
    }
    changeState(e) {
        if (e.code === "KeyS") {
            if (this.start && this.end && !this.algorithm) {
                this.algorithm = this.greedyBestFirstSearch;
                this.algorithmState = "justStarted";
            }
        } else if (e.code === "KeyQ") {
            if (!this.start && !this.end && !this.algorithm) {
                this.algorithm = this.recursiveDivision;
                this.algorithmState = "justStarted";
            }
        } else if (e.code === "KeyP") {
            if (!this.start && !this.end && !this.algorithm) {
                this.algorithm = this.noiseGrid;
                this.algorithmState = "justStarted";
            }
        } else if (e.code === "KeyG") {
            if (!this.start && !this.end && !this.algorithm) {
                this.algorithm = this.depthFirstSearchMaze;
                this.algorithmState = "justStarted";
            }
        }
        else if (e.code === "KeyD") {
            this.state = "drawing";
        }
        else if (e.code === "KeyE") {
            this.state = "erasing";
        }
        else if (e.code === "KeyR") {
            this.state = "resetting";
            this.init();
        }
    }
    makeRectangleRelativeToMouse() {
        return this.two.makeRectangle(
            Math.floor((this.mx / this.size) % this.gridWidth) * this.size + this.size / 2,
            Math.floor((this.my / this.size) % this.gridHeight) * this.size + this.size / 2,
            this.size,
            this.size
        );
    }
    makeGridRect(x, y) {
        return this.two.makeRectangle(
            x * this.size + this.size / 2,
            y * this.size + this.size / 2,
            this.size,
            this.size
        );
    }
    getIndexesOfRectangle(node) {
        let x = Math.min(
            Math.max((
                node.translation.x - this.size / 2) / this.size,
                0),
            this.width - 1
        );
        let y = (node.translation.y - this.size / 2) / this.size;
        return [x, y];
    }
    draw() {
        let rect = this.makeRectangleRelativeToMouse();
        let [x, y] = this.getIndexesOfRectangle(rect);
        if (this.state === "drawing") {
            if (!this.grid[x][y]) {
                this.grid[x][y] = rect;
                if (!this.start) {
                    this.start = rect
                    this.start.fill = "red";
                }
                else if (!this.end) {
                    this.end = rect;
                    this.end.fill = "green";
                }
                else {
                    rect.fill = "black";
                }
            }
            else {
                this.two.remove(rect);
            }
        }
        else if (this.state === "erasing") {
            this.two.remove(rect);
            this.two.remove(this.grid[x][y]);
            if (this.grid[x][y] === this.start)
                this.start = null;
            else if (this.grid[x][y] === this.end)
                this.end = null;
            this.grid[x][y] = null;
        }

    }
    getSurroundingIndexes(node) {
        let [x, y] = this.getIndexesOfRectangle(node);
        const tmp = [];
        if (x !== 0)
            tmp.push([-1, 0])
        if (x !== this.gridWidth - 1)
            tmp.push([1, 0])
        if (y !== this.gridHeight - 1)
            tmp.push([0, 1])
        if (y !== 0)
            tmp.push([0, -1])
        return tmp;
    }
    getNeighbours(node) {
        let [x, y] = this.getIndexesOfRectangle(node.currentNode);
        const tmp = this.getSurroundingIndexes(node.currentNode);
        let neighbours = []
        tmp.forEach((coord) => {
            if (!this.grid[x + coord[0]][coord[1] + y]) {
                const tmp = this.grid[x + coord[0]][coord[1] + y] = this.two.makeRectangle(
                    Math.floor(x + coord[0]) * this.size + this.size / 2,
                    Math.floor(coord[1] + y) * this.size + this.size / 2,
                    this.size,
                    this.size
                );
                tmp.fill = "lightblue";
                neighbours.push({
                    parentNode: node,
                    currentNode: tmp,
                    distance: this.calculateDistanceToEnd(tmp)
                });
            }
            else if (this.grid[x + coord[0]][coord[1] + y] === this.end) {
                neighbours.push({
                    parentNode: node,
                    currentNode: this.grid[x + coord[0]][coord[1] + y],
                    distance: this.calculateDistanceToEnd(this.grid[x + coord[0]][coord[1] + y])
                });
            }
        });
        return neighbours;
    }
    calculateDistanceToEnd(node) {
        return node.translation.distanceTo(this.end.translation);
    }
    greedyBestFirstSearch() {
        if (this.algorithmState === "justStarted") {
            this.closedList = [{
                parentNode: null,
                currentNode: this.start,
                distance: this.calculateDistanceToEnd(this.start)
            }];
            this.openList = this.getNeighbours(this.closedList[0]);
            this.algorithmState = "findingPath";
        } else if (this.algorithmState === "findingPath") {
            this.openList.sort((a, b) => a.distance - b.distance);
            let current = this.openList.shift();
            if (current && current.currentNode !== this.end) {
                current.currentNode.fill = "skyblue";
                this.closedList.push(current);
                this.getNeighbours(current).forEach((e) =>
                    this.openList.push(e)
                );
            } else if (!current) {
                this.algorithmState = "pathNotFound";
                this.algorithm = null;
            } else {
                this.algorithmState = "pathFound";
                this.closedList.push(current);
                this.currentPathNode = current.parentNode;
            }
        } else if (this.algorithmState === "pathFound") {
            if (this.currentPathNode.currentNode !== this.start) {
                this.currentPathNode.currentNode.fill = "yellow";
                this.currentPathNode = this.currentPathNode.parentNode;
            } else {
                this.algorithm = null;
            }
        }
    }
    rand(x, y) {
        return x = Math.floor(Math.random() * (1 + y - x)) + x;
    }
    recursiveDivision() {
        if (this.algorithmState === "justStarted") {
            this.algorithmState = "borderLimiting";
            this.i = 0;
            this.areas = [{ horizontal: [0, this.gridWidth - 1], vertical: [0, this.gridHeight - 1] }];
        } else if (this.algorithmState === "borderLimiting") {
            let condition = 0;
            if (this.i < this.gridWidth) {
                this.grid[this.i][0] = this.makeGridRect(this.i, 0);
                this.grid[this.i][0].fill = "black";
                this.grid[this.gridWidth - this.i - 1][this.gridHeight - 1] = this.makeGridRect(this.gridWidth - 1 - this.i, this.gridHeight - 1);
                this.grid[this.gridWidth - this.i - 1][this.gridHeight - 1].fill = "black";
            } else {
                condition++;
            }
            if (0 < this.i && this.i < this.gridHeight - 1) {
                this.grid[0][this.i] = this.makeGridRect(0, this.i)
                this.grid[0][this.i].fill = "black";
                this.grid[this.gridWidth - 1][this.gridHeight - 1 - this.i] = this.makeGridRect(this.gridWidth - 1, this.gridHeight - 1 - this.i);
                this.grid[this.gridWidth - 1][this.gridHeight - 1 - this.i].fill = "black";
            } else {
                condition++;
            }
            this.i++;
            if (condition === 2)
                this.algorithmState = "mazeGenerating";
        } else if (this.areas.length && this.algorithmState === "mazeGenerating") {
            //let horizontal = Boolean(Math.round(Math.random()));
            let noSpace = 0;
            const area = this.areas.pop();
            let [leftLimit, rightLimit] = area.horizontal;
            let [topLimit, bottomLimit] = area.vertical;
            let horizontal = (rightLimit - leftLimit) > (bottomLimit - topLimit);
            if (horizontal) {
                if (rightLimit - leftLimit > 3) {
                    this.x = this.rand(leftLimit + 3, rightLimit - 3);
                    this.areas.push(
                        { horizontal: [leftLimit, this.x], vertical: area.vertical },
                        { horizontal: [this.x, rightLimit], vertical: area.vertical }
                    );
                    if (!this.grid[this.x][topLimit])
                        topLimit += 2;
                    if (!this.grid[this.x][bottomLimit])
                        bottomLimit -= 2;
                    this.y = this.rand(topLimit + 1, bottomLimit - 1)
                    this.i = topLimit;
                    this.bottomLimit = bottomLimit;
                    this.algorithmState = "lineDrawing";
                    this.vertical = true;
                } else {
                    noSpace = true;
                    this.areas.push(area);
                }
            }
            if (!horizontal) {
                if (bottomLimit - topLimit > 3) {
                    this.y = this.rand(topLimit + 3, bottomLimit - 3);
                    this.areas.push(
                        { horizontal: area.horizontal, vertical: [topLimit, this.y] },
                        { horizontal: area.horizontal, vertical: [this.y, bottomLimit] }
                    );
                    if (!this.grid[leftLimit][this.y])
                        leftLimit += 2;
                    if (!this.grid[rightLimit][this.y])
                        rightLimit -= 2;
                    this.x = this.rand(leftLimit + 1, rightLimit - 1)
                    this.i = leftLimit;
                    this.rightLimit = rightLimit;
                    this.algorithmState = "lineDrawing";
                    this.vertical = false;
                } else {
                    noSpace = true;
                    this.areas.push(area);
                }
            }
            if (noSpace == 1)
                this.areas.pop();
        } else if (this.algorithmState === "lineDrawing") {
            if (this.vertical) {
                if (this.i <= this.bottomLimit) {
                    if (this.i != this.y && !this.grid[this.x][this.i]) {
                        this.grid[this.x][this.i] = this.makeGridRect(this.x, this.i);
                        this.grid[this.x][this.i].fill = "black";
                    }
                } else {
                    this.algorithmState = "mazeGenerating";
                }

            } else {
                if (this.i <= this.rightLimit) {
                    if (this.i != this.x && !this.grid[this.i][this.y]) {
                        this.grid[this.i][this.y] = this.makeGridRect(this.i, this.y);
                        this.grid[this.i][this.y].fill = "black";
                    }
                } else {
                    this.algorithmState = "mazeGenerating";
                }
            }
            this.i++;
        } else {
            this.algorithm = null;
        }
    }
    getNeighbourForDepthFirstSearch(node) {
        let [x, y] = node;
        let tmpRect = this.makeGridRect(x, y);
        const tmp = this.getSurroundingIndexes(tmpRect);
        this.two.remove(tmpRect);
        let neighbours = []
        tmp.forEach((coord) => {
            let [xx, yy] = [x + coord[0], coord[1] + y];
            if (this.grid[xx][yy]) {
                if (this.isAdjacentToOtherNodes([xx, yy]) <= 1)
                    neighbours.push([xx, yy]);
            }
        });
        shuffleArray(neighbours);
        return neighbours;
    }
    isAdjacentToOtherNodes(node) {
        let [x, y] = node;
        let tmpRect = this.makeGridRect(x, y);
        const tmp = this.getSurroundingIndexes(tmpRect);
        this.two.remove(tmpRect);
        if (x !== 0 && y !== 0)
            tmp.push([-1, -1])
        if (x !== this.gridWidth - 1 && y !== this.gridHeight - 1)
            tmp.push([1, 1])
        if (x !== 0 && y !== this.gridHeight - 1)
            tmp.push([-1, 1])
        if (x !== this.gridWidth - 1 && y !== 0)
            tmp.push([1, -1])
        let condition = 0;
        let lastAdjecentNode = null;
        tmp.forEach((coord) => {
            let node = this.grid[x + coord[0]][coord[1] + y];
            if (!node) {
                if (lastAdjecentNode) {
                    if (new Anchor(x + coord[0], coord[1] + y).distanceTo(lastAdjecentNode) > 1)
                        condition++;
                }
                else {
                    condition++;
                    lastAdjecentNode = new Anchor(x + coord[0], coord[1] + y);
                }
            }
        });
        return condition;
    }
    depthFirstSearchMaze() {
        if (this.algorithmState === "justStarted") {
            this.algorithmState = "mazeGenerating";
            for (let i = 0; i < this.gridWidth; i++) {
                for (let j = 0; j < this.gridHeight; j++) {
                    this.grid[i][j] = this.makeGridRect(i, j);
                    this.grid[i][j].fill = "black";
                }
            }
            this.stack = [];
            let x = this.rand(0, this.gridWidth - 1);
            let y = this.rand(0, this.gridHeight - 1);
            this.stack.push([x, y]);
        } else if (this.algorithmState === "mazeGenerating" && this.stack.length) {
            this.current = this.stack[this.stack.length - 1];
            this.stack.pop();
            if (this.isAdjacentToOtherNodes(this.current) <= 1) {
                let [x, y] = this.current;
                this.two.remove(this.grid[x][y]);
                this.grid[x][y] = null;
                this.getNeighbourForDepthFirstSearch(this.current).forEach(element => this.stack.push(element));
            }
        } else {
            this.algorithm = null;
        }
    }
    noiseGrid() {
        if (this.algorithmState === "justStarted") {
            this.i = 0;
            this.j = 0;
            this.noise = new Noise(Math.random());
            this.algorithmState = "gridMaking";
        } else if (this.algorithmState === "gridMaking") {
            if (this.i < this.gridWidth) {
                if (this.j < this.gridHeight) {
                    let noise = this.noise.simplex2(this.i * 0.1, this.j * 0.1)
                    if (noise >= 0) {
                        this.grid[this.i][this.j] = this.makeGridRect(this.i, this.j);
                        this.grid[this.i][this.j].fill = "black";
                    }
                    this.j++;
                } else {
                    this.j = 0;
                    this.i++;
                }
            } else {
                this.algorithmState = "justStarted";
                this.algorithm = null;
            }
        }
    }
    update() {
        if (this.algorithm)
            this.algorithm();
    }
}
export default PathFinder;