import React, { useState } from 'react';
import './array-element.css';
function ArrayElement(props) {
  return (
    <div className="array-element">
      <span className="array-index">{props.index}</span>
      {props.value}
    </div>
  );
}

export default ArrayElement;
