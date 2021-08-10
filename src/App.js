import TwoCanvas from './components/TwoCanvas.js';
import PerlinNoise from './projects/PerlinNoise';
import OrbitSim from './projects/OrbitSim';
import Snake from './projects/Snake'
import Footer from './components/Footer.js';
import React from 'react';
import DoublePendulum from './projects/DoublePendulum.js';
import Sort from './projects/Sort.js';
import PathFinder from './projects/PathFinder.js';
import Project from './projects/Project.js';
import Two from 'twojs-ts';
import RayCasting from './projects/RayCasting.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [OrbitSim, Snake, DoublePendulum, PerlinNoise, Sort, PathFinder, RayCasting ,Project],
      projectWidth: 420,
      projectHeight: 260
    }
  }
  render() {
    return (
      <div>
        <Footer />
        <div className="container">
          {this.state.projects.map(element =>
               <TwoCanvas 
               project={element}
               key={element}
               width={this.state.projectWidth} 
               height={this.state.projectHeight}
               type={element == PathFinder ? Two.Types.webgl : Two.Types.canvas}
               />
          )}
        </div>
      </div>
    );
  }
}

export default App;
