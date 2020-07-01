import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class ArrayGenerator extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    render(){
        return (
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
        );
    }
    generateArray(size){
        let array = [];
        for(let i = 0; i < size; i++){
          array.push(Math.ceil(Math.random() * (125 - 50) + 50));
        }
        return array;
    }
    handleSliderChange = (e, newValue) =>{
        var array = this.generateArray(newValue);
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
