import React from 'react';
import Element from '../element/element.component';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import SplitButton from '../split-button/split-button.component'
import Typography from '@material-ui/core/Typography';

class ElementContainer extends React.Component {
    constructor(props) {
        super(props);
        let arraySize = 5;
        let array = this.generateArray(arraySize);
        this.state = {
          arraySize: arraySize,
          array: array,
          isSorting: this.props.sort,
          isAnimating: false,
          changes:[],
          colors:array.map((k,ki)=> {return this.randomColor()}),
          compared:[],
          sortType: 'Bubble Sort',
          timer: null,
          boundaries:[],
          speed: 500
        };
        this.timer = null;
      }
      animate = () =>{
        // const speed = 570 - Math.pow(this.state.array.length, 2) > 0 ? 570 - Math.pow(this.state.array.length, 2) : 0;
        this.timer = setInterval(() => {
            if(this.state.timer == null){
                this.setState({timer: this.timer});
            }
            if(this.state.changes.length > 0){
                let changes = this.state.changes.slice(0);
                var c = changes.shift();
                if(c != undefined){
                    this.setState({changes: changes, array: c['array'].slice(0), colors: c['colors'], compared:c['compared'], boundaries: c['boundaries']});
                }else{
                    this.setState({changes: [], compared: [], boundaries:[]});
                }
            }else{
                clearInterval(this.state.timer);
                this.setState({compared:[], boundaries:[], isAnimating:false, timer: null});
            }
        }, this.state.speed);
        
      }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    handleStop = () =>{
        clearInterval(this.state.timer);
        this.setState({timer:null});
    }

    bubbleSort = () =>{
        let array = this.state.array.slice(0);
        let colors = this.state.colors.slice(0);
        let state = [];
        for(let i = 0; i < array.length - 1; i++){
          for(let j = 0; j < array.length - i - 1; j++){
            let change = { 
              compared: [j, j + 1],
              swapped: false,
              array: array.slice(0),
              colors: colors.slice(0),
              boundaries:[]
            };
            if(array[j] > array[j + 1]){
              change.swapped = true;
              let temp = array[j]; 
              array[j] = array[j + 1]; 
              array[j + 1] = temp; 

              let tempc = colors[j]; 
              colors[j] = colors[j + 1]; 
              colors[j + 1] = tempc; 

              change.colors = colors.slice(0);
              change.array = array.slice(0);
            }
            state.push(change);
          }
          this.setState({changes: state, isSorting: false, isAnimating:true, colors: colors});
        }
      }

      mergeSort = () =>{
        let state = [];
        let array = this.state.array.slice(0);
        let colors = this.state.colors.slice(0);
        this.mergeSortRecur(array.slice(0), array, 0, array.length - 1, state);
        let change = { 
            compared: [0, array.length - 1],
            swapped: false,
            array: array.slice(0),
            colors: this.state.colors.slice(0),
            boundaries: [0, Math.floor((0 + array.length - 1)/2), array.length - 1]
          };
          state.push(change);
        this.setState({changes: state, isSorting: false, isAnimating:true, colors: colors});
      }

      mergeSortRecur = (tempArr, arr, begin, end, state) =>{
          if(begin >= end) return;
          let middle = Math.floor((begin + end) / 2);
          this.mergeSortRecur(tempArr, arr, begin, middle, state);
          this.mergeSortRecur(tempArr, arr, middle + 1, end, state);
          this.merge(tempArr, arr, begin, middle + 1, end, state);
          let change = { 
            compared: [begin, end],
            swapped: false,
            array: tempArr.slice(0),
            colors: this.state.colors.slice(0),
            boundaries: []
          };
          state.push(change);
      }

      merge = (temp, arr, left, mid, right, state) =>{
        const left1 = left;
        const right1 = right;
        let leftEnd = mid - 1;
        //let rightStart = leftEnd + 1;
        let size = right - left + 1;
        let index = left;

        while(left <= leftEnd && mid <= right){
            let change = { 
                compared: [],
                swapped: false,
                array: arr.slice(0),
                colors: this.state.colors.slice(0),
                boundaries: [left1, mid, right1]
              };

            if(arr[left] <= arr[mid]){
                change.swapped = true;
                temp[index] = arr[left];
                change.compared = [left, mid];
                change.array = temp.slice(0);
                index++;
                left++;
            }
            else{
                change.swapped = true;
                temp[index] = arr[mid];
                change.compared = [mid, right];
                change.array = temp.slice(0);;
                index++;
                mid++;
            }  
            state.push(change);
        }
        while(left <= leftEnd)
            temp[index++] = arr[left++];
        
        while(mid <= right)
            temp[index++] = arr[mid++];
        for(let i = 0; i < size; i++)
            arr[right] = temp[right--];
      }

