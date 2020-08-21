import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ArrayGenerator from '../array-generator/array-generator';
import { BST } from './binary-search-tree/BinarySearchTree';
import BSTComponent from './binary-search-tree/bst';
function Trees(props) {
  const [tree, setTree] = useState(null);
  const [isBalancedtree, setIsBalancedtree] = useState(false);
  return (
    <Container maxWidth={false}>
      <div>
        <div className="controls">
          <ArrayGenerator
            min={0}
            max={100}
            onChange={(e, newValue, array) =>
              setTree(new BST().insertFromArray(array, isBalancedtree).draw())
            }
            onBalancedTreeCheckBoxChange={(isChecked) =>
              setIsBalancedtree(isChecked)
            }
            className="slider-comp"
            disabled={false}
            label="Array Size"
            defaultValue={0}
            style={{ marginLeft: '5px' }}
          />
        </div>
        <div className="tree-cointainer">
          <BSTComponent root={tree} />
        </div>
      </div>
    </Container>
  );
}

export default Trees;
