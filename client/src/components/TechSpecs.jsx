import React from 'react';


const TechSpecs = ({data, handleClick}) => {
  return (
  <div>

  <div className="features">
   {data.map(techSpec => <TechSpec techSpec={techSpec} />)}
  </div>
  </div>
)
}

const TechSpec= ({techSpec}) =>(
  <div className="feed">
    <ul>
      <li className="techSpec">
      {techSpec.techSpecs[0].types}:{techSpec.techSpecs[0].description}
      {console.log(techSpec.techSpecs[0].types)}
      </li>
    </ul>
  </div>
)

export default TechSpecs;

// onClick{() => {this.changeView("features")}}
//<button className="switch-view-button" type="submit">Features</button><br/>