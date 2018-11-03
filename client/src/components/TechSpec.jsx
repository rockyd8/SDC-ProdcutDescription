import React from 'react';

const TechSpec= ({techSpec}) =>(
  <div className="tech">
    <ul>
      <li className="techSpec">
        {techSpec && techSpec.types}:{techSpec && techSpec.description}
      </li>
    </ul>
  </div>
)

export default TechSpec;