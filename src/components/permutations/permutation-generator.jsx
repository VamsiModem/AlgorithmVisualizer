
import React from 'react';
import {TextField, Button }from '@material-ui/core';
import './permutations-generator.css'
import PermutationIterator from './permutation-iterator'
import NumberToString from '../utils/number-to-english'
class PermutationGenerator extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            value: "",
            permutations: []
        }
    }
    generatePermutations = () =>{
        this.setState({permutations: new Array()})
        if(this.state.value.length > 0){
            const value = this.state.value;
            var map = new Map();
            for(let i = 0; i < value.length; i++){
                const value = this.state.value;
                if(map.has(value[i])){
                    let existingValue = map.get(value[i]);
                    map.set(value[i], ++existingValue);
                }else{
                    map.set(value[i],1);
                }
            }
            this.helper(0, new Array(value.length), map);
        }
    }

    helper = (level, current, map) =>{
        const value = this.state.value;
        if(level === current.length){
            var array = this.state.permutations;
            array.push(current);
            this.setState({permutations: array});
        }
        for(let i = 0; i < value.length; i++){
            if(map.get(value[i]) == 0) continue;
            current[level] = value[i];
            map.set(value[i], map.get(value[i]) - 1)
            this.helper(level + 1, current.slice(0), map);
            map.set(value[i], map.get(value[i]) + 1)
        }
    }
    
    render(){
        var x = new PermutationIterator(this.state.value)
        console.log(x)
        let perms = this.state.permutations;
        const columns = 12;
        let tds = [];
        let trs = [];
        for(let i = 0; i < perms.length; i++){
            if(i % 20 == 0){
                trs.push(<tr>{tds.slice(0)}</tr>);
                tds = [<td key={i} className="perm-value">{perms[i]}</td>];
            }else{
                tds.push(<td key={i} className="perm-value">{perms[i]}</td>);
            }
        }
        trs.push(<tr>{tds.slice(0)}</tr>);
        
        return(
            <div> 
                <div className="permutations-generator">
                    <TextField
                        style={{verticalAlign:'middle', width: '300px ', margin: 8}}
                        id="filled-full-width"
                        onChange={(e)=> {
                                const value = e.target.value;
                                this.setState({value: value, permutations: []});
                            }
                        }
                        placeholder="Enter a string"
                        margin="normal"
                        error={this.state.value.length > 8}
                        helperText={this.state.value.length > 8 ? 'length cannot be > 8': ''}
                        value = {this.state.value}
                        InputLabelProps={{
                        shrink: true,
                        }}

                    />
                    <Button  disabled={this.state.value.length > 8} variant="contained" style={{verticalAlign:'middle'}} color="primary" onClick={this.generatePermutations}>
                         Generate Perumations
                    </Button>
                    <NumberToString/>
            </div>
            <table className="table table-sm"><tbody>{trs}</tbody></table>
        </div>
        )
    }
}
export default PermutationGenerator;