import React, { useState } from 'react';
import './variable.css';
function Variable(props) {
  return (
    <div className="variable">
      <span className="key">{props.name}</span>
      <span className="value">{props.value}</span>
    </div>
  );
}

export default Variable;
