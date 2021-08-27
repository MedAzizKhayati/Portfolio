(this.webpackJsonpresume=this.webpackJsonpresume||[]).push([[0],{16:function(t,i,s){},19:function(t,i,s){"use strict";s.r(i);var e=s(6),h=s.n(e),o=s(11),a=s.n(o),n=(s(16),s(2)),r=s(3),l=s(8),c=s(5),u=s(4),d=s(1);var m=function(t){return Object(d.jsxs)("footer",{className:"footer",children:[Object(d.jsx)("h3",{children:"Summer Projects"}),Object(d.jsx)("nav",{children:Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{onClick:t.home,children:"Home"}),Object(d.jsx)("li",{onClick:t.about,children:"About"})]})})]})},g=s(0),p=s.n(g),f=s(7),v=s(9),y=function(){function t(i){var s=this;Object(n.a)(this,t),this.two=i,this.width=this.two.width,this.height=this.two.height,this.two.renderer.domElement.addEventListener("mousemove",(function(t){return s.onMouseMove(t)})),this.two.renderer.domElement.addEventListener("mousedown",(function(){return s.onMouseDown()})),this.two.renderer.domElement.addEventListener("mouseleave",(function(){return s.onMouseUp()})),this.two.renderer.domElement.addEventListener("mouseup",(function(){return s.onMouseUp()})),this.mousePos=new g.Anchor,document.addEventListener("keydown",(function(t){document.querySelector(".TwoCanvas:hover")===s.two.renderer.domElement&&s.changeState(t)})),this.intervalFunction=null,this.init(),this.update=this.update.bind(this),this.two.bind("update",this.update)}return Object(r.a)(t,[{key:"changeState",value:function(t){}},{key:"onMouseMove",value:function(t){this.mx=t.clientX-this.two.renderer.domElement.getBoundingClientRect().left,this.my=t.clientY-this.two.renderer.domElement.getBoundingClientRect().top,this.mousePos.set(this.mx,this.my)}},{key:"onMouseDown",value:function(){var t=this;this.intervalFunction&&(this.interval=setInterval((function(){return t.intervalFunction()}),10))}},{key:"onMouseUp",value:function(){clearInterval(this.interval),this.interval=!1}},{key:"init",value:function(){var t=new p.a.Text("Two Projects",this.width/2,this.height/2,{size:30});this.two.add(t)}},{key:"update",value:function(){}},{key:"toString",value:function(){return"Project"}}]),t}();var w=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){if(this.two.clear(),this.start=null,this.end=null,this.state="drawing",this.algorithm=null,this.grid=[],this.size||(this.size=20,this.algorithmState="justStarted",this.intervalFunction=this.draw,this.gridHeight=this.height/this.size,this.gridWidth=this.width/this.size,this.lineGroup=new p.a.Group),this.lineGroup.children.length<this.gridWidth*this.gridHeight)for(var t=0;t<this.gridWidth;t++){this.grid.push([]);var i=new p.a.Line(t*this.size,0,t*this.size,this.height);if(i.stroke="lightblue",this.lineGroup.add(i),t<this.gridHeight){var s=new p.a.Line(0,t*this.size,this.width,t*this.size);s.stroke="lightblue",this.lineGroup.add(s)}}else for(var e=0;e<this.gridWidth;e++)this.grid.push([]);this.two.add(this.lineGroup)}},{key:"changeState",value:function(t){"KeyS"===t.code?this.start&&this.end&&!this.algorithm&&(this.algorithm=this.greedyBestFirstSearch,this.algorithmState="justStarted"):"KeyQ"===t.code?this.start||this.end||this.algorithm||(this.algorithm=this.recursiveDivision,this.algorithmState="justStarted"):"KeyP"===t.code?this.start||this.end||this.algorithm||(this.algorithm=this.noiseGrid,this.algorithmState="justStarted"):"KeyG"===t.code?this.start||this.end||this.algorithm||(this.algorithm=this.depthFirstSearchMaze,this.algorithmState="justStarted"):"KeyD"===t.code?this.state="drawing":"KeyE"===t.code?this.state="erasing":"KeyR"===t.code&&(this.state="resetting",this.init())}},{key:"makeRectangleRelativeToMouse",value:function(){return this.two.makeRectangle(Math.floor(this.mx/this.size%this.gridWidth)*this.size+this.size/2,Math.floor(this.my/this.size%this.gridHeight)*this.size+this.size/2,this.size,this.size)}},{key:"makeGridRect",value:function(t,i){return this.two.makeRectangle(t*this.size+this.size/2,i*this.size+this.size/2,this.size,this.size)}},{key:"getIndexesOfRectangle",value:function(t){return[Math.min(Math.max((t.translation.x-this.size/2)/this.size,0),this.width-1),(t.translation.y-this.size/2)/this.size]}},{key:"draw",value:function(){var t=this.makeRectangleRelativeToMouse(),i=this.getIndexesOfRectangle(t),s=Object(f.a)(i,2),e=s[0],h=s[1];"drawing"===this.state?this.grid[e][h]?this.two.remove(t):(this.grid[e][h]=t,this.start?this.end?t.fill="black":(this.end=t,this.end.fill="green"):(this.start=t,this.start.fill="red")):"erasing"===this.state&&(this.two.remove(t),this.two.remove(this.grid[e][h]),this.grid[e][h]===this.start?this.start=null:this.grid[e][h]===this.end&&(this.end=null),this.grid[e][h]=null)}},{key:"getSurroundingIndexes",value:function(t){var i=this.getIndexesOfRectangle(t),s=Object(f.a)(i,2),e=s[0],h=s[1],o=[];return 0!==e&&o.push([-1,0]),e!==this.gridWidth-1&&o.push([1,0]),h!==this.gridHeight-1&&o.push([0,1]),0!==h&&o.push([0,-1]),o}},{key:"getNeighbours",value:function(t){var i=this,s=this.getIndexesOfRectangle(t.currentNode),e=Object(f.a)(s,2),h=e[0],o=e[1],a=this.getSurroundingIndexes(t.currentNode),n=[];return a.forEach((function(s){if(i.grid[h+s[0]][s[1]+o])i.grid[h+s[0]][s[1]+o]===i.end&&n.push({parentNode:t,currentNode:i.grid[h+s[0]][s[1]+o],distance:i.calculateDistanceToEnd(i.grid[h+s[0]][s[1]+o])});else{var e=i.grid[h+s[0]][s[1]+o]=i.two.makeRectangle(Math.floor(h+s[0])*i.size+i.size/2,Math.floor(s[1]+o)*i.size+i.size/2,i.size,i.size);e.fill="lightblue",n.push({parentNode:t,currentNode:e,distance:i.calculateDistanceToEnd(e)})}})),n}},{key:"calculateDistanceToEnd",value:function(t){return t.translation.distanceTo(this.end.translation)}},{key:"greedyBestFirstSearch",value:function(){var t=this;if("justStarted"===this.algorithmState)this.closedList=[{parentNode:null,currentNode:this.start,distance:this.calculateDistanceToEnd(this.start)}],this.openList=this.getNeighbours(this.closedList[0]),this.algorithmState="findingPath";else if("findingPath"===this.algorithmState){this.openList.sort((function(t,i){return t.distance-i.distance}));var i=this.openList.shift();i&&i.currentNode!==this.end?(i.currentNode.fill="skyblue",this.closedList.push(i),this.getNeighbours(i).forEach((function(i){return t.openList.push(i)}))):i?(this.algorithmState="pathFound",this.closedList.push(i),this.currentPathNode=i.parentNode):(this.algorithmState="pathNotFound",this.algorithm=null)}else"pathFound"===this.algorithmState&&(this.currentPathNode.currentNode!==this.start?(this.currentPathNode.currentNode.fill="yellow",this.currentPathNode=this.currentPathNode.parentNode):this.algorithm=null)}},{key:"rand",value:function(t,i){return Math.floor(Math.random()*(1+i-t))+t}},{key:"recursiveDivision",value:function(){if("justStarted"===this.algorithmState)this.algorithmState="borderLimiting",this.i=0,this.areas=[{horizontal:[0,this.gridWidth-1],vertical:[0,this.gridHeight-1]}];else if("borderLimiting"===this.algorithmState){var t=0;this.i<this.gridWidth?(this.grid[this.i][0]=this.makeGridRect(this.i,0),this.grid[this.i][0].fill="black",this.grid[this.gridWidth-this.i-1][this.gridHeight-1]=this.makeGridRect(this.gridWidth-1-this.i,this.gridHeight-1),this.grid[this.gridWidth-this.i-1][this.gridHeight-1].fill="black"):t++,0<this.i&&this.i<this.gridHeight-1?(this.grid[0][this.i]=this.makeGridRect(0,this.i),this.grid[0][this.i].fill="black",this.grid[this.gridWidth-1][this.gridHeight-1-this.i]=this.makeGridRect(this.gridWidth-1,this.gridHeight-1-this.i),this.grid[this.gridWidth-1][this.gridHeight-1-this.i].fill="black"):t++,this.i++,2===t&&(this.algorithmState="mazeGenerating")}else if(this.areas.length&&"mazeGenerating"===this.algorithmState){var i=0,s=this.areas.pop(),e=Object(f.a)(s.horizontal,2),h=e[0],o=e[1],a=Object(f.a)(s.vertical,2),n=a[0],r=a[1],l=o-h>r-n;l&&(o-h>3?(this.x=this.rand(h+3,o-3),this.areas.push({horizontal:[h,this.x],vertical:s.vertical},{horizontal:[this.x,o],vertical:s.vertical}),this.grid[this.x][n]||(n+=2),this.grid[this.x][r]||(r-=2),this.y=this.rand(n+1,r-1),this.i=n,this.bottomLimit=r,this.algorithmState="lineDrawing",this.vertical=!0):(i=!0,this.areas.push(s))),l||(r-n>3?(this.y=this.rand(n+3,r-3),this.areas.push({horizontal:s.horizontal,vertical:[n,this.y]},{horizontal:s.horizontal,vertical:[this.y,r]}),this.grid[h][this.y]||(h+=2),this.grid[o][this.y]||(o-=2),this.x=this.rand(h+1,o-1),this.i=h,this.rightLimit=o,this.algorithmState="lineDrawing",this.vertical=!1):(i=!0,this.areas.push(s))),1==i&&this.areas.pop()}else"lineDrawing"===this.algorithmState?(this.vertical?this.i<=this.bottomLimit?this.i==this.y||this.grid[this.x][this.i]||(this.grid[this.x][this.i]=this.makeGridRect(this.x,this.i),this.grid[this.x][this.i].fill="black"):this.algorithmState="mazeGenerating":this.i<=this.rightLimit?this.i==this.x||this.grid[this.i][this.y]||(this.grid[this.i][this.y]=this.makeGridRect(this.i,this.y),this.grid[this.i][this.y].fill="black"):this.algorithmState="mazeGenerating",this.i++):this.algorithm=null}},{key:"getNeighbourForDepthFirstSearch",value:function(t){var i=this,s=Object(f.a)(t,2),e=s[0],h=s[1],o=this.makeGridRect(e,h),a=this.getSurroundingIndexes(o);this.two.remove(o);var n=[];return a.forEach((function(t){var s=e+t[0],o=t[1]+h;i.grid[s][o]&&i.isAdjacentToOtherNodes([s,o])<=1&&n.push([s,o])})),function(t){for(var i=t.length-1;i>0;i--){var s=Math.floor(Math.random()*(i+1)),e=t[i];t[i]=t[s],t[s]=e}}(n),n}},{key:"isAdjacentToOtherNodes",value:function(t){var i=this,s=Object(f.a)(t,2),e=s[0],h=s[1],o=this.makeGridRect(e,h),a=this.getSurroundingIndexes(o);this.two.remove(o),0!==e&&0!==h&&a.push([-1,-1]),e!==this.gridWidth-1&&h!==this.gridHeight-1&&a.push([1,1]),0!==e&&h!==this.gridHeight-1&&a.push([-1,1]),e!==this.gridWidth-1&&0!==h&&a.push([1,-1]);var n=0,r=null;return a.forEach((function(t){i.grid[e+t[0]][t[1]+h]||(r?new g.Anchor(e+t[0],t[1]+h).distanceTo(r)>1&&n++:(n++,r=new g.Anchor(e+t[0],t[1]+h)))})),n}},{key:"depthFirstSearchMaze",value:function(){var t=this;if("justStarted"===this.algorithmState){this.algorithmState="mazeGenerating";for(var i=0;i<this.gridWidth;i++)for(var s=0;s<this.gridHeight;s++)this.grid[i][s]=this.makeGridRect(i,s),this.grid[i][s].fill="black";this.stack=[];var e=this.rand(0,this.gridWidth-1),h=this.rand(0,this.gridHeight-1);this.stack.push([e,h])}else if("mazeGenerating"===this.algorithmState&&this.stack.length){if(this.current=this.stack[this.stack.length-1],this.stack.pop(),this.isAdjacentToOtherNodes(this.current)<=1){var o=Object(f.a)(this.current,2),a=o[0],n=o[1];this.two.remove(this.grid[a][n]),this.grid[a][n]=null,this.getNeighbourForDepthFirstSearch(this.current).forEach((function(i){return t.stack.push(i)}))}}else this.algorithm=null}},{key:"noiseGrid",value:function(){if("justStarted"===this.algorithmState)this.i=0,this.j=0,this.noise=new v.Noise(Math.random()),this.algorithmState="gridMaking";else if("gridMaking"===this.algorithmState){if(this.i<this.gridWidth)if(this.j<this.gridHeight)this.noise.simplex2(.1*this.i,.1*this.j)>=0&&(this.grid[this.i][this.j]=this.makeGridRect(this.i,this.j),this.grid[this.i][this.j].fill="black"),this.j++;else this.j=0,this.i++;else this.algorithmState="justStarted",this.algorithm=null}}},{key:"update",value:function(){this.algorithm&&this.algorithm()}}]),s}(y),b=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){var t=this,i=this.props.type?this.props.type:p.a.Types.canvas;this.two=new p.a({width:this.props.width,height:this.props.height,type:i}),this.project=new this.props.project(this.two),this.two.renderer.domElement.className="TwoCanvas",this.props.maximized?(this.two.renderer.domElement.style.background="rgba(255, 255, 255, 1)",this.two.play()):(this.two.renderer.domElement.addEventListener("mouseenter",(function(){return t.two.play()})),this.two.renderer.domElement.addEventListener("mouseleave",(function(){return t.two.pause()})),this.two.pause()),this.two.update()}},{key:"render",value:function(){var t=this;if(this.two){var i=this.two.renderer.domElement;i.parentElement&&i.parentElement.removeChild(i),this.two=null}return this.init(),Object(d.jsx)("div",{ref:function(i){i&&i.appendChild(t.two.renderer.domElement)}})}}]),s}(h.a.Component),j=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;return Object(n.a)(this,s),(e=i.call(this,t)).state=e.props.state,e}return Object(r.a)(s,[{key:"render",value:function(){var t=this;this.state=this.props.state;var i=this.props.project;return Object(d.jsxs)("div",{className:this.state.cssClass,style:this.state.style,children:[Object(d.jsxs)("div",{className:this.state.maximized?"divTwoMaximized":"divTwo",children:[Object(d.jsx)(b,{maximized:this.state.maximized,project:i.project,width:this.state.width,height:this.state.height,type:i.project==w?p.a.Types.webgl:p.a.Types.canvas},i),Object(d.jsx)("button",{id:"maximize",onClick:function(){return t.props.onClick()}})]}),Array(1).fill(0).map((function(){if(!t.state.maximized)return Object(d.jsx)("h1",{children:"Paused"})})),Object(d.jsx)("h2",{className:"sim-title",style:this.state.style,children:i.title}),Object(d.jsxs)("div",{className:"game-info",style:this.state.gameInfoStyle,children:[Object(d.jsxs)("p",{children:["About: ",i.description]}),Object.keys(i.tips).map((function(t){return"tips"==t?Object(d.jsxs)("p",{children:["Tips: ",i.tips[t]]}):Object(d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(d.jsx)("button",{id:"keyButton",children:t}),Object(d.jsx)("p",{children:i.tips[t]})]})}))]})]})}}]),s}(h.a.Component),k=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){this.noise=new v.Noise(Math.random()),this.position=new p.a.Vector(this.width/2,this.height/2),this.radius=this.two.height/3,this.noiseLayer=0,this.blob=new p.a.Path([],!0,!0),this.two.add(this.blob),this.blob.fill="rgb(0,0,40)",this.blob.noStroke()}},{key:"update",value:function(){var t=[];this.noiseLayer+=.01;for(var i=0;i<2*Math.PI;i+=.01){var s=Math.cos(i),e=Math.sin(i),h=new p.a.Anchor(s,e),o=this.noise.perlin3(2*s,2*e,this.noiseLayer)*this.radius/3+this.radius;h.multiplyScalar(o),h.addSelf(this.position),t.push(h)}this.blob.vertices=t}}]),s}(y),S=function(){function t(i,s,e,h){Object(n.a)(this,t),this.orbitSim=h,this.two=e,this.position=i,this.mass=s,this.radius=10*s,this.init(),this.sandbox=!1}return Object(r.a)(t,[{key:"init",value:function(){this.twoObject=new p.a.Circle(this.position.x,this.position.y,this.radius),this.two.add(this.twoObject),this.twoObject.fill="black",this.twoObject.translation=this.position}}]),t}(),x=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t,e,h,o,a,r){var c;return Object(n.a)(this,s),(c=i.call(this,t,h,o,r)).velocity=e,c.planets=a,c.acceleration=new p.a.Anchor,c.update=c.update.bind(Object(l.a)(c)),c.trajectory=[],c.two.bind("update",c.update).play(),c}return Object(r.a)(s,[{key:"update",value:function(){var t=this,i=!1;return this.planets.forEach((function(s){var e=new g.Anchor;e.sub(s.position,t.position),e.multiplyScalar(100*s.mass/Math.pow(e.length(),3)),t.velocity.addSelf(e),e.sub(t.position,s.position).length()<t.radius+s.radius&&(i=!0,t.sandbox||t.orbitSim.removeMoon(t))})),this.position.addSelf(this.velocity),this.position.length()>5e3&&(this.sandbox?i=!0:this.orbitSim.removeMoon(this)),i&&!this.sandbox&&this.two.unbind("update",this.update),this.sandbox||i||(this.trajectory.length>255&&this.trajectory.shift(),this.trajectory.push(this.position.clone()),this.two.remove(this.orbit),this.orbit=new p.a.Path(this.trajectory,!1,!0),this.two.add(this.orbit),this.orbit.noFill()),i}}]),s}(S),O=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){this.intervalFunction=this.spawnMoon,this.mouse=!1,this.mousePos=new g.Anchor,this.planets=[new S(new g.Anchor(this.width/2,this.height/2),this.height/100,this.two,this)],this.moons=[new x(new g.Anchor(this.width/4,this.height/2),new g.Anchor(0,1.5),this.height/350,this.two,this.planets,this)],this.ui=new p.a.Text("Planets remaining: ".concat(this.moons.length),10,20,{alignment:"left",size:this.height/15}),this.two.add(this.ui)}},{key:"update",value:function(){this.ui.value="Planets remaining: ".concat(this.moons.length)}},{key:"removeMoon",value:function(t){var i=this.moons.indexOf(t);i>0&&this.moons.splice(i,1),this.two.unbind("update",t.update),this.two.remove(t.orbit),this.two.remove(t.twoObject)}},{key:"onMouseDown",value:function(){var t=this;this.tempPosition=this.mousePos.clone(),this.tempMoon=new x(this.mousePos.clone(),new g.Anchor(0,0),Math.random()*this.height/150+.1,this.two,this.planets,this),this.tempMoon.sandbox=!0,this.mouse=setInterval((function(){return t.spawnMoon()}),10)}},{key:"onMouseUp",value:function(){this.mouse&&(clearInterval(this.mouse),this.moons.push(this.tempMoon),this.tempMoon.position=this.tempPosition.clone(),this.tempMoon.twoObject.translation=this.tempMoon.position,this.tempMoon.velocity=this.getMoonMouseVelocity(),this.tempMoon.sandbox=!1,this.mouse=!1,this.two.remove(this.group),this.two.remove(this.powerLine))}},{key:"getMoonMouseVelocity",value:function(){var t=new g.Anchor;return t.sub(this.tempMoon.position,this.mousePos),t.multiplyScalar(.01),t}},{key:"spawnMoon",value:function(){this.two.remove(this.group),this.two.remove(this.powerLine),this.tempMoon.position=this.tempPosition.clone(),this.tempMoon.velocity=this.getMoonMouseVelocity(),this.powerLine=this.two.makeLine(this.mousePos.x,this.mousePos.y,this.tempMoon.position.x,this.tempMoon.position.y);for(var t=[],i=0;i<500&&!this.tempMoon.update();i++)if(i%20===0){t.push(new p.a.Circle(this.tempMoon.position.x,this.tempMoon.position.y,1));var s=255*i/500;t[t.length-1].fill="rgb(".concat(s,", ").concat(s,", ").concat(s,")"),t[t.length-1].stroke="rgb(".concat(s,", ").concat(s,", ").concat(s,")")}this.group=this.two.makeGroup(t)}}]),s}(y),M=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;return Object(n.a)(this,s),(e=i.call(this,t)).highestScore=0,e}return Object(r.a)(s,[{key:"init",value:function(){var t=this;document.addEventListener("keydown",(function(i){return t.moveSnake(i)})),this.size=20,this.velocity=2,this.length=4,this.position=new g.Anchor(100+this.size/2,120+this.size/2),this.food=this.two.makeRoundedRectangle(0,0,this.size,this.size,2),this.food.fill="rgb(0,0,100)",this.food.translation=new g.Anchor(0,0),this.SpawnFood(),this.coords=[this.position],this.vels=[],this.body=[];for(var i=0;i<this.length;i++){0!==i&&this.coords.push(this.position.clone().addSelf(new g.Anchor(-this.size*i,0))),this.vels.push(new g.Anchor(this.velocity,0));var s=this.two.makeRoundedRectangle(0,0,this.size,this.size,2);s.translation=this.coords[i],s.fill=0===i?"red":"black",this.body.push(s)}this.currentScore=this.two.makeText("Score: ".concat(this.body.length),15,50,{size:20,alignment:"left"}),this.maxScore=this.two.makeText("Highest Score: ".concat(this.highestScore?this.highestScore:0),15,80,{size:20,alignment:"left"})}},{key:"elongate",value:function(){this.coords.push(this.coords[this.coords.length-1].clone()),this.vels.push(new g.Anchor(0,0));var t=this.two.makeRoundedRectangle(0,0,this.size,this.size,2);t.translation=this.coords[this.coords.length-1],t.fill="black",this.body.push(t)}},{key:"moveSnake",value:function(t){"KeyW"!==t.code&&"ArrowUp"!==t.code||0!==this.vels[0].y?"KeyS"!==t.code&&"ArrowDown"!==t.code||0!==this.vels[0].y?"KeyA"!==t.code&&"ArrowLeft"!==t.code||0!==this.vels[0].x?"KeyD"!==t.code&&"ArrowRight"!==t.code||0!==this.vels[0].x?"KeyE"===t.code&&(this.justChanged=this.elongate):this.justChanged=new g.Anchor(this.velocity,0):this.justChanged=new g.Anchor(-this.velocity,0):this.justChanged=new g.Anchor(0,this.velocity):this.justChanged=new g.Anchor(0,-this.velocity)}},{key:"SpawnFood",value:function(){var t=Math.floor(Math.random()*this.width/this.size)*this.size+this.size/2,i=Math.floor(Math.random()*this.height/this.size)*this.size+this.size/2;this.food.translation.set(t,i)}},{key:"respawn",value:function(){this.two.clear(),this.init()}},{key:"update",value:function(){var t=this,i=!1;if(this.coords.forEach((function(s,e){s.addSelf(t.vels[e]),s.distanceTo(t.position)||0===e||(i=!0)})),(this.position.x<0||this.position.y<0||this.position.x>this.width||this.position.y>this.height)&&(i=!0),i&&this.respawn(),(this.position.x-this.size/2)%this.size===0&&(this.position.y-this.size/2)%this.size===0){for(var s=this.vels.length-1;s>0;s--)this.vels[s].copy(this.vels[s-1]);"function"===typeof this.justChanged?(this.justChanged(),this.justChanged=null):this.justChanged&&(this.vels[0].copy(this.justChanged),this.justChanged=null)}this.position.distanceTo(this.food.translation)||(this.SpawnFood(),this.elongate(),this.currentScore.value="Score: ".concat(this.body.length),this.body.length>this.highestScore&&(this.highestScore=this.body.length,this.maxScore.value="Highest Score: ".concat(this.highestScore)))}}]),s}(y),z=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;return Object(n.a)(this,s),(e=i.call(this,t)).id=Math.floor(100*Math.random()),e.random=!0,e}return Object(r.a)(s,[{key:"init",value:function(){var t=this;this.two.clear(),this.justStarted="justStarted",this.noise=new v.Noise(Math.random()),this.rectWidth=1,this.algorithm=null,this.frameCount=-10,this.length=this.width/this.rectWidth,this.rects=Array(this.length).fill(0).map((function(i,s){var e=t.two.makeRectangle(s*t.rectWidth,t.height/2,t.rectWidth,t.random?t.height*Math.random():t.noise.perlin2(.01*s,0)*t.height+t.height/2);return e.fill="black",e}))}},{key:"changeState",value:function(t){if("KeyR"===t.code)this.init();else if("KeyD"===t.code&&this.two.frameCount-this.frameCount>10)this.frameCount=this.two.frameCount,this.random=!this.random,this.init();else if("KeyA"===t.code)this.algorithm&&this.init(),this.algorithm=this.iterativeQuickSort;else if("KeyB"===t.code)this.algorithm&&this.init(),this.algorithm=this.bubbleSort;else if("KeyI"===t.code)this.algorithm&&this.init(),this.algorithm=this.insertionSort;else if("KeyS"===t.code)for(var i=0;i<300;i++)this.update()}},{key:"swap",value:function(t,i){var s=this.rects[t].height;this.rects[t].height=this.rects[i].height,this.rects[i].height=s}},{key:"partitionHigh",value:function(t,i){for(var s=this.rects[i].height,e=t,h=t;h<i;h++)this.rects[h].height<=s&&(this.swap(e,h),e++);return this.swap(e,i),e}},{key:"iterativeQuickSort",value:function(){if(this.justStarted&&(this.stack=[],this.start=0,this.end=this.rects.length-1,this.stack.push({x:this.start,y:this.end}),this.justStarted=!1),this.stack.length){var t=this.stack.shift(),i=t.x,s=t.y,e=this.partitionHigh(i,s);e-1>i&&this.stack.push({x:i,y:e-1}),e+1<s&&this.stack.push({x:e+1,y:s})}else this.i=0,this.algorithm=this.greenAll}},{key:"bubbleSort",value:function(){this.justStarted&&(this.i=0,this.j=0,this.justStarted=!1),this.i<this.length-1?this.j<this.length-this.i-1?(this.rects[this.j].height>this.rects[this.j+1].height&&this.swap(this.j,this.j+1),this.j++):(this.j=0,this.i++):(this.i=0,this.algorithm=this.greenAll)}},{key:"insertionSort",value:function(){this.justStarted&&(this.i=1,this.j=0,this.current=this.rects[this.i].height,this.justStarted=!1),this.i<this.length?this.j>-1&&this.current<this.rects[this.j].height?(this.rects[this.j+1].height=this.rects[this.j].height,this.j--):(this.rects[this.j+1].height=this.current,this.i++,this.j=this.i-1,this.i<this.length&&(this.current=this.rects[this.i].height)):(this.i=0,this.algorithm=this.greenAll)}},{key:"selectionSort",value:function(){this.justStarted&&(this.i=0,this.j=this.i+1,this.min=this.i,this.justStarted=!1),this.i<this.length?this.j<this.length?(this.rects[this.j].height<this.rects[this.min].height&&(this.min=this.j),this.j++):(this.swap(this.i,this.min),this.i++,this.j=this.i+1,this.min=this.i):(this.i=0,this.algorithm=this.greenAll)}},{key:"greenAll",value:function(){this.i<this.length?(this.rects[this.i].fill="green",this.rects[this.i].stroke="green",this.i++):this.init()}},{key:"update",value:function(){this.algorithm&&this.algorithm()}}]),s}(y),A=Math.sin,P=Math.cos,C=Math.PI,T=Math.sqrt;var R=function(){function t(i){Object(n.a)(this,t),this.rc=i,this.position=i.mousePos,this.rayCount=101}return Object(r.a)(t,[{key:"drawRays",value:function(){var t=this;this.rc.two.remove(this.rays),this.rays=new p.a.Group;for(var i=function(i){var s=t.position.x+t.rc.width/T(1+Math.pow(A(i)/P(i),2)),e=t.position.x-t.rc.width/T(1+Math.pow(A(i)/P(i),2)),h=t.position.y+(s-t.position.x)*A(i)/P(i),o=t.position.y+(e-t.position.x)*A(i)/P(i),a=new g.Anchor(s,h),n=new g.Anchor(e,o);t.rc.obstacles.forEach((function(i){var r=function(t,i,s,e,h,o,a,n){var r,l,c=(n-o)*(s-t)-(a-h)*(e-i);return 0==c?null:(l=((s-t)*(i-o)-(e-i)*(t-h))/c,(r=((a-h)*(i-o)-(n-o)*(t-h))/c)>=0&&r<=1&&l>=0&&l<=1?new g.Anchor(t+r*(s-t),i+r*(e-i)):null)}(s,h,e,o,i[0].x,i[0].y,i[1].x,i[1].y);r&&(s-t.position.x)*(r.x-t.position.x)>0?r.distanceTo(t.position)<a.distanceTo(t.position)&&a.copy(r):r&&r.distanceTo(t.position)<t.position.distanceTo(n)&&n.copy(r)}));var r=new p.a.Line(a.x,a.y,n.x,n.y);r.stroke="white",t.rays.add(r)},s=0;s<2*C;s+=2*C/this.rayCount)i(s);this.rc.two.add(this.rays)}}]),t}(),B=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){this.rect=this.two.makeRectangle(this.width/2,this.height/2,this.width,this.height),this.rect.fill="black",this.setObstacles(),this.lightSource=new R(this)}},{key:"setObstacles",value:function(){this.two.remove(this.lines),this.lines=new p.a.Group,this.obstacles=[];for(var t=0;t<5;t++){var i=Math.random()*this.width,s=Math.random()*this.width,e=Math.random()*this.height,h=Math.random()*this.height,o=new p.a.Line(i,e,s,h);o.stroke="white",this.lines.add(o),this.obstacles.push([new g.Anchor(i,e),new g.Anchor(s,h)])}this.two.add(this.lines)}},{key:"update",value:function(){this.lightSource.drawRays()}},{key:"changeState",value:function(t){"KeyR"===t.code&&this.setObstacles()}}]),s}(y),E=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(){return Object(n.a)(this,s),i.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){this.intervalFunction=this.controlPendulum,this.m1=this.m2=this.height/30,this.r1=this.r2=this.height/4,this.g=.1,this.a1=[3.9,0,0],this.a2=[2.5,0,0],this.path=[],this.position=new g.Anchor(this.width/2,this.height/3),this.masses=[new p.a.Circle(0,0,this.m1),new p.a.Circle(0,0,this.m2)],this.masses.forEach((function(t){t.translation=new g.Anchor,t.fill="black"})),this.firstLine=this.two.makeLine(),this.secondLine=this.two.makeLine(),this.firstLine.vertices=[this.position,this.masses[0].translation],this.secondLine.vertices=[this.masses[1].translation,this.masses[0].translation],this.two.add(this.masses)}},{key:"controlPendulum",value:function(){var t=new g.Anchor(this.mx,this.my);t.distanceTo(this.masses[0].translation)<t.distanceTo(this.masses[1].translation)?(t.subSelf(this.position),t.normalize(),this.a1[0]=Math.atan2(t.x,t.y)):(t.subSelf(this.masses[0].translation),t.normalize(),this.a2[0]=Math.atan2(t.x,t.y)),this.a1[1]=this.a2[1]=0}},{key:"update",value:function(){var t=Math.sin(this.a1[0]),i=Math.cos(this.a1[0]),s=Math.sin(this.a2[0]),e=Math.cos(this.a2[0]);this.a1[2]=-this.g*(2*this.m1+this.m2)*t-this.m2*this.g*Math.sin(this.a1[0]-2*this.a2[0]),this.a1[2]-=2*Math.sin(this.a1[0]-this.a2[0])*this.m2*(this.a2[1]*this.a2[1]*this.r2+this.a1[1]*this.a1[1]*this.r1*Math.cos(this.a1[0]-this.a2[0])),this.a1[2]*=1/(this.r1*(2*this.m1+this.m2-this.m2*Math.cos(2*this.a1[0]-2*this.a2[0]))),this.a2[2]=2*Math.sin(this.a1[0]-this.a2[0]),this.a2[2]*=this.a1[1]*this.a1[1]*this.r1*(this.m1+this.m2)+this.g*(this.m1+this.m2)*i+this.a2[1]*this.a2[1]*this.r2*this.m2*Math.cos(this.a1[0]-this.a2[0]),this.a2[2]*=1/(this.r2*(2*this.m1+this.m2-this.m2*Math.cos(2*this.a1[0]-2*this.a2[0]))),this.a1[1]+=this.a1[2],this.a2[1]+=this.a2[2],this.a1[0]+=this.a1[1],this.a2[0]+=this.a2[1],this.masses[0].translation.set(this.position.x+t*this.r1,this.position.y+i*this.r1),this.masses[1].translation.set(this.masses[0].translation.x+s*this.r2,this.masses[0].translation.y+e*this.r2),this.two.remove(this.traject),this.path.length>255&&this.path.shift(),this.path.push(this.masses[1].translation.clone()),this.traject=new p.a.Path(this.path,!1),this.two.add(this.traject),this.traject.noFill()}}]),s}(y),L=0,N=function(){function t(i,s,e,h){Object(n.a)(this,t),this.acceleration=new g.Anchor(0,L),this.two=h,this.position=i,this.velocity=s,this.radius=e,this.mass=e/10,this.circle=this.two.makeCircle(0,0,e),this.circle.translation=i,this.circle.fill="black"}return Object(r.a)(t,[{key:"update",value:function(){this.acceleration.y=L,this.velocity.addSelf(this.acceleration),this.position.addSelf(this.velocity),this.position.y+this.radius>this.two.height?(this.position.y=this.two.height-this.radius,this.velocity.y*=-.7):this.position.y<this.radius&&(this.position.y=this.radius,this.velocity.y*=-.95),this.position.x<this.radius?(this.position.x=this.radius,this.velocity.x*=-.95):this.position.x>this.two.width-this.radius&&(this.position.x=this.two.width-this.radius,this.velocity.x*=-.95)}}]),t}(),G=[{project:O,title:"Orbit Simulation",description:"This is a gravity simulator where you can spawn planets and make them orbit the sun by setting their initial velocity and direction.",tips:{tips:"Press, hold and drag the mouse to spawn a planet, try to make it orbit the sun."}},{project:function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;Object(n.a)(this,s),e=i.call(this,t);for(var h=0;h<Math.floor(10*Math.random())+3;h++)e.randomBallSpawner();return e}return Object(r.a)(s,[{key:"randomBallSpawner",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,i=Math.random()*this.width,s=Math.random()*this.height,e=new g.Anchor(i,s),h=new g.Anchor(2*Math.random()-1,2*Math.random()-1);-1===t&&(t=35*Math.random()+5),this.massBalls.push(new N(e,h,t,this.two))}},{key:"init",value:function(){this.two.clear(),this.gravityIndicator=this.two.makeText(0===L?"Gravity OFF":"Gravity ON",this.two.width/2,15,{size:15}),this.frameCountAtChange=0,this.massBalls=[]}},{key:"detectCollisions",value:function(){this.massBalls.sort((function(t,i){return t.position.x-i.position.x}));for(var t=0;t<this.massBalls.length-1;t++)for(var i=t+1;i<this.massBalls.length;i++){var s=this.massBalls[t].radius,e=this.massBalls[i].radius,h=this.massBalls[t].position,o=this.massBalls[i].position;if(h.distanceTo(o)<s+e){var a=this.massBalls[t].mass,n=this.massBalls[i].mass,r=this.massBalls[t].velocity,l=this.massBalls[i].velocity,c=new g.Anchor;c.sub(h,o).normalize(),s>e?o.sub(h,c.clone().multiplyScalar(s+e)):h.add(c.clone().multiplyScalar(s+e),o),c.sub(h,o).normalize();var u=new g.Anchor,d=c.clone().multiplyScalar(u.sub(r,l).dot(c));r.subSelf(d.clone().multiplyScalar(2*n/(a+n))),l.addSelf(d.clone().multiplyScalar(2*a/(a+n)))}else if(Math.abs(h.x-o.x)>100)break}}},{key:"update",value:function(){for(var t=0;t<this.massBalls.length;t++)this.massBalls[t].update();this.detectCollisions()}},{key:"simulateAtoms",value:function(){this.init();for(var t=0;t<100;t++)this.randomBallSpawner(5)}},{key:"controlBall",value:function(){var t=(new Date).getTime();this.currentBall.radius=5+30*Math.abs(Math.sin(t/1e3)),this.currentBall.mass=this.currentBall.radius/10,this.currentBall.circle.radius=this.currentBall.radius,this.two.remove(this.line),this.line=this.two.makeLine(this.mousePos.x,this.mousePos.y,this.currentBall.position.x,this.currentBall.position.y),this.currentBall.velocity.sub(this.currentBall.position,this.mousePos).multiplyScalar(.05)}},{key:"onMouseDown",value:function(){var t=this;this.currentBall=new N(this.mousePos.clone(),new g.Anchor,25,this.two),this.currentPos=this.mousePos.clone(),this.controlBall&&(this.interval=setInterval((function(){return t.controlBall()}),10))}},{key:"onMouseUp",value:function(){this.currentBall&&this.massBalls.push(this.currentBall),this.two.remove(this.line),clearInterval(this.interval),this.interval=!1}},{key:"changeState",value:function(t){if("KeyR"===t.code)this.init();else if("KeyG"===t.code)this.two.frameCount-this.frameCountAtChange>10&&(L=0===L?.1:0,this.gravityIndicator.value=0===L?"Gravity OFF":"Gravity ON",this.frameCountAtChange=this.two.frameCount);else if("KeyQ"===t.code)this.two.frameCount-this.frameCountAtChange>10&&(this.simulateAtoms(),this.frameCountAtChange=this.two.frameCount);else if("KeyS"===t.code)for(var i=0;i<1e3;i++)this.update()}}]),s}(y),title:"Elastic Collisions",description:"This is a simulation of Elastic Collisions where you can see how balls interact with each other.",tips:{tips:"Press, hold and drag the mouse to spawn a mass ball and control its velocity, be aware don't time travel if spawned many balls (it's heavy on the cpu).",Q:"Press Q (A for Azerty Keybords) for gaz simulation.",R:"Press R to reset the simulation and empty the chamber.",G:"Press G to toggle Gravity On/Off.",S:"Press and hold S for time travel."}},{project:M,title:"Snake",description:"This is the basic snake game where you can feed your snake so that it grows and rizes your score.",tips:{tips:"use (W, A, S, D) or Arrows for controlling the snake, try to get the maximum score without hitting the walls.",E:"Press E to make the snake grow (Don't cheat, play the game !!)."}},{project:E,title:"Double Pendulum",description:"If you like physics like me, you must've heard about the double pendulum, which is basically two balls attached to each other by two lines and let the gravity do its thing.",tips:{tips:"Press, hold and drag the pendulum to control its initial state."}},{project:k,title:"Perlin Noise",description:"This is an animation that showcases how smooth is the perlin noise. It's not just random values, it generates randomly close values",tips:{tips:"Just enjoy the animation."}},{project:z,title:"Sorting Visualizer",description:"This program showcases different sorting algorithms. Basically it tries to sort the lines from the shortest to the longest",tips:{tips:"Shuffle the way you like, choose and algorithm and watch it do its thing, if you get too bored hold S to make it go boom boom",R:"Press R to shuffle",D:"Press D to change the suffling method (Perlin Noise/Random)",A:"Press A (Q for Azerty Keyboards) to choose QuickSort algorithm",B:"Press B to toggle Bubble Sort",I:"Press I to toggle Insertion Sort",S:"Press and hold S for time travel."}},{project:w,title:"Path Finder & Maze Generator",description:"This program showcases how the Greedy Best First Search works in Finding paths to any location on the grid, it also shows two different ways for generating random mazes, the first uses the recursive division algorithm and the second uses Depth First Search algorithm",tips:{tips:"Generate a maze and set the start location and the final one, and start the path finding process, or you can draw your own obstacles using your mouse. Be creative and have fun!",G:"Press G for generating a maze using the Depth First Search algorithm.",Q:"Press Q(A for Azerty Keyboards) for generating a maze using the recusive division algorithm.",R:"Press R to empty the grid",D:"Press D to toggle Drawing",E:"Press E to toggle Erasing",P:"Pres P to generate a map using Perlin Noise",S:"Press S to start the Path Finding process."}},{project:B,title:"Ray Casting",description:"This is a program that simulates how light rays interact with obstacles.",tips:{tips:"Use your mouse to move the light source.",R:"Press R to shuffle the obstacles."}}],F=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;return Object(n.a)(this,s),(e=i.call(this,t)).state={cardsStates:Array(G.length).fill({maximized:!1,width:420,height:260,cssClass:"sim-div",gameInfoStyle:{display:"none"}})},e}return Object(r.a)(s,[{key:"handleMaximize",value:function(t){var i=this;this.setState({cardsStates:Array(G.length).fill(0).map((function(s,e){return e!==t||i.state.cardsStates[t].maximized?{maximized:!1,width:420,height:260,style:{},gameInfoStyle:{display:"none"},cssClass:"sim-div"}:{maximized:!0,width:840,height:520,style:{order:-1},gameInfoStyle:{display:"block"},cssClass:"sim-div"}}))}),window.scrollTo({top:0,behavior:"smooth"})}},{key:"render",value:function(){var t=this;return Object(d.jsx)("div",{className:"container",children:G.map((function(i,s){return Object(d.jsx)(j,{onClick:function(){return t.handleMaximize(s)},state:t.state.cardsStates[s],project:i},1e8*Math.random()*Date.now())}))})}}]),s}(h.a.Component),D=function(t){Object(c.a)(s,t);var i=Object(u.a)(s);function s(t){var e;return Object(n.a)(this,s),(e=i.call(this,t)).state={page:"Home"},e.redirectToAbout=e.redirectToAbout.bind(Object(l.a)(e)),e.redirectToHome=e.redirectToHome.bind(Object(l.a)(e)),e}return Object(r.a)(s,[{key:"redirectToHome",value:function(){this.setState({page:"Home"})}},{key:"redirectToAbout",value:function(){this.setState({page:"About"})}},{key:"render",value:function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)(m,{home:this.redirectToHome,about:this.redirectToAbout}),"Home"===this.state.page?Object(d.jsx)(F,{}):Object(d.jsx)("h1",{children:"Hello This is About"})]})}}]),s}(h.a.Component),H=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,20)).then((function(i){var s=i.getCLS,e=i.getFID,h=i.getFCP,o=i.getLCP,a=i.getTTFB;s(t),e(t),h(t),o(t),a(t)}))};a.a.render(Object(d.jsx)(D,{}),document.getElementById("root")),window.addEventListener("keydown",(function(t){["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(t.code)>-1&&t.preventDefault()}),!1),H()}},[[19,1,2]]]);
//# sourceMappingURL=main.2c4cd097.chunk.js.map