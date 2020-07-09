const canvas= document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
const Height= canvas.height;
const Width= canvas.width;
//var output;

tileW= 20;
tileH=20;

tileRow= 20;
tileColumn= 50;
let set =[]
let distance =[]
let prev =[]

var tiles=[];
for (c=0; c < tileColumn; c++){
    tiles[c]=[];

    for(r=0; r < tileRow; r++){
        tiles[c][r]= new spot(c,r)
    }
}
function spot(c,r){
    this.x = c*(tileW+3)
    this.y = r*(tileH+3)
    this.c=c
    this.r =r
    this.state = 'e'
    this.g=0
    this.f=0
    this.h=0
    this.neighbors=[]
    this.getNeighbors = function(cur){
        if(cur.c >0){
            neighbors.push(grid[c-1][r])
        }
       if(cur.x < tileColumn-1){
        neighbors.push(grid[c+1][r])
       }if(cur.y > 0){
        neighbors.push(grid[c][r-1])
       }if(cur.y < tileRow-1){
        neighbors.push(grid[c][r+1 ])
       }
       return neighbors;
    }
    
}
tiles[0][0].state= 's';  //s for start
tiles[tileColumn-1][tileRow-1].state= 'f';    //f for finish

start = tiles[0][0]
end = tiles[tileColumn-1][tileRow-1]


function rect(x,y,w,h,state){

    if (state==='s'){
        ctx.fillStyle='green';        
    }
    else if (state==='f'){
        ctx.fillStyle= '#FF0000';
    }
    else if (state==='e'){
        ctx.fillStyle= '#AAAAAA';
    }
    else if(state==="w"){       // w for walls
        ctx.fillStyle= 'blue';
    }
    else if(state==="x"){       // x for path
        ctx.fillStyle="pink";
    }
    else
    {
        ctx.fillStyle="burlywood";     // visited tiles
    }

    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear(){
    ctx.clearRect(0,0,Width,Height);
}

function draw(){
    clear();

    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
        }
    }

}

function myMove(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+3)<x && x < c*(tileW+3)+tileW && r*(tileH+3)<y && y < r*(tileH+3)+tileH){
                if (tiles[c][r].state==='e' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='e';
                }

            }
        }
    }
}


function myDown(e){
    canvas.onmousemove= myMove;
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+3)<x && x < c*(tileW+3)+tileW && r*(tileH+3)<y && y < r*(tileH+3)+tileH){
                if (tiles[c][r].state==='e'){
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w'){
                    tiles[c][r].state='e';
                    boundX=c;
                    boundY=r;
                }
            }
        }
    }
}

function myUp(){
    canvas.onmousemove= null;
}



function reset()
{
    for (c=0; c < tileColumn; c++){
        tiles[c]=[];
    
        for(r=0; r < tileRow; r++){
            tiles[c][r]= {
                x: c*(tileW+3),
                y: r*(tileH+3),
                state: 'e'//e for empty
            };
        }
    }
    tiles[0][0].state= 's';
    tiles[tileColumn-1][tileRow-1].state= 'f';

    output.innerHTML="";
}

function init(){
    output= document.getElementById("outcome");
    return setInterval(draw,10);
}

init();


function display_alert(){
    alert('1. Green box shows the start\n2. Red box shows destination\n3. Draw obstacles and hit SOLVE\n4. Hit RESET if you want to play again' );
}

function removed_element(set,min_tile){
    var index = set.indexOf(min_tile);
    if (index > -1) {
     set.splice(index, 1);
 }
    
 }

function solveMaze()
{ 
  distance[start]=0
  set.push(start)
  for(var c=0;c<tileColumn;c++){
      for(var r=0;r<tileRow;r++){
          distance[tiles[c][r]] = Infinity
          prev[tiles[c][r]] = undefined

      }
  }
  while(!set.empty()){
      
      let min_tile = min_dist_tile()
       removed_element(set,min_tile)
      let cur = min_tile
      let neighbors= []
      neighbors = this.getNeighbors(cur)
      neighbors.forEach(element => {
         let alt = distance[cur] + heuristic(cur,element)
         if(alt < distance[element]){
             distance[element] = alt
             pre[element]= cur
             set.push(element)
               
         }
      })
}

}
function min_dist_tile(){
  var min = Infinity
    set.forEach(element =>{
      if(set[element].g  < min){
          min = set[element].g
          min_tile = set[element]
          min_tile.g = min
      }
    })
    return min

}


canvas.onmousedown= myDown;
canvas.onmouseup= myUp;
