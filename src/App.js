import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'  

export class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  pageSize = 15;
  apiKey=process.env.REACT_APP_API_KEY
  render() {
    return (
      <Router>
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path='/' element={<News showProgress = {this.setProgress} key="general" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general"/>} />
          <Route exact path='/business' element={<News showProgress = {this.setProgress} key="business" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business"/>} />
          <Route exact path='/entertainment' element={<News showProgress = {this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="entertainment"/>} />
          <Route exact path='/science' element={<News showProgress = {this.setProgress} key="science" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science"/>} />
          <Route exact path='/health' element={<News showProgress = {this.setProgress} key="health" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="health"/>} />
          <Route exact path='/sports' element={<News showProgress = {this.setProgress} key="sports" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="sports"/>} />
          <Route exact path='/technology' element={<News showProgress = {this.setProgress} key="technology" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="technology"/>} />
        </Routes>
      </div>
      </Router>
    )
  }
}

export default App

