import React from 'react';
import ArrayGenerator from '../../array-generator/array-generator';
import ArrayVisualizer from '../../array-visualizer/array-visualizer';
import VariableStateViewer from '../../variable-state-viewer/variable-state-viewer';
import { InputBase, IconButton, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
class BinarySearchVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.prevElementRef = React.createRef();
    this.state = {
      array: [],
      children: [],
      searchValue: -1,
      foundIndex: -1,
      left: 0,
      right: 0,
      mid: 0,
    };
  }
  binarySearch = () => {
    let { left, right, mid } = this.state;
    const nums = this.state.array;
    const searchVal = this.state.searchValue;
    while (left <= right) {
      mid = left + Math.floor((right - left) / 2);
      this.setState({ mid });
      if (nums[mid] === searchVal) {
        this.setSearchState(nums.slice(mid, mid + 1), false, left, right, mid);
        return;
      }
      if (nums[mid] < searchVal) {
        left = mid + 1;
        this.setSearchState(nums.slice(left, right), false, left, right, mid);
      } else if (nums[mid] > searchVal) {
        right = mid - 1;
        this.setSearchState(nums.slice(left, right), true, left, right, mid);
      }
    }
  };
  setSearchState = (array, isLeft, left, right, middle) => {
    let children = this.state.children;
    children.push({ array: array, isLeft, variables: { left, middle, right } });
    this.setState({
      left,
      mid: middle,
      right,
      children: JSON.parse(JSON.stringify(children)),
    });
  };
  handleSearchValchange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ searchValue: value.length === 0 ? -1 : value });
  };
  handleSearch = () => {
    this.setState({
      children: [],
      mid: 0,
      left: 0,
      right: 0,
      foundIndex: -1,
    });
    this.binarySearch();
  };
  render() {
    let styles = {
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
      },
      input: {
        marginLeft: '1px',
        flex: 1,
        paddingRight: '5px',
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
    };
    var children = this.state.children.map((x) => {
      return (
        <div
          style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}
        >
          <span className="same-line">
            <ArrayVisualizer
              key={Math.floor(Math.random() * 100)}
              array={x.array}
              variableState={<VariableStateViewer variables={x.variables} />}
            />
          </span>
        </div>
      );
    });
    return (
      <Container maxWidth={false}>
        <div>
          <div className="controls">
            <ArrayGenerator
              min={0}
              max={30}
              onChange={(e, newValue, array) =>
                this.setState({
                  array,
                  right: newValue,
                })
              }
              onBalancedTreeCheckBoxChange={(isChecked) =>
                console.log(isChecked)
              }
              className="slider-comp"
              disabled={false}
              label="Array Size"
              defaultValue={0}
              style={{ marginLeft: '5px' }}
            />
          </div>
          <div component="form" style={styles.root}>
            <InputBase
              style={styles.input}
              placeholder="Enter a number to search"
              type="number"
              onChange={this.handleSearchValchange}
              value={this.state.searchValue}
            />

            <IconButton
              type="submit"
              style={styles.iconButton}
              aria-label="search"
              onClick={this.handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div className="tree-cointainer">
            <ArrayVisualizer
              ref={this.prevElementRef}
              array={this.state.array}
              variableState={<VariableStateViewer variables={{}} />}
            />
            <div>{children}</div>
          </div>
        </div>
      </Container>
    );
  }
}

export default BinarySearchVisualizer;
