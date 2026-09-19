const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
const energyText=document.getElementById("energy");
const livesText=document.getElementById("lives");
const exitGame=document.getElementById("exitGame");
const selectedCharacter=localStorage.getItem("selectedCharacter")||"vinnie";
const playerImage=new Image();
playerImage.src=selectedCharacter==="benny"?"images/benny.png":"images/vinnie.png";
const player={x:80,y:345,width:55,height:75,speed:5,velocityY:0,jumping:false};
const keys={};
const energy={x:250,y:305};
const platforms=[
    {x:0,y:420,width:1000,height:80},
    {x:100,y:350,width:130,height:20},
    {x:300,y:290,width:140,height:20},
    {x:500,y:360,width:120,height:20},
    {x:650,y:250,width:150,height:20},
    {x:850,y:320,width:120,height:20},
    {x:760,y:170,width:110,height:20}
];
document.addEventListener("keydown",e=>{
    keys[e.key]=true;
    if(e.code==="Space"&&!player.jumping){
        player.velocityY=-13;
        player.jumping=true;
    }
});
document.addEventListener("keyup",e=>keys[e.key]=false);
function update(){
    if(keys["ArrowLeft"])player.x-=player.speed;
    if(keys["ArrowRight"])player.x+=player.speed;
    player.velocityY+=0.6;
    player.y+=player.velocityY;
    player.jumping=true;
    platforms.forEach(p=>{
        if(player.x<p.x+p.width&&player.x+player.width>p.x&&player.y+player.height>=p.y&&player.y+player.height<=p.y+p.height+10&&player.velocityY>=0){
            player.y=p.y-player.height;
            player.velocityY=0;
            player.jumping=false;
        }
    });
    if(player.x<0)player.x=0;
    if(player.x+player.width>canvas.width)player.x=canvas.width-player.width;
}

function drawPlatform(p){
    ctx.fillStyle="#242451";
    ctx.fillRect(p.x,p.y,p.width,p.height);
    ctx.fillStyle="#00d9ff";
    ctx.fillRect(p.x,p.y,p.width,3);
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#292552";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#51427a";
    ctx.fillRect(0,380,canvas.width,40);
    platforms.forEach(drawPlatform);
    ctx.fillStyle="#ffd83d";
    ctx.shadowColor="#ffd83d";
    ctx.shadowBlur=12;
    ctx.beginPath();
    ctx.arc(energy.x,energy.y,9,0,Math.PI*2);
    ctx.fill();
    ctx.shadowBlur=0;
    if(playerImage.complete)
        ctx.drawImage(playerImage,player.x,player.y,player.width,player.height);
}
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
exitGame.addEventListener("click",()=>window.location.href="index.html");
gameLoop();