import React from 'react';
import Two from 'twojs-ts';
import PathFinder from '../projects/PathFinder';
import TwoCanvas from './TwoCanvas';
class ProjectCard extends React.Component {
    constructor(two) {
        super(two);
        this.state = this.props.state;
    }
    render() {
        this.state = this.props.state;
        const project = this.props.project;
        return (
            <div className={this.state.cssClass} style= {this.state.style}>
                <div className={this.state.maximized ? "divTwoMaximized" : "divTwo"}>
                    <TwoCanvas
                        maximized = {this.state.maximized}
                        project={project.project}
                        key={project}
                        width={this.state.width}
                        height={this.state.height}
                        type={project.project == PathFinder ? Two.Types.webgl : Two.Types.canvas}
                    />
                    <button id="maximize" onClick={() => this.props.onClick()}></button>
                </div>
                {Array(1).fill(0).map(() => {if(! this.state.maximized) return <h1>Paused</h1>;})}
                <h2 className="sim-title" style= {this.state.style}>{project.title}</h2>
                <div className="game-info" style={this.state.gameInfoStyle}>
                    <p>About: {project.description}</p>
                    {Object.keys(project.tips).map(key => {
                        if(key == "tips")
                            return (<p>Tips: {project.tips[key]}</p>)
                        else{
                            return (
                                <div style={{display: "flex", alignItems:"center"}}>
                                    <button id="keyButton">{key}</button>
                                    <p>{project.tips[key]}</p>
                                </div>
                            )
                        }
                    })}
                </div>       
            </div>
        );
    }
}

export default ProjectCard;