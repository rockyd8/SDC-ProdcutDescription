import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Features from './components/Features.jsx';
import TechSpecs from './components/TechSpecs.jsx';


class Productdescriptions extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "Features",
      descriptions: []
    }
  }

  componentDidMount(){
    console.log("Mounted");
    $.get('/productdescriptions',(data) =>{
      console.log(data[0]);
      this.setState({
        descriptions: data
      })
    })
  }

  changeView(){
    if(this.state.view === "Features"){
      this.setState({
        view:"TechSpecs"
      })
    } else{
      this.setState({
        view:"Features"
      })
    }
    //this.conponentDidMount();
  }

  renderView() {
    const {view} = this.state;
    if(view === "Features"){
      return <Features data={this.state.descriptions}/>
    }else if (view === "TechSpecs"){
      return <TechSpecs data={this.state.descriptions}/>
    }
  }

  render() {
    return(
      <div className="tabs">
      <button
        onClick={() => this.changeView()}>
        {this.state.view}
      </button>
      {this.renderView()}
      </div>
    );
  }
}



ReactDOM.render(< Productdescriptions />, document.getElementById('productDescriptions'));

