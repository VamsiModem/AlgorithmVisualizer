export class Node { 
    constructor(data) { 
      this.left = null
      this.right = null
      this.value = data
      this.x = 0
      this.y = 0
      this.parent = null;
    } 
  } 

  export class BST {
    constructor() {
      this.root = null;
      this.i = 0;
      this.connections = [];
    }
    
    // Insert a value as a node in the BST
    insert(value) {
      let newNode = new Node(value)
      
      // If root empty, set new node as the root
      if (!this.root) {
        this.root = newNode
      } else {
        this.insertNode(this.root, newNode)
      }
    }

    insertFromArray(arr) {
        arr.map((x,xi)=>{
            this.insert(x);
        })
        return this;
      }
    
    // helper function
    insertNode(root, newNode) {
      if (newNode.value < root.value) {
        // If no left child, then just insesrt to the left
        if (!root.left) {
          root.left = newNode
          root.left.parent = root
        } else {
          this.insertNode(root.left, newNode)
        }
      } else {
        // If no right child, then just insesrt to the right
        if (!root.right) {
          root.right = newNode
          root.right.parent = root
        } else {
          this.insertNode(root.right, newNode)
        }
      }
    }
    
    // Remove a node with the value passed
    remove(value) {
      if (!this.root) {
        return 'Tree is empty!'
      } else {
        this.removeNode(this.root, value)
      }
    }
    
    // helper function
    removeNode(root, value) {
      if (!root) {
        return null
      }
      
      // If value is less than root value, go to the left subtree
      if (value < root.value) {
        root.left = this.removeNode(root.left, value)
        return root
      // If value is greater than root value, go to the right subtree
      } else if (value > root.value) {
        root.right = this.removeNode(root.right, value)
        return root
      // If we found the value, remove the node
      } else {
        // If no child nodes, just remove the node
        if (!root.left && !root.right) {
          root = null
          return root
        }
        
        // If one child (left)
        if (root.left) {
          root = root.left
          return root
        // If one child (right)
        } else if (root.right) {
          root = root.right
          return root
        }
        
        // If two child nodes (both)
        // Get the minimum of the right subtree to ensure we have valid replacement
        let minRight = this.findMinNode(root.right)
        root.value = minRight.value
        
        // Make sure we remove the node that we replaced the deleted node
        root.right = this.removeNode(root.right, minRight.value)
        return root
      }
    }
    
    findMinNode(root) {
      if (!root.left) {
        return root
      } else {
        return this.findMinNode(root.left)
      }
    }
    
    // Return boolean value depending on the existence of the value in the tree
    search(value) {
      if (!this.root) {
        return 'Tree is empty'
      } else {
        return Boolean(this.searchNode(this.root, value))
      }
    }
    
    searchNode(root, value) {
      if (!root) {
        return null
      }
      
      if (value < root.value) {
        return this.searchNode(root.left, value)
      } else if (value > root.value) {
        return this.searchNode(root.right, value)
      }
      
      return root
    }
    draw(){
      this.drawTree(this.root, 0);
      return this.root;
    }
    drawTree(root, depth){
      if(root == null)return;
      if(root.left != null){
        this.drawTree(root.left, depth + 1);
      }
      root.x = ++this.i;
      root.y = depth;
      if(root.right != null){
        this.drawTree(root.right, depth + 1);
      }
    }

    inOrderTraversalIter(root) {
        var svg = document.querySelector('#svg1');
        var html = '';
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
             let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", pathId);
            path.setAttribute("d","M0 0");
            path.setAttribute("stroke","#000");
            path.setAttribute("stroke-width","01px");
            path.setAttribute("fill","none");
              svg.appendChild(path);
              var connection = {
                path:pathId,
                startElementId: parentId,
                endElementId:  elementId
              }
              this.connections.push(connection);
          }
          html += `<div id='${elementId}' data-parent='${parentId}'  class='node' style=' top:${cur.y * 55}px; left:${cur.x * 25}px'>${cur.value}</div>`;
          cur = cur.right;
        }
        return html;
      }
  }
