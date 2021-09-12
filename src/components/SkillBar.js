import React from "react";

class SkillBar extends React.Component{
    render(){
        return(
            <div className="skill-bar">
                <p>{this.props.skills}</p>
            </div>
        );
    }
}
export default SkillBar;