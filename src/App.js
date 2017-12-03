import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './views/Home'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import CompareFaces from './views/CompareFaces'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Navbar/>
        <main>
          <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/compare-faces" component={CompareFaces}/>
            </div>
          </Router>
        </main>
        <Sidebar/>
        <Footer/>
      </div>
    );
  }
}

export default App;
