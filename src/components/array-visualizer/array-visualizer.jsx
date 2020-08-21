import React, { useState } from 'react';
import ArrayElement from '../array-element/array-element';
import './array-visualizer.css';
function ArrayVisualizer(props) {
  const [isShown, setIsShown] = useState(false);
  var children = props.array.map((e, ei) => (
    <ArrayElement value={e} index={ei} key={ei} />
  ));
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="array-container">{children}</div>
      {isShown ? props.variableState : <></>}
    </div>
  );
}

export default ArrayVisualizer;
