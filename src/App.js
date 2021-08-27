import Footer from './components/Footer.js';
import React from 'react';
import ProjectsHandler from './components/ProjectsHandler.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Home'
    }
    this.redirectToAbout = this.redirectToAbout.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
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
        <Footer
          title={this.state.page === 'Home'? 'Summer Projects': 'Resume'}
          home={this.redirectToHome}
          about={this.redirectToAbout}
        />
        {this.state.page === 'Home'? <ProjectsHandler />: <h1>Hello This is About</h1>}
      </div>
    );
  }
}
export default App;
