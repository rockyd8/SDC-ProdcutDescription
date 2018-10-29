import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Features from './components/Features.jsx';
import TechSpecs from './components/TechSpecs.jsx';


class Productdescriptions extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "main",
      descriptions: []
    }
  }

  conponentDidMount(){
    console.log("Mounted");
    $.get('/productdescriptions',(data) =>{
      console.log(data);

      this.setState({
        descriptions: data
      })
    })
  }

  changeView(tabs){
    this.setState({
      view:tabs
    })
  }

  renderView() {
    const {view} = this,state;
    if(view === "features"){
      return <Features handleClick={this.changeBlog.bind(this)}/>
    }else if (view === "techSpecs"){
      return <TechSpecs handleClick={this.changeBlog.bind(this)}/>
    }
  }

  render() {
    return(
      <div className="tabs">
      {this.renderView()}
      </div>
      )
  }
}



ReactDOM.render(<Productdescriptions />, document.getElementById('productDescriptions'));

