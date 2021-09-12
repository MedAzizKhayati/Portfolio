import React from 'react';
import ProjectsHandler from './components/ProjectsHandler.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Home'
    }
    this.redirectToAbout = this.redirectToAbout.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
    document.documentElement.style.setProperty('--game-info-width', Math.floor(window.innerWidth * 0.64 / 20) * 20+'px');
  }
  redirectToHome(){
    this.setState({
      page: 'Home'
    });
  }
  redirectToAbout(){
    this.setState({
      page: 'About'
    });
  }
  render() {
    return (
      <div>
        <Navbar
          title={this.state.page === 'Home'? 'Summer Projects': 'Resume'}
          home={this.redirectToHome}
          about={this.redirectToAbout}
        />
        {this.state.page === 'Home'? <ProjectsHandler />: <About/>}
      </div>
    );
  }
}
export default App;
