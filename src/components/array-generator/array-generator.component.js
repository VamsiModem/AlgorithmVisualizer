import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class ArrayGenerator extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            distinctElelments: true,
            balancedTree: false
        };
    }
    render(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography>{this.props.label}</Typography>
                    <Slider
                        ValueLabelComponent={this.valueLabelComponent}
                        className={this.props.className}
                        aria-label="custom thumb label"
                        disabled={this.props.disabled}
                        onChange={this.handleSliderChange}
                        min={this.props.min}
                        max={this.props.max}
                        style={this.props.style}
                        
                        defaultValue={this.props.defaultValue}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.distinctElelments}
                                onChange={this.handleDistinctElelmentsChange}
                                name="distinctElelments"
                                color="primary"
                            />
                            }
                            label="Distinct Elements"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={2}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.balancedTree}
                                    onChange={this.handleBalancedTreeChange}
                                    name="distinctElelments"
                                    color="primary"
                                />
                            }
                            label="Balanced Tree"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        );
    }
    handleDistinctElelmentsChange = (e) =>{
        this.setState({ distinctElelments: e.target.checked });
    }
    handleBalancedTreeChange = (e) =>{
        this.setState({ balancedTree: e.target.checked });
        this.props.onBalancedTreeCheckBoxChange(e.target.checked);
    }
    generateArray(size){
        let array = [];
        for(let i = 0; i < size; i++){
          array.push(Math.ceil(Math.random() * (this.props.max - this.props.min) + this.props.min));
        }
        return array;
    }
    generateArrayWithDistinctElelemts(size){
        let data = new Set();
        let count = size;
        while(count > 0){
            let number = Math.ceil(Math.random() * (500 - 1) + 1);
            if(data.has(number)){
                continue;
            }else{
                data.add(number);
                count--;
            }
        }
        return Array.from(data);
    }
    handleSliderChange = (e, newValue) =>{
        var array = [];
        if(this.state.distinctElelments){
            array = this.generateArrayWithDistinctElelemts(newValue);
        }else{
            array = this.generateArray(newValue);
        }
        
        this.props.onChange(e, newValue, array);
    }
    valueLabelComponent(props) {
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }
  
}

export default ArrayGenerator;