      getMaxIndex = () =>{
          if(this.state.compared.length > 0){
              let index1 = this.state.compared[0];
              let index2 = this.state.compared[1];
              return this.state.array[index1] > this.state.array[index2] ? index1 : index2;
          }
          return -1;
      }
      selectionSort = () =>{
          let state = [];
          let array = this.state.array.slice(0);
          for(let i = 0; i < array.length - 1; i++){
              let minIndex = i;
              for(let j = i + 1; j < array.length; j++){
                if(array[j] < array[minIndex])
                    minIndex = j;
              }
              
              let temp = array[i];
              array[i] = array[minIndex];
              array[minIndex] = temp;

              let change = { 
                compared: [i, minIndex],
                swapped: false,
                array: array.slice(0),
                boundaries:[]
              };
              state.push(change);
          }
          this.setState({changes: state, isSorting: false, isAnimating:true});
      }

      insertionSort = () =>{
          let state = [];
          let array = this.state.array.slice(0);
          for(let i = 1 ; i < array.length; i++){
            let j = i;
              while(j > 0 && array[j -1] > array[j]){
                  let temp = array[j];
                  array[j] = array[j - 1];
                  array[j -1] = temp;
                  j--;
                  let change = { 
                    compared: [j-1, j],
                    swapped: false,
                    array: array.slice(0),
                    boundaries:[]
                  };
                  state.push(change);
              }
              

          }
          this.setState({changes: state, isSorting: false, isAnimating:true});
      }

     randomColor(num) {
     
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = Math.ceil(Math.random() * 10000) / Math.ceil(Math.random() * 9799);
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch(i % 6){
            case 0: r = 1; g = f; b = 0; break;
            case 1: r = q; g = 1; b = 0; break;
            case 2: r = 0; g = 1; b = f; break;
            case 3: r = 0; g = q; b = 1; break;
            case 4: r = f; g = 0; b = 1; break;
            case 5: r = 1; g = 0; b = q; break;
        }
        var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
        return (c);
    }

    handleSort = (sortType) => {
        switch(sortType){
            case 'Bubble Sort':
                this.bubbleSort();
                break;
            case 'Merge Sort':
                this.mergeSort();
                break;
            case 'Selection Sort':
                this.selectionSort();
                break;
            case 'Insertion Sort':
                this.insertionSort();
                break;
        }
        this.animate();
    }
    onSortComplete = () =>{
        this.setState({});
    }
    valueLabelComponent(props) {
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }

    generateArray(size){
        let array = [];
        for(let i = 0; i < size; i++){
          array.push(Math.ceil(Math.random() * (125 - 50) + 50));
        }
        return array;
    }

    generateNewArray = () =>{
        let array = this.generateArray(this.state.arraySize);
        this.setState(
        {
            array: array,
            colors: array.map((k,ki)=> {return this.randomColor();})
        });
    }
    onSpeedChange = (e, newValue) =>{
        this.setState({speed: 2000-newValue})
    }

    handleSliderChange = (e, newValue) =>{
        let array = this.generateArray(newValue);
        this.setState({
            array: array,
            arraySize: newValue,
            colors: array.map((k,ki)=> {return this.randomColor();})
        });
    }
    handleSortComplete = ()=>{
        this.setState({isSorting: false, shouldSort: false})
    }
    handleSpeedChange = (e, newValue) =>{
        console.log(newValue)
        this.setState({speed: newValue});
    }
    render(){
        // console.log({"render":this.props.sort})
        const boundaries = this.state.boundaries == undefined ? [] : this.state.boundaries;
        return (<div className="element-container">
            <div className='controls'>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography>Array Size</Typography>
                    <Slider
                        ValueLabelComponent={this.valueLabelComponent}
                        className="slider-comp"
                        aria-label="custom thumb label"
                        disabled={this.state.isAnimating}
                        defaultValue={5}
                        onChange={this.handleSliderChange}
                        min={5}
                        max={200}
                        style={{marginLeft:"5px"}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Speed</Typography>
                    <Slider
                        ValueLabelComponent={this.valueLabelComponent}
                        className="slider-comp"
                        disabled={this.state.isAnimating}
                        aria-label="custom thumb label"
                        defaultValue={500}
                        onChange={this.onSpeedChange}
                        min={1}
                        max={2000}
                        style={{marginLeft:"5px"}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SplitButton 
                    disabled={this.state.isAnimating}
                    handleSort={this.handleSort} 
                    onGenerateNewArray={this.generateNewArray} 
                    onStop={this.handleStop}/>
                </Grid>
            </Grid>
            </div>
            <div >
                <div className='elements'>
                {this.state.array.map((k,ki)=>{
                    return <Element key={ki} number={k} 
                    width={(document.body.clientWidth / (this.state.array.length * 1.95))/10} 
                    total={this.state.array.length}
                    color = {this.props.multicolor? this.state.colors[ki]: '#f36698'}
                    border={!this.props.multicolor}
                    compared={new Set(this.state.compared).has(ki)}
                    sortingIndex={this.getMaxIndex() == ki}
                    boundaries={boundaries.length > 0 ? (ki >= boundaries[0] && ki <= boundaries[2]) : false}
                    />
                    
                })}
                </div>
            </div>
        </div>)
    }

      
   
   
}
export default ElementContainer;