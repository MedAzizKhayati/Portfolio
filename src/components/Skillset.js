import teamwork from '../assets/icons/teamwork.png'
import problemSolving from '../assets/icons/problem-solving.png'
import React from 'react';
import SkillBar from './SkillBar';
import skills from '../assets/icons/skills.png'
import ScrollButton from './ScrollButton';

class Skillset extends React.Component{
    render(){
        return(
            <div>
                <h1>My Skills <img src={skills} /></h1>
                <div className="skills">
                    <h1><img src={teamwork}/> Teamwork </h1>
                    <h1><img src={problemSolving}/> Problem Solving </h1>
                    <div className="expertise">
                        <h1>My Expertise</h1>
                    </div>
                    <SkillBar skills='C/C++/C#/R/Javascript/Java/Python'/>
                    <SkillBar skills='UML'/>
                    <SkillBar skills='Scrum Methodologies (Agile)'/>
                    <SkillBar skills='Fullstack Web/Mobile Dev (Symfony, React, SQL, Spring Boot, JEE, Flask, NestJs)'/>
                </div>
                <ScrollButton 
                    scroll= {this.props.scroll}
                    name = {"Languages"} />
            </div>
            
        );
    }
    
}
export default Skillset;