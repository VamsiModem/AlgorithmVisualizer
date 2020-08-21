import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

class ArrayGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distinctElelments: true,
      balancedTree: false,
      sorted: false,
      random: false,
      numbersCsv: '',
      invalidText: false,
      helperText: '',
    };
  }
  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.random}
              onChange={(e) => this.setState({ random: !this.state.random })}
              name="random"
              color="primary"
            />
          }
          label="Random Array Generator"
        />
        {this.state.random ? (
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
                      name="balancedtree"
                      color="primary"
                    />
                  }
                  label="Balanced Tree"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.sorted}
                      onChange={(e) =>
                        this.setState({ sorted: !this.state.sorted })
                      }
                      name="sortedarray"
                      color="primary"
                    />
                  }
                  label="Sorted"
                />
              </FormGroup>
            </Grid>
          </Grid>
        ) : (
          <TextField
            id="filled-full-width"
            label="Numbers(CSV)"
            style={{ margin: 8 }}
            placeholder="1,2,3,4,5,7"
            helperText={this.state.helperText}
            fullWidth
            value={this.state.numbersCsv}
            margin="normal"
            error={this.state.invalidText}
            onChange={this.handleTextAreaChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        )}
      </div>
    );
  }
  handleTextAreaChange = (e) => {
    const value = e.target.value;
    var isValid = /^(?!,)(,?[0-9]+)+$/.test(value) || value.length === 0;
    this.setState({
      numbersCsv: value,
      invalidText: !isValid,
      helperText: isValid ? '' : 'Invalid numeric CSV',
    });
    if (isValid) {
      var splitStrings = value.split(',');
      var nums = splitStrings.map((s, si) => parseInt(s));
      this.props.onChange(e, nums.length, nums);
    }
  };
  handleDistinctElelmentsChange = (e) => {
    this.setState({ distinctElelments: e.target.checked });
  };

  handleBalancedTreeChange = (e) => {
    this.setState({ balancedTree: e.target.checked });
    this.props.onBalancedTreeCheckBoxChange(e.target.checked);
  };
  generateArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push(
        Math.ceil(
          Math.random() * (this.props.max - this.props.min) + this.props.min
        )
      );
    }
    return array;
  }
  generateArrayWithDistinctElelemts(size) {
    let data = new Set();
    let count = size;
    while (count > 0) {
      let number = Math.ceil(Math.random() * (500 - 1) + 1);
      if (data.has(number)) {
        continue;
      } else {
        data.add(number);
        count--;
      }
    }
    return Array.from(data);
  }
  handleSliderChange = (e, newValue) => {
    var array = [];
    if (this.state.distinctElelments) {
      array = this.generateArrayWithDistinctElelemts(newValue);
    } else {
      array = this.generateArray(newValue);
    }
    if (this.state.sorted)
      array.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
    this.props.onChange(e, newValue, array);
  };
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
