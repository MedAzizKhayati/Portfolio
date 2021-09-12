import React from "react";
import Card from "./Card";

class Data {
    constructor(title, location, list){
        this.title = title;
        this.location = location;
        this.list = list;
    }
    clone(){
        return new Data(this.title, this.location, this.list)
    }
}

class CardShow extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.data = [
            new Data(
                'Exchange Participant (Speaking Club)',
                'AIESEC – Eskisehir, Turkey',
                [
                    'I was responsible for teaching people the ways to speak English in public.',
                    'This experience boosted my social skills, and made a more confident version of me.',
                    'Since I had to live with a host family, I became more friendly and caring with people around me, which made of me a good guest to host (I lived with 2 families throughout the Exchange Program that lasted 5 weeks)'
                ]
            ),
            new Data(
                'Participant at WinterCup',
                'ACM - INSAT',
                [
                    'In this Competition, we had to code as a team and we solved 6 problems with 100% accuracy, we came 15th.',
                    'I practiced the algorithms I learned, this experience also helped me boost my problem solving and team work skills.',
                ]
            ),
            new Data(
                'Participant at IEEE Extreme',
                'IEEE - INSAT',
                [
                    'In this experience, I tested my Problem Solving Skills, we played at this competition as a team of 3, we came 21st in Tunisia. (The language I used was Python)'
                ]
            ),
            new Data(
                'Participant at Robotics Day',
                'IEEE - INSAT',
                [
                    'In this project, I had no knowledge about robotics, but I managed to learn how to design a robot using Solidworks and program its function using the Arduino language, we did the project as a team and it was a great experience that taught me alot about time management and team work.',
                    'We made a wireless controlled robot that can hold and store objects in its trunk.'
                ]
            ),
        ];
    }
    render() { 
        return ( 
            <div className='card-show' ref={this.myRef}>
                {this.data.map(
                    (value,index) => <Card key={index} index={index} data={value}/>
                )}
            </div>
            
        );
    }
    componentDidMount(){
        this.index = this.data.length;
        this.node = this.myRef.current;
        this.node.style.setProperty('--card-size', window.innerHeight / 2.25 +'px');
        this.node.style.setProperty('--card-show-index', this.index ++);
        document.addEventListener('click', ()=>{
            this.node.style.setProperty('--card-show-index', ++this.index);
        })
    }
}
 
export default CardShow;