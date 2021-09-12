import React from 'react';
import SkillBar from './SkillBar';
import languages from '../assets/icons/languages.png'
import ScrollButton from './ScrollButton';

class Languages extends React.Component{
    render(){
        return(
            <div>
                <h1>Languages <img src={languages} /></h1>
                <div className="skills">
                    <SkillBar skills='Arabic'/>
                    <SkillBar skills='English'/>
                    <SkillBar skills='French'/>
                    <SkillBar skills='German'/>
                </div>
                <ScrollButton 
                    scroll= {this.props.scroll}
                    name = {"Experience"} />
            </div>
            
        );
    }
}
export default Languages;