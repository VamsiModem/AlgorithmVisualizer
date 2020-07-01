import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ArrayGenerator from '../array-generator/array-generator.component';
import { BST } from '../trees/bst/BinarySearchTree'
import BSTComponent from '../trees/bst/bst.component'
function Trees(props) {
  const [tree, setTree] = useState(null);
  return (
    <Container maxWidth={false}>
        <div>
          <ArrayGenerator 
            min={5} 
            max={100} 
            onChange={(e, newValue, array) => setTree(new BST().insertFromArray(array).draw())} 
            className="slider-comp"
            disabled={false}
            label="Array Size"
            defaultValue={0}
            style={{marginLeft:"5px"}}/>
            <BSTComponent root={tree} />
        </div>
    </Container>
  );
}

export default Trees;
