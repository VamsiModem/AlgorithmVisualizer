import React, { useState } from 'react';
import Variable from '../variable/variable';
import './variable-state-viewer.css';
function VariableStateViewer(props) {
  var children = [];
  for (var p in props.variables) {
    children.push(<Variable name={p} key={p} value={props.variables[p]} />);
  }
  return <div className="variables">{children}</div>;
}

export default VariableStateViewer;
