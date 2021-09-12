import React from "react";
import experience from '../assets/icons/experience.png'
import CardShow from "./CardShow";
import ScrollButton from "./ScrollButton";

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>My Experience <img src={experience} /></h1>
                <CardShow />
                <ScrollButton
                    scroll={0}
                    name={"Go Back Up"} />
            </div>
         );
    }
}
 
export default Experience;