import React from "react";
import ProjectCard from "./ProjectCard";
import projects from '../data/projects';

class ProjectsHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsStates: Array(projects.length).fill({
        maximized: false,
        width: 420,
        height: 260,
        cssClass: "sim-div",
        gameInfoStyle: { display: "none" },
      }),
    }
  }
  handleMaximize(i) {
    this.setState(
      {
        cardsStates: Array(projects.length).fill(0).map(
          (value, index) => index === i && !this.state.cardsStates[i].maximized ?
            {
              maximized: true,
              width: Math.floor(window.innerWidth * 0.64 / 20) * 20,
              height: Math.floor(window.innerWidth * 0.64 * 9 / 16 / 20) * 20,
              style: { order: -1 },
              gameInfoStyle: { display: "block" },
              cssClass: "sim-div",
            } :
            {
              maximized: false,
              width: 420,
              height: 260,
              style: {},
              gameInfoStyle: { display: "none" },
              cssClass: "sim-div",
            })
      }
    );
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  render() {
    return (
      <div className="container">
        {projects.map((element, index) =>
          <ProjectCard
            onClick={() => this.handleMaximize(index)}
            state={this.state.cardsStates[index]}
            project={element}
            key={Math.random() * 100_000_000 * Date.now()}
          />
        )}
      </div>
    );
  }
}

export default ProjectsHandler;