import React from 'react';
import StackElement from './stack-element/stack-element.component'
function Stack(props) {
    let children = props.elements.map((e,ei)=>{
        return <StackElement key={ei} value={e}/>
    })
    return (
        <div>
            {children}
        </div>
    )
}
export default Stack;