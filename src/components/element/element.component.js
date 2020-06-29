import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function Element(props) {
    return (
            <Tooltip title={props.number} arrow placement="top">
                <div key={props.number} style={{
                    height: `${props.number / 1.55}vh`, 
                    display:"inline-block",
                    width:`${props.width}%`,
                    backgroundColor: `${props.boundaries? "#BA68C8" : props.color}`,
                    verticalAlign: "bottom",
                    border: `${props.border ? '.5px solid #616161': 'none'}`

                }}/>
            </Tooltip>
    );
}
export default Element;