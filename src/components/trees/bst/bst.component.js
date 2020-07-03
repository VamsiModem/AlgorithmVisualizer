import React from 'react';
import ReactDOM from 'react-dom'
import BSTNodeComponent from '../bst-node/bst-node.component'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class BSTComponent extends React.Component {
    constructor(props) {
        super(props);
        var connections = [];
        var childRefs = {};
        var pathRefs = {};
        var count = 0;
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
          cur.nodeId = elementId;
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
          count++;
          childRefs[elementId] = React.createRef();
          cur = cur.right;
        }
        this.state = {
          connections: connections,
          root: props.root,
          childRefs: childRefs,
          pathRefs: pathRefs,
          nodeCount: count,
          serializedString: '',
          selectedNodes: []
        };
        this.count = count;
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

    dfs = (root) =>{
        console.log(this.count)
        if(root == null) return;
        this.dfs(root.left)
        setTimeout(() =>this.paintNode(root.nodeId), ((this.state.nodeCount - this.count) + 1) *500)
        this.count--;
        this.dfs(root.right)
    }
    paintNode = (id) =>{
        let ref = this.state.childRefs[id];
        ref.current.style.backgroundColor = "#dea805"; 
        ref.current.style.color = "#065a65";
    }
    onBFSClick = () =>{
        this.count = this.state.nodeCount;
        let cur = this.state.root;
        let stack = [cur];
        while(stack.length > 0){
            let node = stack.shift();
            setTimeout(() =>this.paintNode(node.nodeId), ((this.state.nodeCount - this.count) + 1) *500)
            this.count--;
            if(node.left != null){
                stack.push(node.left);
            }
            if(node.right != null){
                stack.push(node.right);
            }
        }
    }
    onDFSClick = () =>{
        this.count = this.state.nodeCount;
        this.dfs(this.state.root);
    }
    componentDidUpdate(){
        this.connectAll();
    }
    componentDidMount(){
        this.connectAll();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.root !== state.root) {
            var connections = [];
            var childRefs = {};
            var pathRefs = {};
            let stack = [];
            var count = 0;
            let cur = props.root;
            while(cur != null || stack.length > 0){
                while(cur != null){
                    stack.push(cur);
                    cur = cur.left;
                }
                cur = stack.pop();
                    let parentId = cur.parent == null ? null :  `node-${cur.parent.value}-depth-${cur.parent.y}`;
                    let elementId = `node-${cur.value}-depth-${cur.y}`;
                    cur.nodeId = elementId;
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
                    count++;
                    cur = cur.right;
                
            }
            return {
                root: props.root,
                childRefs: childRefs,
                pathRefs: pathRefs,
                connections: connections,
                nodeCount: count
            };
        }
        return null;
    }
      onSerialize = () =>{
          this.count = this.state.nodeCount;
          this.serialize(this.state.root);
      }

      serialize = (root) =>{
        if(root == null){
            setTimeout(() =>{
                this.setState({serializedString: this.getSerializedString('null')});
            }, ((this.state.nodeCount - this.count) + 1) *1000)
            
            return;
        }
        setTimeout(() =>{
            this.paintNode(root.nodeId)
            this.setState({serializedString: this.getSerializedString(root.value)});
        }, ((this.state.nodeCount - this.count) + 1) *1000)
        
        this.count--;
        
        this.serialize(root.left);
        this.serialize(root.right);
      }
      getSerializedString = (val) =>{
        let serializedString = this.state.serializedString;
        if(serializedString.length == 0){
            serializedString = serializedString.concat(val);
        }else{
            serializedString = serializedString.concat(',', val);
        }
        return serializedString;
      }

    handleLCAClick = (node)=>{
        let lca = this.getLowestCommonAncestor(this.state.root, this.state.selectedNodes[0], this.state.selectedNodes[1])
        let ref = this.state.childRefs[lca.nodeId];
        ref.current.style.backgroundColor = "#359a34"; 
        ref.current.style.borderColor = "#046119"; 
        ref.current.style.color = "#cbffd7";
    }
    getLowestCommonAncestor = (root, p ,q) =>{
        if(p.value > root.value && q.value > root.value){
            return this.getLowestCommonAncestor(root.right, p , q);
        }else if (q.value < root.value && p.value < root.value){
            return this.getLowestCommonAncestor(root.left, p , q);
        }else{
            return root;
        }
    }
    handleInorderSuccessorClick = (node)=>{
        console.log(node)
    }
    onBoundaryClick = () =>{
        this.count = this.state.nodeCount;
        let cur = this.state.root;
        if(cur != null){
            this.paintNode(cur.nodeId)
            this.leftTreeDFS(cur.left);
            this.paintLeaves(cur);
            this.paintLeaves(cur.right);
            this.rightTreeDFS(cur.right);
        }
    }
    paintLeaves = (root) =>{
        if(root == null) return;
        this.paintLeaves(root.left);
        if(root.left == null && root.right == null){
            setTimeout(() =>this.paintNode(root.nodeId), ((this.state.nodeCount - this.count) + 1) *500)
            this.count--;
        }
        this.paintLeaves(root.right);
    }
    leftTreeDFS = (root) =>{
        if(root == null)return;
        setTimeout(() =>this.paintNode(root.nodeId), ((this.state.nodeCount - this.count) + 1) *500)
            this.count--;
        if (root.left != null){
            this.leftTreeDFS(root.left);
        }else if(root.right != null){
            
            this.leftTreeDFS(root.right);
        }
    }

    rightTreeDFS = (root) =>{
        if(root == null)return;
        setTimeout(() =>this.paintNode(root.nodeId), ((this.state.nodeCount - this.count) + 1) *500)
            this.count--;
        if (root.right != null){
            this.rightTreeDFS(root.right);
        }else if(root.left != null){
            this.rightTreeDFS(root.left);
        }
    }
    handleNodeClick = (node) =>{
        let selectedNodes = this.state.selectedNodes;
        if(selectedNodes.length >= 2){
            let poppedNode = selectedNodes.shift();
            let poppedRef = this.state.childRefs[poppedNode.nodeId];
            poppedRef.current.style.backgroundColor = "#4DD0E1"; 
            poppedRef.current.style.color = "#4a4a4a";
            poppedRef.current.style.borderColor = "#0ba1b5";
            selectedNodes.push(node);
        }else{
            selectedNodes.push(node);
        }
        let ref = this.state.childRefs[node.nodeId];
        ref.current.style.backgroundColor = "#f14c49"; 
        ref.current.style.color = "#ececec";
        ref.current.style.borderColor = "#a90704";
        this.setState({selectedNodes : selectedNodes});
    }
    

    render =()=>{
        var children = [];
        var paths = [];
        let root = this.state.root;
        let stack = [];
        let selectedValues = []; 
        let selectedIds = new Set(this.state.selectedNodes.map((x,xi)=>{
             selectedValues.push(x.value); 
             return x.nodeId;
        }));
        let cur = root;
        while(cur != null || stack.length > 0){
          while(cur != null){
            stack.push(cur);
            cur = cur.left;
          }
          cur = stack.pop();
          let parentId = cur.parent == null ? null :  `node-${cur.parent.value}-depth-${cur.parent.y}`;
          let elementId = `node-${cur.value}-depth-${cur.y}`;
          cur.nodeId = elementId;
          if(parentId != null){
            var pathId = `node-${cur.value}-depth-${cur.y}-to-${parentId}`;
            paths.push(<path key={pathId} ref={this.state.pathRefs[pathId]} id={pathId} d="M0 0" stroke="#014048" fill="none" strokeWidth="1px"/>);
          }
            children.push(<BSTNodeComponent 
                key={elementId} 
                node={cur} 
                onLCAClick={this.handleLCAClick}
                onInorderSuccessorClick={this.handleInorderSuccessorClick}
                nodeRef={this.state.childRefs[elementId]} 
                onNodeClick={this.handleNodeClick}
                selectedValues = {selectedValues}
                isSelected={selectedIds.has(elementId)}
                id={elementId} />);
            
            cur = cur.right;
        }
        
        return (
            <div>
                <div style={{padding:"10px"}}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={this.onDFSClick} disabled={this.state.root == null}>DFS</Button>
                        <Button onClick={this.onBFSClick} disabled={this.state.root == null}>BFS</Button>
                        <Button onClick={this.onBoundaryClick} disabled={this.state.root == null}>Boundary</Button>
                        <Button onClick={this.onSerialize} disabled={this.state.root == null}>Serialize</Button>
                        
                    </ButtonGroup>
                    {/* <div>[{this.state.serializedString}]</div> */}
                </div>
                <div className='outer' id="svgContainer">
                    <svg  ref={this.svgContainerRef} id="svg1" width="0" height="0" >
                        {paths}
                    </svg>
                </div>
                <div className='tree'>{children}</div>
            </div>
            
        );
    }
}

export default BSTComponent;