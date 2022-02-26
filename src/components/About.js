import React from 'react';
import Profile from './Profile';
import Skillset from './Skillset';
import Languages from './Languages';
import Experience from './Experience';

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

class About extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener("resize", () => this.resize());
        document.addEventListener("scroll", () => this.onScroll())
        this.state = {
            imgSize: window.innerWidth / 5 + 'px'
        }
    }
    onScroll() {
        let elements = document.querySelectorAll('.skill-bar');
        let percentages = [90, 75, 80, 85, 95, 90, 60, 30];
        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            if (isInViewport(element)) {
                element.style.setProperty('--width', percentages[index] + '%');
            } else {
                element.style.setProperty('--width', '5%');
            }
        }
    }
    resize() {
        let divs = document.querySelectorAll('.about>div');
        divs[0].style.height = window.innerHeight - 200 + 'px';
        for (let index = 1; index < divs.length; index++) {
            divs[index].style.height = window.innerHeight + 'px';

        }
    }
    render() {
        return (
            <div className='about'>
                <Profile scroll={window.innerHeight} />
                <Skillset scroll={2 * window.innerHeight} />
                <Languages scroll={3 * window.innerHeight} />
                <Experience scroll={0}/>
            </div>
        );
    }
    componentDidMount() {
        this.resize();
    }
}
export default About;