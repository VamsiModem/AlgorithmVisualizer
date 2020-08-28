import React from 'react'
import {TextField, Button }from '@material-ui/core';
import { touch } from 'd3';
class NumberToString extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value : '',
            converted: ''
        }
    }

    toOne = (number) =>{
        switch(number){
            case 1:
                return 'One';
            case 2:
                return 'Two';
            case 3:
                return 'Three';
            case 4:
                return 'Four';
            case 5:
                return 'Five';
            case 6:
                return 'Six';
            case 7:
                return 'Seven';
            case 8:
                return 'Eight';
            case 9:
                return 'Nine';
        }
        return '';
    }

    toTwoLessThan20 = (number) =>{
        switch(number){
            case 11:
                return 'Eleven';
            case 12:
                return 'Twelve';
            case 13:
                return 'Thirteen';
            case 14:
                return 'Fourteen';
            case 15:
                return 'Fifteen';
            case 16:
                return 'Sixteen';
            case 17:
                return 'Seventeen';
            case 18:
                return 'Eighteen';
            case 19:
                return 'Nineteen';
        }
        return '';
    }

    toTen = (number) =>{
        switch(number){
            case 2:
                return 'Tweenty';
            case 3:
                return 'Thirty';
            case 4:
                return 'Fourty';
            case 5:
                return 'Fifty';
            case 6:
                return 'Sixty';
            case 7:
                return 'Seventy';
            case 8:
                return 'Eighty';
            case 9:
                return 'Ninenty';
        }
        return '';
    }
    two = (number) =>{
        if(number == 0) return '';
        else if(number < 10)
            return this.toOne(number);
        else if(number < 20)
            return this.toTwoLessThan20(number);
        else {
            const ten =  Math.floor(number / 10);
            const remaining = number - (ten * 10);
            if(remaining != 0){
                return this.toTen(ten) + ' '+ this.toOne(remaining);
            }else{
                return this.toTen(ten);
            }
        }
    }
    three = (number)=>{
        const hundered =  Math.floor(number / 100);
        const remaining = number - (hundered * 100);
        let res = '';
        if(hundered * remaining != 0){
            res = this.toOne(hundered)+ ' Hundred and '+ this.two(remaining);
        }else if((hundered == 0) && (remaining != 0))
            res =  this.two(remaining);
        else if((hundered != 0) && (remaining == 0))
            res =  this.three(remaining);
        
            return res;
    }
    convertToString = () =>{
        const number = Number(this.state.value);
        const billion = Math.floor(number / 1000000000);
        const million = Math.floor((number - (billion * 100000000)) / 1000000);
        const thousand = Math.floor((number - ((billion * 100000000) - (million * 1000000)))/ 1000);
        const remaining = number - (billion * 100000000) - (million * 1000000)- (thousand * 1000);
        let res = '';
        if(billion != 0)
            res += this.three(billion) + '  Billion ';
         if(million != 0){
             if(res.length != 0){
                res += ' ';
             }
            res += this.three(million) + '  Million ';
         }
         if(thousand != 0){
            if(res.length != 0){
               res += ' ';
            }
           res += this.three(thousand) + '  Thousand ';
        }
        if(remaining != 0){
            if(res.length != 0){
               res += ' ';
            }
           res += this.three(remaining);
        }
        return res;
    }
    render(){
        return(
        <div style={{width:'300px'}}>
            <div>
            <TextField
                style={{verticalAlign:'middle', width: '300px ', margin: 8}}
                id="filled-full-width"
                onChange={(e)=> {
                        const value = e.target.value;
                        this.setState({value: value, permutations: []});
                    }
                }
                placeholder="Enter a number to convert to words"
                margin="normal"
                error={isNaN(Number(this.state.value))}
                helperText={isNaN(Number(this.state.value)) ? 'length cannot be > 8': ''}
                value = {this.state.value}
                InputLabelProps={{
                shrink: true,
                }}

            />
            </div>
            <div style={{fontSize:'12px'}}>{this.convertToString()}</div>
        </div>
        )
    }
}

export default NumberToString;