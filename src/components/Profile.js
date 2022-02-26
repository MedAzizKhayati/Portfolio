import React from 'react';
import cv from '../assets/files/CV-Med-Aziz-Khayati.pdf'
import coder from '../assets/images/coder.png'
import ScrollButton from './ScrollButton';
import profile from '../assets/icons/profile.png'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSize: window.innerWidth  / 5 + 'px'
        }
        window.addEventListener("resize", () => this.resize());
    }
    resize(){
        this.setState({
            imgSize: window.innerWidth  / 5 + 'px'
        })
    }
    render() { 
        return ( 
            <div>
                <h1>My Profile <img src={profile} /></h1>
                <div className='welcome'>
                    <div className="profile">
                        <h1>Hi,</h1>
                        <h1>I'm Mohamed Aziz,</h1>
                        <h1>Software Engineer.</h1>
                        <form method='get' action={cv}>
                            <button type='submit'><div>Download CV</div><i></i></button>
                        </form>
                    </div>
                    <img 
                        src={coder} 
                        style={{width: this.state.imgSize, height: this.state.imgSize}}/>
                </div>
                <ScrollButton 
                    scroll= {this.props.scroll}
                    name = {"Skillset"} />
            </div>
         );
    }
}
 
export default Profile;