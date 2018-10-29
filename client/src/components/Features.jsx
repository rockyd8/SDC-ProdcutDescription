import React from 'react';


const Features = ({data, handleClick}) => {
  return (
  <div>
  <button className="switch-view-button" onClick{() => {this.changeView("techspecs")}} type="submit">TechSpecs</button><br/>
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
      {feature}
      </li>
    </ul>
  </div>
)




export default Features;

