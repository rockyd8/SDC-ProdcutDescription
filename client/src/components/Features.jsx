import React from 'react';


const Features = ({features}) => {
  return (
  <div>
    <div className="features">
      {features && features.map((feature) => <Feature feature={feature}/>)}
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

