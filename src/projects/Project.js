import Two, { Anchor } from "twojs-ts";

class Project{
    constructor(two){
        this.two = two;
        this.width = this.two.width;
        this.height = this.two.height;
        this.two.renderer.domElement.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.two.renderer.domElement.addEventListener("mousedown", () => this.onMouseDown());
        this.two.renderer.domElement.addEventListener("mouseleave", () => this.onMouseUp());
        this.two.renderer.domElement.addEventListener("mouseup", () => this.onMouseUp());
        this.mousePos = new Anchor();
        document.addEventListener("keydown", (e) => this.changeState(e));
        this.intervalFunction = null;
        this.init();
        this.update = this.update.bind(this);
        this.two.bind('update', this.update);
    }
    changeState(e){

    }
    onMouseMove(e){
        this.mx = e.clientX - this.two.renderer.domElement.getBoundingClientRect().left;
        this.my = e.clientY - this.two.renderer.domElement.getBoundingClientRect().top;
        this.mousePos.set(this.mx, this.my);
    }
    onMouseDown() {
        if(this.intervalFunction)
            this.interval = setInterval(() => this.intervalFunction(), 10);
    }
    onMouseUp() {
        clearInterval(this.interval);
        this.interval = false;
    }
    init(){
        //Overwrite this init function in your project subclass to initialise your simulation
        let text = new Two.Text('Two Projects', this.width / 2, this.height /2, {size: 30});
        this.two.add(text);
    }
    update(){
        //Overwrite this Function in your project subclass 
    }
}
export default Project;