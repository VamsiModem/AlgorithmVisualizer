import React from 'react';
import DagreGraph from 'dagre-d3-react';
import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      nodesCsv: '',
      relationsCsv: '',
      nodes: new Set(),
      relations: [],
      graph: new Map(),
      activeNode: null,
      visited: new Set(),
      output: [],
    };
  }
  onNodesChange = (e) => {
    const {
      target: { value },
    } = e;
    let nodesSet = new Set();
    if (value != null) {
      const nodes = value.split(',');
      nodes.map((n, ni) => {
        if (!nodesSet.has(n) && n.length > 0) {
          nodesSet.add(n);
        }
      });
    }
    let graph = this.buildGraph(nodesSet, this.state.relations);
    this.setState({ nodesCsv: value, nodes: nodesSet, graph: graph });
  };

  buildGraph = (nodes, relationShips) => {
    let graph = new Map();
    nodes.forEach((x) => {
      if (!graph.has(x)) {
        graph.set(x, new Set());
      }
    });
    relationShips.map((r, ri) => {
      if (graph.has(r.source)) {
        let neighbours = graph.get(r.source);
        if (!neighbours.has(r.target)) {
          neighbours.add(r.target);
        }
        graph.set(r.source, neighbours);
      }
    });
    return graph;
  };

  dfs = (node) => {
    let visited = this.state.visited;
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
    }
    this.setGraphState(node, visited);
    //(this.state.nodes.size - visited.size * 500)
    const neighbours = this.state.graph.get(node);
    neighbours.forEach((n) => {
      if (!this.state.visited.has(n)) this.dfs(n);
    });
  };

  bfs = (node) => {
    let queue = [node];
    let visited = this.state.visited;
    while (queue.length > 0) {
      let shiftedNode = queue.shift();
      if (!visited.has(shiftedNode)) {
        visited.add(shiftedNode);
        console.log(shiftedNode);
      }
      this.setGraphState(shiftedNode, visited);

      let neighbours = this.state.graph.get(shiftedNode);
      neighbours.forEach((n) => {
        if (!this.state.visited.has(n)) {
          queue.push(n);
        }
      });
    }
  };
  onRelationsChange = (e) => {
    const {
      target: { value },
    } = e;
    let nodesSet = this.state.nodes;
    let relations = [];
    if (value != null) {
      const nodes = value.split(',');
      nodes.map((n, ni) => {
        let split = n.split('->');
        if (split.length == 2) {
          let from = split[0];
          let to = split[1];
          if (nodesSet.has(from) && nodesSet.has(to)) {
            const path = {
              source: from,
              target: to,
              config: {
                curve: d3.curveBasis,
              },
            };
            relations.push(path);
          }
        }
      });
    }
    let graph = this.buildGraph(this.state.nodes, relations);
    this.setState({ relations: relations, relationsCsv: value, graph: graph });
  };
  onDFSClick = () => {
    let first =
      this.state.nodes.size > 0 ? Array.from(this.state.nodes)[0] : null;
    if (first != null) {
      this.setState(
        { activeNode: null, visited: new Set(), output: [] },
        () => {
          this.dfs(first);
        }
      );

      //1->2,2->3,1->4,2->5,4->6,3->6,4->5
    }
  };

  onBFSClick = () => {
    let first =
      this.state.nodes.size > 0 ? Array.from(this.state.nodes)[0] : null;
    if (first != null) {
      this.setState(
        { activeNode: null, visited: new Set(), output: [] },
        () => {
          this.bfs(first);
        }
      );

      //1->2,2->3,1->4,2->5,4->6,3->6,4->5
    }
  };

  setGraphState = (activeNode, visited) => {
    setTimeout(() => {
      let output = this.state.output.slice(0);
      output.push(activeNode);
      this.setState({
        visited: visited,
        activeNode: activeNode,
        output: output,
      });
    }, (visited.size + 1) * 500);
  };

  getNodes = () => {
    let nodes = [];
    this.state.nodes.forEach((n) => {
      if (n != undefined) {
        let node = {
          id: n,
          label: n,
          labelType: 'html',
        };
        if (n == this.state.activeNode) {
          node['config'] = {
            style: 'fill: #afa',
          };
        } else if (this.state.visited.has(n)) {
          node['config'] = {
            style: 'fill: #dee2e6',
          };
        }
        nodes.push(node);
      }
    });
    return nodes;
  };

  getInDependantOrder = () => {
    let indegree = this.getIndegree();
    let queue = [];
    let output = [];
    Array.from(indegree.keys()).map((x, xi) => {
      if (indegree.get(x) == 0) {
        queue.push(x);
        output.push(x);
      }
    });
    while (queue.length > 0) {
      let node = queue.shift();
      this.state.relations.map((r, ri) => {
        if (node === r.source) {
          indegree.set(r.target, indegree.get(r.target) - 1);
          if (indegree.get(r.target) === 0) {
            queue.push(r.target);
            output.push(r.target);
          }
        }
      });
    }
    if (output.length != this.state.nodes.size) {
      return [];
    }
    console.log(output);
    return output;
  };

  getIndegree = () => {
    let indegree = new Map();
    let keys = Array.from(this.state.graph.keys());
    keys.map((k, ki) => indegree.set(k, 0));
    keys.map((k, ki) => {
      let neighbours = this.state.graph.get(k);
      neighbours.forEach((x) => {
        if (indegree.has(x)) {
          let currentIndegree = indegree.get(k);
          indegree.set(x, ++currentIndegree);
        }
      });
    });
    return indegree;
  };

  render() {
    let result = this.state.output.map((o, oi) => {
      return <div className="result-node">{o}</div>;
    });
    //console.log(this.getInDependantOrder());
    return (
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="nodes"
              label="Nodes(csv)"
              variant="outlined"
              fullWidth
              onChange={this.onNodesChange}
              value={this.state.nodesCsv}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="relations"
              label="Relations(a->b,)"
              onChange={this.onRelationsChange}
              variant="outlined"
              fullWidth
              value={this.state.relationsCsv}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={this.onDFSClick}>Dfs</Button>
            <Button onClick={this.onBFSClick}>Bfs</Button>
          </Grid>
        </Grid>
        <div className="graph-container">
          <DagreGraph
            nodes={this.getNodes()}
            links={this.state.relations}
            shape="circle"
            width="90vw"
            height="80vh"
            config={{
              rankdir: 'LR',
              align: 'UL',
              ranker: 'tight-tree',
            }}
          ></DagreGraph>
        </div>
        {this.state.output.length > 0 ? (
          <div style={{ display: 'flex' }}>{result}</div>
        ) : (
          <div></div>
        )}
      </Container>
    );
  }
}
export default Graph;
