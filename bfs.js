

/*
function random_obstacles(){
    let blocked1,blocked2;
    for(var g=0; g<10 ;g++){
        blocked1= Math.floor(Math.random() * 50);
        blocked2 = Math.floor(Math.random() * 20);
        tiles[blocked1 ][blocked2 ].state ='f'
        
    }
    
}*/


const canvas= document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
const Height= canvas.height;
const Width= canvas.width;
var output;

tileW= 20;
tileH=20;

tileRow= 20;
tileColumn= 50;

boundX=0;
boundY=0;


var tiles=[];
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
tiles[0][0].state= 's';  //s for start

tiles[tileColumn-1][tileRow-1].state= 'f';    //f for finish




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

function solveMaze()
{
    var Xqueue=[0];
    var Yqueue=[0];

    var pathFound=false;

    var xLoc;
    var yLoc;

    while(Xqueue.length>0 && pathFound===false)
    {
        xLoc=Xqueue.shift();
        yLoc=Yqueue.shift();

        if(xLoc>0)
        {
            if(tiles[xLoc-1][yLoc].state==="f")
            {
                pathFound=true;
            }
        }
        if(xLoc<tileColumn-1)
        {
            if(tiles[xLoc+1][yLoc].state==="f")
            {
                pathFound=true;
            }
        }
        if(yLoc>0)
        {
            if(tiles[xLoc][yLoc-1].state==="f")
            {
                pathFound=true;
            }
        }
        if(yLoc<tileRow-1)
        {
            if(tiles[xLoc][yLoc+1].state==="f")
            {
                pathFound=true;
            }
        }
        if(xLoc>0)
        {
            if(tiles[xLoc-1][yLoc].state==="e")
            {
                Xqueue.push(xLoc-1);
                Yqueue.push(yLoc);
                tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+"l";    //l for left
            }
        }
        if(xLoc<tileColumn-1)
        {
            if(tiles[xLoc+1][yLoc].state==="e")
            {
                Xqueue.push(xLoc+1);
                Yqueue.push(yLoc);
                tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+"r";    // r for right
            }
        }
        if(yLoc>0)
        {
            if(tiles[xLoc][yLoc-1].state==="e")
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc-1);
                tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+"u";  // u for up
            }
        }
        if(yLoc<tileRow-1)
        {
            if(tiles[xLoc][yLoc+1].state==="e")
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc+1);
                tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+"d";      //d for down
            }
        }
    }
    if(!pathFound)
    {
        output.innerHTML="Oops!! No Solution exists.";
    }
    else
    {
        output.innerHTML="Solved :)";
        var path=tiles[xLoc][yLoc].state;
        var pathLength=path.length;
        var currX=0;
        var currY=0;
        for(var i=0;i<pathLength-1;i++)
        {
            if(path.charAt(i+1)==="u")
            {
                currY-=1;
            }
            if(path.charAt(i+1)==="d")
            {
                currY+=1;
            }
            if(path.charAt(i+1)==="r")
            {
                currX+=1;
            }
            if(path.charAt(i+1)==="l")
            {
                currX-=1;
            }
            tiles[currX][currY].state="x";
        }
    }
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

canvas.onmousedown= myDown;
canvas.onmouseup= myUp;