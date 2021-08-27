import PerlinNoise from '../projects/PerlinNoise';
import OrbitSim from '../projects/OrbitSim';
import Snake from '../projects/Snake'
import Sort from '../projects/Sort.js';
import PathFinder from '../projects/PathFinder.js';
import RayCasting from '../projects/RayCasting.js';
import DoublePendulum from '../projects/DoublePendulum';
import ElascticCollisions from '../projects/ElasticCollisions';


class Project {
    constructor(project, title, description, tips, keys){
        this.project = project;
        this.title = title;
        this.description = description;
        this.tips = {
            tips: tips,
        }
        Object.keys(keys).forEach( key => this.tips[key] = keys[key]);
    }
}

const projects = [
    {
        project: OrbitSim,
        title: "Orbit Simulation",
        description: "This is a gravity simulator where you can spawn planets and make them orbit the sun by setting their initial velocity and direction.",
        tips: {
            tips: "Press, hold and drag the mouse to spawn a planet, try to make it orbit the sun.",
        }
    },
    {
        project: ElascticCollisions,
        title: "Elastic Collisions",
        description: "This is a simulation of Elastic Collisions where you can see how balls interact with each other.",
        tips: {
            tips: "Press, hold and drag the mouse to spawn a mass ball and control its velocity, be aware don't time travel if spawned many balls (it's heavy on the cpu).",
            "Q": "Press Q (A for Azerty Keybords) for gaz simulation.",
            "R": "Press R to reset the simulation and empty the chamber.",
            "G": "Press G to toggle Gravity On/Off.",
            "S": "Press and hold S for time travel.",
        }
    },
    {
        project: Snake,
        title: "Snake",
        description: "This is the basic snake game where you can feed your snake so that it grows and rizes your score.",
        tips: {
            tips: "use (W, A, S, D) or Arrows for controlling the snake, try to get the maximum score without hitting the walls.",
            "E": "Press E to make the snake grow (Don't cheat, play the game !!).",
        }
    },
    {
        project: DoublePendulum,
        title: "Double Pendulum",
        description: "If you like physics like me, you must've heard about the double pendulum, which is basically two balls attached to each other by two lines and let the gravity do its thing.",
        tips: {
            tips: "Press, hold and drag the pendulum to control its initial state.",
        }
    },
    {
        project: PerlinNoise,
        title: "Perlin Noise",
        description: "This is an animation that showcases how smooth is the perlin noise. It's not just random values, it generates randomly close values",
        tips: {
            tips: "Just enjoy the animation.",
        }
    },
    {
        project: Sort,
        title: "Sorting Visualizer",
        description: "This program showcases different sorting algorithms. Basically it tries to sort the lines from the shortest to the longest",
        tips: {
            tips: "Shuffle the way you like, choose and algorithm and watch it do its thing, if you get too bored hold S to make it go boom boom",
            "R": "Press R to shuffle",
            "D": "Press D to change the suffling method (Perlin Noise/Random)",
            "A": "Press A (Q for Azerty Keyboards) to choose QuickSort algorithm",
            "B": "Press B to toggle Bubble Sort",
            "I": "Press I to toggle Insertion Sort",
            "S": "Press and hold S for time travel.",
        }
    },
    {
        project: PathFinder,
        title: "Path Finder & Maze Generator",
        description: "This program showcases how the Greedy Best First Search works in Finding paths to any location on the grid, it also shows two different ways for generating random mazes, the first uses the recursive division algorithm and the second uses Depth First Search algorithm",
        tips: {
            tips: "Generate a maze and set the start location and the final one, and start the path finding process, or you can draw your own obstacles using your mouse. Be creative and have fun!",
            "G": "Press G for generating a maze using the Depth First Search algorithm.",
            "Q": "Press Q(A for Azerty Keyboards) for generating a maze using the recusive division algorithm.",
            "R": "Press R to empty the grid",
            "D": "Press D to toggle Drawing",
            "E": "Press E to toggle Erasing",
            "P": "Pres P to generate a map using Perlin Noise",
            "S": "Press S to start the Path Finding process."
        }
    },
    {
        project: RayCasting,
        title: "Ray Casting",
        description: "This is a program that simulates how light rays interact with obstacles.",
        tips: {
            tips: "Use your mouse to move the light source.",
            "R": "Press R to shuffle the obstacles.",
        }
    },
    
]
export default projects