import React from 'react';


const Features = ({data, handleClick}) => {
  return (
  <div>

  <div className="features">
   {data.map(feature => <Feature feature={feature} />)}
  </div>
  </div>
)
}

const Feature= ({feature}) =>(
  <div className="feed">
    <ul>
      <li className="feature">
      {feature.features}
      {console.log(feature.features)}
      </li>
    </ul>
  </div>
)




export default Features;

//onClick{() => {this.changeView("techspecs")}}
//<button className="switch-view-button" type="submit">TechSpecs</button><br/>