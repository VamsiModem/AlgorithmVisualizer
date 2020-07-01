import React from 'react';
import ReactDOM from 'react-dom'
import BSTNodeComponent from '../bst-node/bst-node.component'

class BSTComponent extends React.Component {
    constructor(props) {
        super(props);
        var connections = [];
        var childRefs = {};
        var pathRefs = {};
        this.svgContainerRef = React.createRef();
        let stack = [];
        let cur = this.props.root;
        while(cur != null || stack.length > 0){
          while(cur != null){
            stack.push(cur);
            cur = cur.left;
          }
          cur = stack.pop();
          cur = stack.pop();
          let parentId = cur.parent == null ? null :  `node-${cur.parent.value}-depth-${cur.parent.y}`;
          let elementId = `node-${cur.value}-depth-${cur.y}`;
          if(parentId != null){
            var pathId = `node-${cur.value}-depth-${cur.y}-to-${parentId}`;
            pathRefs[pathId] = React.createRef();
            var connection = {
                path:pathId,
                startElementId: parentId,
                endElementId:  elementId
              }
              connections.push(connection);
          }
          childRefs[elementId] = React.createRef();
          cur = cur.right;
        }
        this.state = {
          connections: connections,
          root: props.root,
          childRefs: childRefs,
          pathRefs: pathRefs
        };
    }
    render =()=>{
        var children = [];
        var paths = [];
        let root = this.state.root;
        let stack = [];
        let cur = root;
        while(cur != null || stack.length > 0){
          while(cur != null){
            stack.push(cur);
            cur = cur.left;
          }
          cur = stack.pop();
          let parentId = cur.parent == null ? null :  `node-${cur.parent.value}-depth-${cur.parent.y}`;
          let elementId = `node-${cur.value}-depth-${cur.y}`;
          if(parentId != null){
            var pathId = `node-${cur.value}-depth-${cur.y}-to-${parentId}`;
            paths.push(<path ref={this.state.pathRefs[pathId]} id={pathId} d="M0 0" stroke="#000" fill="none" stroke-width="1px"/>);
          }
            children.push(<BSTNodeComponent key={elementId} node={cur} nodeRef={this.state.childRefs[elementId]} id={elementId} />);
            cur = cur.right;
        }
        
        return (
            <div>
                <div className='outer' id="svgContainer">
                    <svg  ref={this.svgContainerRef} id="svg1" width="0" height="0" >
                        {paths}
                    </svg>
                </div>
                <div className='tree'>{children}</div>
            </div>
            
        );
    }
    signum(x) {
        return (x < 0) ? -1 : 1;
    }
    absolute(x) {
        return (x < 0) ? -x : x;
    }
    drawPath(path, startX, startY, endX, endY) {
        const svg = this.svgContainerRef.current;
        const stroke =  parseFloat(path.getAttribute("stroke-width"));
        if (svg.getAttribute("height") <  endY)                 svg.setAttribute("height", endY);
        if (svg.getAttribute("width" ) < (startX + stroke) )    svg.setAttribute("width", (startX + stroke));
        if (svg.getAttribute("width" ) < (endX   + stroke) )    svg.setAttribute("width", (endX   + stroke));
        
        const deltaX = (endX - startX) * 0.15;
        const deltaY = (endY - startY) * 0.15;
        const delta  =  deltaY < this.absolute(deltaX) ? deltaY : this.absolute(deltaX);
        let arc1 = 0; let arc2 = 1;
        if (startX > endX) {
            arc1 = 1;
            arc2 = 0;
        }
        path.setAttribute("d",  "M"  + startX + " " + startY +
                        " V" + (startY + delta) +
                        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*this.signum(deltaX)) + " " + (startY + 2*delta) +
                        " H" + (endX - delta*this.signum(deltaX)) + 
                        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                        " V" + endY );
    }

    connectElements(path, startElem, endElem) {
        const svgContainer= this.svgContainerRef.current;
        const svgCoords = ReactDOM.findDOMNode(svgContainer).getBoundingClientRect();
        const startElementCoords = ReactDOM.findDOMNode(startElem).getBoundingClientRect();
        const endElementCoords = ReactDOM.findDOMNode(startElem).getBoundingClientRect();
        if(startElementCoords.top > endElementCoords.top){
            var temp = startElem;
            startElem = endElem;
            endElem = temp;
        }
        const svgTop  = svgCoords.top;
        const svgLeft = svgCoords.left;
        const startCoord = ReactDOM.findDOMNode(startElem).getBoundingClientRect();
        const endCoord   = ReactDOM.findDOMNode(endElem).getBoundingClientRect();
        const startX = startCoord.left + 0.5*startElem.offsetWidth  - svgLeft;   
        const startY = startCoord.top  + startElem.offsetHeight - svgTop;    
        const endX = endCoord.left + 0.5*endElem.offsetWidth - svgLeft;
        const endY = endCoord.top  - svgTop;
        this.drawPath(path, startX, startY, endX, endY);
    
    }
    connectAll = () => {
        this.state.connections.map((x,xi)=>{
            var startElement = this.state.childRefs[x.startElementId].current;
            var endElement = this.state.childRefs[x.endElementId].current;
            var path = this.state.pathRefs[x.path].current;
            this.connectElements(path, startElement, endElement);
        });
    }

    componentDidUpdate(){
        this.connectAll();
    }
    componentDidMount(){
        this.connectAll();
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.root !== state.root) {
            var connections = [];
            var childRefs = {};
            var pathRefs = {};
            let stack = [];
            let cur = props.root;
            while(cur != null || stack.length > 0){
                while(cur != null){
                    stack.push(cur);
                    cur = cur.left;
                }
                cur = stack.pop();
                    let parentId = cur.parent == null ? null :  `node-${cur.parent.value}-depth-${cur.parent.y}`;
                    let elementId = `node-${cur.value}-depth-${cur.y}`;
                    if(parentId != undefined){
                        var pathId = `node-${cur.value}-depth-${cur.y}-to-${parentId}`;
                        pathRefs[pathId] = React.createRef();
                        var connection = {
                            path:pathId,
                            startElementId: parentId,
                            endElementId:  elementId
                        }
                        connections.push(connection);
                    }
                    childRefs[elementId] = React.createRef();
                    cur = cur.right;
                
            }
            return {
                root: props.root,
                childRefs: childRefs,
                pathRefs: pathRefs,
                connections: connections
            };
        }
        return null;
      }
}

export default BSTComponent;