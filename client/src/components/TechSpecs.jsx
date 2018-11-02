import React from 'react';


const TechSpecs = ({techSpecs}) => {
  return (
  <div>

  <div className="features">
   {techSpecs && techSpecs.map(techSpec => <TechSpec techSpec={techSpec} />)}
  </div>
  </div>
)
}

const TechSpec= ({techSpec}) =>(
  <div className="feed">
    <ul>
      <li className="techSpec">
        {techSpec.types}:{techSpec.description}
      </li>
    </ul>
  </div>
)

export default TechSpecs;

