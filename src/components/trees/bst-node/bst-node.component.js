import React from 'react';
class BSTNodeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }
    //let id = `node-${props.value}-depth-${props.depth}`;
    render(){

    
      let style = {
        top: `${this.props.node.y* 55}px`,
        left:`${this.props.node.x * 25}px`
      }
    return (
      <div>
      <div ref={this.props.nodeRef} id={this.props.key} className='node' style={style}>
          {this.props.node.value}
      </div>
      </div>
    );
  }
}

export default BSTNodeComponent;
