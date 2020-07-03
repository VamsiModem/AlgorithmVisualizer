import React from 'react';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
class BSTNodeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mouseX: null,
      mouseY: null,
    }
  }
    handleClick = (event) => {
      event.preventDefault();
      this.setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
      });
    };

    onLCAClick = () =>{
      this.handleClose();
      this.props.onLCAClick.call(this, this.props.node);
      
    }
    onInorderSuccessorClick = () =>{
      this.handleClose();
      this.props.onInorderSuccessorClick.call(this, this.props.node);
    }
    handleClose = () =>{
      this.setState({mouseX: null,
        mouseY: null,})
    }
    //let id = `node-${props.value}-depth-${props.depth}`;
    render(){
      let style = {
        top: `${this.props.node.y* 55}px`,
        left:`${this.props.node.x * 25}px`,
        cursor: 'context-menu'
      }
      let lcaMenuTitle = 'Lowest Common Ancestor ' + (this.props.selectedValues.length == 2 && this.props.isSelected
                  ? `(${this.props.selectedValues.join(',')})` : '');
    return (
      <div>
        <div onContextMenu={this.handleClick} onClick={this.props.onNodeClick.bind(this, this.props.node)} 
        ref={this.props.nodeRef} id={this.props.node.nodeId} className='node' style={style}>
            {this.props.node.value}
            
        </div>
          <Menu 
                open={this.state.mouseY !== null}
                anchorReference="anchorPosition"
                anchorPosition={
                    this.state.mouseY !== null && this.state.mouseX !== null
                    ? { top: this.state.mouseY, left: this.state.mouseX }
                    : undefined
                }
               keepMounted
              onClose={this.handleClose}>
            <MenuItem disabled={!this.props.isSelected} onClick={this.onLCAClick}>{lcaMenuTitle}</MenuItem>
            <MenuItem onClick={this.onInorderSuccessorClick}>Inorder Successor</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default BSTNodeComponent;
