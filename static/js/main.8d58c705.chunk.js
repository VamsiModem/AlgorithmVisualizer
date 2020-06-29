(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{51:function(e,a,t){e.exports=t(64)},56:function(e,a,t){},57:function(e,a,t){},64:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),o=t(9),i=t.n(o),l=(t(56),t(27)),s=t(18),c=t(32),u=t(31),m=t(97),d=(t(57),t(13)),p=t(91),h=t(66),g=t(93),b=t(39),v=t.n(b),S=t(95),f=t(98),y=t(94),E=t(99),C=t(101),k=t(100),w=["Bubble Sort","Quick Sort","Merge Sort","Selection Sort","Insertion Sort"];function A(e){var a=n.a.useState(!1),t=Object(d.a)(a,2),r=t[0],o=t[1],i=n.a.useRef(null),l=n.a.useState(0),s=Object(d.a)(l,2),c=s[0],u=s[1],m=function(e){i.current&&i.current.contains(e.target)||o(!1)};return n.a.createElement(p.a,{container:!0,direction:"column",alignItems:"center"},n.a.createElement(p.a,{item:!0,xs:12},n.a.createElement(g.a,{variant:"contained",color:"primary",ref:i,"aria-label":"split button"},n.a.createElement(h.a,{onClick:function(a){return e.onGenerateNewArray()},disabled:e.disabled},"New Array"),n.a.createElement(h.a,{onClick:function(){console.info("You clicked ".concat(w[c]))}},w[c]),n.a.createElement(h.a,{color:"primary",size:"small","aria-controls":r?"split-button-menu":void 0,"aria-expanded":r?"true":void 0,"aria-label":"select sort","aria-haspopup":"menu",onClick:function(){o((function(e){return!e}))}},n.a.createElement(v.a,null)),n.a.createElement(h.a,{onClick:function(a){return e.handleSort(w[c])},disabled:e.disabled},"Sort"),n.a.createElement(h.a,{onClick:function(a){return e.onStop()}},"Stop")),n.a.createElement(E.a,{open:r,anchorEl:i.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var a=e.TransitionProps,t=e.placement;return n.a.createElement(f.a,Object.assign({},a,{style:{transformOrigin:"bottom"===t?"center top":"center bottom"}}),n.a.createElement(y.a,null,n.a.createElement(S.a,{onClickAway:m},n.a.createElement(k.a,{id:"split-button-menu"},w.map((function(e,a){return n.a.createElement(C.a,{key:e,selected:a===c,onClick:function(e){return function(e,a){u(a),o(!1)}(0,a)}},e)}))))))}))))}var x=function(e){return n.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},n.a.createElement("a",{className:"navbar-brand",href:"#"},"Sorting"),n.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},n.a.createElement("span",{className:"navbar-toggler-icon"})),n.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},n.a.createElement("ul",{className:"navbar-nav mr-auto"})))},N=t(102);var M=function(e){return n.a.createElement(N.a,{title:e.number,arrow:!0,placement:"top"},n.a.createElement("div",{key:e.number,style:{height:"".concat(e.number/1.55,"vh"),display:"inline-block",width:"".concat(e.width,"%"),backgroundColor:"".concat(e.boundaries?"#BA68C8":e.color),verticalAlign:"bottom",border:"".concat(e.border?".5px solid #616161":"none")}}))},O=t(103),j=t(96),I=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var r;Object(l.a)(this,t),(r=a.call(this,e)).animate=function(){r.timer=setInterval((function(){if(null==r.state.timer&&r.setState({timer:r.timer}),r.state.changes.length>0){var e=r.state.changes.slice(0),a=e.shift();void 0!=a?r.setState({changes:e,array:a.array.slice(0),colors:a.colors,compared:a.compared,boundaries:a.boundaries}):r.setState({changes:[],compared:[],boundaries:[]})}else clearInterval(r.state.timer),r.setState({compared:[],boundaries:[],isAnimating:!1,timer:null})}),r.state.speed)},r.handleStop=function(){clearInterval(r.state.timer),r.setState({timer:null})},r.bubbleSort=function(){for(var e=r.state.array.slice(0),a=r.state.colors.slice(0),t=[],n=0;n<e.length-1;n++){for(var o=0;o<e.length-n-1;o++){var i={compared:[o,o+1],swapped:!1,array:e.slice(0),colors:a.slice(0),boundaries:[]};if(e[o]>e[o+1]){i.swapped=!0;var l=e[o];e[o]=e[o+1],e[o+1]=l;var s=a[o];a[o]=a[o+1],a[o+1]=s,i.colors=a.slice(0),i.array=e.slice(0)}t.push(i)}r.setState({changes:t,isSorting:!1,isAnimating:!0,colors:a})}},r.mergeSort=function(){var e=[],a=r.state.array.slice(0),t=r.state.colors.slice(0);r.mergeSortRecur(a.slice(0),a,0,a.length-1,e);var n={compared:[0,a.length-1],swapped:!1,array:a.slice(0),colors:r.state.colors.slice(0),boundaries:[0,Math.floor((0+a.length-1)/2),a.length-1]};e.push(n),r.setState({changes:e,isSorting:!1,isAnimating:!0,colors:t})},r.mergeSortRecur=function(e,a,t,n,o){if(!(t>=n)){var i=Math.floor((t+n)/2);r.mergeSortRecur(e,a,t,i,o),r.mergeSortRecur(e,a,i+1,n,o),r.merge(e,a,t,i+1,n,o);var l={compared:[t,n],swapped:!1,array:e.slice(0),colors:r.state.colors.slice(0),boundaries:[]};o.push(l)}},r.merge=function(e,a,t,n,o,i){for(var l=t,s=o,c=n-1,u=o-t+1,m=t;t<=c&&n<=o;){var d={compared:[],swapped:!1,array:a.slice(0),colors:r.state.colors.slice(0),boundaries:[l,n,s]};a[t]<=a[n]?(d.swapped=!0,e[m]=a[t],d.compared=[t,n],d.array=e.slice(0),m++,t++):(d.swapped=!0,e[m]=a[n],d.compared=[n,o],d.array=e.slice(0),m++,n++),i.push(d)}for(;t<=c;)e[m++]=a[t++];for(;n<=o;)e[m++]=a[n++];for(var p=0;p<u;p++)a[o]=e[o--]},r.getMaxIndex=function(){if(r.state.compared.length>0){var e=r.state.compared[0],a=r.state.compared[1];return r.state.array[e]>r.state.array[a]?e:a}return-1},r.selectionSort=function(){for(var e=[],a=r.state.array.slice(0),t=0;t<a.length-1;t++){for(var n=t,o=t+1;o<a.length;o++)a[o]<a[n]&&(n=o);var i=a[t];a[t]=a[n],a[n]=i;var l={compared:[t,n],swapped:!1,array:a.slice(0),boundaries:[]};e.push(l)}r.setState({changes:e,isSorting:!1,isAnimating:!0})},r.insertionSort=function(){for(var e=[],a=r.state.array.slice(0),t=1;t<a.length;t++)for(var n=t;n>0&&a[n-1]>a[n];){var o=a[n];a[n]=a[n-1],a[n-1]=o;var i={compared:[--n-1,n],swapped:!1,array:a.slice(0),boundaries:[]};e.push(i)}r.setState({changes:e,isSorting:!1,isAnimating:!0})},r.handleSort=function(e){switch(e){case"Bubble Sort":r.bubbleSort();break;case"Merge Sort":r.mergeSort();break;case"Selection Sort":r.selectionSort();break;case"Insertion Sort":r.insertionSort()}r.animate()},r.onSortComplete=function(){r.setState({})},r.generateNewArray=function(){var e=r.generateArray(r.state.arraySize);r.setState({array:e,colors:e.map((function(e,a){return r.randomColor()}))})},r.onSpeedChange=function(e,a){r.setState({speed:2e3-a})},r.handleSliderChange=function(e,a){var t=r.generateArray(a);r.setState({array:t,arraySize:a,colors:t.map((function(e,a){return r.randomColor()}))})},r.handleSortComplete=function(){r.setState({isSorting:!1,shouldSort:!1})},r.handleSpeedChange=function(e,a){console.log(a),r.setState({speed:a})};var n=r.generateArray(5);return r.state={arraySize:5,array:n,isSorting:r.props.sort,isAnimating:!1,changes:[],colors:n.map((function(e,a){return r.randomColor()})),compared:[],sortType:"Bubble Sort",timer:null,boundaries:[],speed:500},r.timer=null,r}return Object(s.a)(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.timer),this.timer=null}},{key:"randomColor",value:function(e){var a,t,r,n=Math.ceil(1e4*Math.random())/Math.ceil(9799*Math.random()),o=~~(6*n),i=6*n-o,l=1-i;switch(o%6){case 0:a=1,t=i,r=0;break;case 1:a=l,t=1,r=0;break;case 2:a=0,t=1,r=i;break;case 3:a=0,t=l,r=1;break;case 4:a=i,t=0,r=1;break;case 5:a=1,t=0,r=l}return"#"+("00"+(~~(255*a)).toString(16)).slice(-2)+("00"+(~~(255*t)).toString(16)).slice(-2)+("00"+(~~(255*r)).toString(16)).slice(-2)}},{key:"valueLabelComponent",value:function(e){var a=e.children,t=e.open,r=e.value;return n.a.createElement(N.a,{open:t,enterTouchDelay:0,placement:"top",title:r},a)}},{key:"generateArray",value:function(e){for(var a=[],t=0;t<e;t++)a.push(Math.ceil(75*Math.random()+50));return a}},{key:"render",value:function(){var e=this,a=void 0==this.state.boundaries?[]:this.state.boundaries;return n.a.createElement("div",{className:"element-container"},n.a.createElement("div",{className:"controls"},n.a.createElement(p.a,{container:!0,spacing:3},n.a.createElement(p.a,{item:!0,xs:4},n.a.createElement(j.a,null,"Array Size"),n.a.createElement(O.a,{ValueLabelComponent:this.valueLabelComponent,className:"slider-comp","aria-label":"custom thumb label",disabled:this.state.isAnimating,defaultValue:5,onChange:this.handleSliderChange,min:5,max:200,style:{marginLeft:"5px"}})),n.a.createElement(p.a,{item:!0,xs:4},n.a.createElement(j.a,null,"Speed"),n.a.createElement(O.a,{ValueLabelComponent:this.valueLabelComponent,className:"slider-comp",disabled:this.state.isAnimating,"aria-label":"custom thumb label",defaultValue:500,onChange:this.onSpeedChange,min:1,max:2e3,style:{marginLeft:"5px"}})),n.a.createElement(p.a,{item:!0,xs:4},n.a.createElement(A,{disabled:this.state.isAnimating,handleSort:this.handleSort,onGenerateNewArray:this.generateNewArray,onStop:this.handleStop})))),n.a.createElement("div",null,n.a.createElement("div",{className:"elements"},this.state.array.map((function(t,r){return n.a.createElement(M,{key:r,number:t,width:document.body.clientWidth/(1.95*e.state.array.length)/10,total:e.state.array.length,color:e.props.multicolor?e.state.colors[r]:"#f36698",border:!e.props.multicolor,compared:new Set(e.state.compared).has(r),sortingIndex:e.getMaxIndex()==r,boundaries:a.length>0&&(r>=a[0]&&r<=a[2])})})))))}}]),t}(n.a.Component),z=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var r;return Object(l.a)(this,t),(r=a.call(this,e)).state={},r}return Object(s.a)(t,[{key:"render",value:function(){return console.log("render app"),n.a.createElement("div",{className:"App"},n.a.createElement(x,{onSort:this.handleSort,onGenerateNewArray:this.generateNewArray,onSliderChange:this.handleSliderChange,onSpeedChange:this.handleSpeedChange}),n.a.createElement(m.a,{maxWidth:!1},n.a.createElement(I,{multicolor:!1})))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[51,1,2]]]);
//# sourceMappingURL=main.8d58c705.chunk.js.map