import React from 'react';


const TechSpecs = ({data, handleClick}) => {
  return (
  <div>
  <button className="switch-view-button" onClick{() => {this.changeView("features")}} type="submit">Features</button><br/>
  <div className="features">
   {data.map(techSpec => <TechSpec techSpec={techSpec} />)}
  </div>
  </div>
)
}

const TechSpec= ({techSpec}) =>(
  <div className="feed">
    <ul>
      <li className="feature">
      {techSpec}
      </li>
    </ul>
  </div>
)

export default TechSpecs;

