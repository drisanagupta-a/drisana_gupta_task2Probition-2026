const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
const energyText=document.getElementById("energy");
const livesText=document.getElementById("lives");
const exitGame=document.getElementById("exitGame");
const selectedCharacter=localStorage.getItem("selectedCharacter")||"vinnie";
const theme=selectedCharacter==="vinnie"?"jungle":"desert";
const playerImage=new Image();
playerImage.src=selectedCharacter==="benny"?"assets/images/benny.png":"assets/images/vinnie.png";
const images={
    cloud1:new Image(),
    cloud2:new Image(),
    obstacle:new Image(),
    portal:new Image(),
    platform:new Image(),
    idle:new Image(),
    action1:new Image(),
    action2:new Image(),
    jump:new Image(),
    hurt:new Image(),
    cheer:new Image()
};
if(theme==="jungle"){
    images.cloud1.src="assets/images/vinnie_jungle_cloud_1.svg";
    images.cloud2.src="assets/images/vinnie_jungle_cloud_2.svg";
    images.obstacle.src="assets/images/vinnie_jungle_obstacle.svg";
    images.portal.src="assets/images/vinnie_jungle_portal.svg";
    images.platform.src="assets/images/vinnie_jungle_platform_decoration.svg";
    images.idle.src="assets/images/female_idle.png";
    images.action1.src="assets/images/female_action1.png";
    images.action2.src="assets/images/female_action2.png";
    images.jump.src="assets/images/female_jump.png";
    images.hurt.src="assets/images/female_hurt.png";
    images.cheer.src="assets/images/female_cheer2.png";
}else{
    images.cloud1.src="assets/images/benny_desert_cloud_1.svg";
    images.cloud2.src="assets/images/benny_desert_cloud_2.svg";
    images.obstacle.src="assets/images/benny_desert_obstacle.svg";
    images.portal.src="assets/images/benny_desert_portal.svg";
    images.platform.src="assets/images/benny_desert_platform_decoration.svg";
    images.idle.src="assets/images/player_idle.png";
    images.action1.src="assets/images/player_action1.png";
    images.action2.src="assets/images/player_action2.png";
    images.jump.src="assets/images/player_jump.png";
    images.hurt.src="assets/images/player_hurt.png";
    images.cheer.src="assets/images/player_cheer2.png";
}
const player={
    x:60,
    y:345,
    width:55,
    height:75,
    speed:5,
    velocityY:0,
    jumping:false
};
const keys={};
let lives=3;
let gameOver=false;
let gameWon=false;
let frame=0;
let invulnerableUntil=0;
let hurtUntil=0;
const platforms=[
    {x:0,y:420,width:1000,height:80},
    {x:80,y:350,width:150,height:20},
    {x:330,y:290,width:150,height:20},
    {x:520,y:350,width:130,height:20},
    {x:680,y:250,width:150,height:20},
    {x:800,y:110,width:170,height:20}
];
const movingPlatforms=[
    {x:210,y:220,width:110,height:20,baseX:210,range:70,speed:.7},
    {x:600,y:155,width:110,height:20,baseY:155,range:35,speed:.6}
];
const energies=[
    {x:95,y:325,collected:false},
    {x:345,y:265,collected:false},
    {x:535,y:325,collected:false},
    {x:695,y:225,collected:false},
    {x:265,y:195,collected:false},
    {x:650,y:105,collected:false}
];
const thorns=[
    {x:195,y:315,width:35,height:35},
    {x:430,y:255,width:35,height:35},
    {x:610,y:315,width:35,height:35},
    {x:795,y:215,width:35,height:35}
];
const portal={
    x:875,
    y:15,
    width:70,
    height:95
};
const clouds=[
    {x:40,y:35,w:120,h:65},
    {x:250,y:70,w:110,h:60},
    {x:470,y:35,w:130,h:65},
    {x:700,y:60,w:120,h:65},
    {x:850,y:25,w:100,h:55}
];
if(energyText)energyText.textContent="0/6";
if(livesText)livesText.textContent="3";
document.addEventListener("keydown",e=>{
    keys[e.key]=true;

    if(e.code==="Space"&&!player.jumping&&!gameOver&&!gameWon){
        player.velocityY=-13;
        player.jumping=true;
    }

    if(e.key.toLowerCase()==="r"&&(gameOver||gameWon)){
        location.reload();
    }
});
document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});
function hit(a,b){
    return a.x<b.x+b.width&&
    a.x+a.width>b.x&&
    a.y<b.y+b.height&&
    a.y+a.height>b.y;
}
function resetPlayer(){
    player.x=60;
    player.y=345;
    player.velocityY=0;
    player.jumping=false;
}
function loseLife(){
    if(Date.now()<invulnerableUntil||gameOver)return;
    lives--;
    invulnerableUntil=Date.now()+1000;
    hurtUntil=Date.now()+500;
    if(livesText)livesText.textContent=lives;
    if(lives<=0){
        gameOver=true;
    }else{
        resetPlayer();
    }
}
function updateMovingPlatforms(){
    movingPlatforms.forEach(p=>{
        const oldX=p.x;
        const oldY=p.y;
        if(p.baseX!==undefined){
            p.x=p.baseX+Math.sin(Date.now()*p.speed/1000)*p.range;
        }
        if(p.baseY!==undefined){
            p.y=p.baseY+Math.sin(Date.now()*p.speed/1000)*p.range;
        }
        const standingOn=
            player.x+player.width>oldX&&
            player.x<oldX+p.width&&
            Math.abs(player.y+player.height-oldY)<8&&
            player.velocityY>=0;

        if(standingOn){
            player.x+=p.x-oldX;
            player.y+=p.y-oldY;
        }
    });
}
function updateMovingEnergies(){
    energies[4].x=movingPlatforms[0].x+movingPlatforms[0].width/2;
    energies[4].y=movingPlatforms[0].y-25;

    energies[5].x=movingPlatforms[1].x+movingPlatforms[1].width/2;
    energies[5].y=movingPlatforms[1].y-25;
}
function checkPlatformCollision(p){
    if(
        hit(player,p)&&
        player.velocityY>=0&&
        player.y+player.height-player.velocityY<=p.y+8
    ){
        player.y=p.y-player.height;
        player.velocityY=0;
        player.jumping=false;
    }
}
function update(){
    if(gameOver||gameWon)return;
      updateMovingPlatforms();
      updateMovingEnergies();
      if(keys["ArrowLeft"])player.x-=player.speed;
      if(keys["ArrowRight"])player.x+=player.speed;
    player.velocityY+=.6;
    player.y+=player.velocityY;
    player.jumping=true;
    platforms.forEach(checkPlatformCollision);
    movingPlatforms.forEach(checkPlatformCollision);
     thorns.forEach(thorn=>{
        if(hit(player,thorn))loseLife();
    });
       energies.forEach(e=>{
        if(!e.collected&&hit(player,{
            x:e.x-12,
            y:e.y-12,
            width:24,
            height:24
        })){
            e.collected=true;
            const count=energies.filter(
                item=>item.collected
            ).length;
          if(energyText)energyText.textContent=count+"/6";
        }
    });
    const allEnergy=energies.every(
        item=>item.collected
    );

    if(allEnergy&&hit(player,portal)){
        gameWon=true;
    }

    if(player.y>canvas.height+40){
        loseLife();
    }

    if(player.x<0)player.x=0;

    if(player.x+player.width>canvas.width){
        player.x=canvas.width-player.width;
    }
    frame++;
}

function drawPlatform(p){
    ctx.fillStyle=theme==="jungle"?"#704b32":"#c98a42";
    ctx.fillRect(p.x,p.y,p.width,p.height);
  ctx.fillStyle=theme==="jungle"?"#69a83b":"#e8ad55";
    ctx.fillRect(p.x,p.y,p.width,5);
}

function drawThorn(thorn){
    if(images.obstacle.naturalWidth){
        ctx.drawImage(
            images.obstacle,
            thorn.x,
            thorn.y,
            thorn.width,
            thorn.height
        );
    }
}

function drawEnergy(e){
    if(e.collected)return;
    const float=Math.sin(frame*.08)*3;
    const energyColor=theme==="desert"?"#70451f":"#ffd83d";
    const highlightColor=theme==="desert"?"#c89550":"#fff4a3";
    ctx.fillStyle=energyColor;
    ctx.beginPath();
    ctx.arc(e.x,e.y+float,10,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle=highlightColor;
    ctx.beginPath();
    ctx.arc(e.x-3,e.y-3+float,3,0,Math.PI*2);
    ctx.fill();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle=theme==="jungle"?"#bfe5d0":"#f5d39a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    clouds.forEach((cloud,i)=>{
        const img=i%2===0?images.cloud1:images.cloud2;

        if(img.naturalWidth){
            ctx.drawImage(
                img,
                cloud.x,
                cloud.y,
                cloud.w,
                cloud.h
            );
        }
    });

    platforms.forEach(drawPlatform);
    movingPlatforms.forEach(drawPlatform);

    thorns.forEach(drawThorn);
    energies.forEach(drawEnergy);

    if(images.portal.naturalWidth){
        ctx.drawImage(
            images.portal,
            portal.x,
            portal.y,
            portal.width,
            portal.height
        );
    }
    let currentImage=playerImage;

    if(gameWon&&images.cheer.naturalWidth){
        currentImage=images.cheer;
    }else if(Date.now()<hurtUntil&&images.hurt.naturalWidth){
        currentImage=images.hurt;
    }else if(player.jumping&&images.jump.naturalWidth){
        currentImage=images.jump;
    }else if(
        (keys["ArrowLeft"]||keys["ArrowRight"])&&
        images.action1.naturalWidth
    ){
        currentImage=
            frame%20<10?
            images.action1:
            images.action2;
    }else if(images.idle.naturalWidth){
        currentImage=images.idle;
    }

    if(currentImage.naturalWidth){

        if(Date.now()<invulnerableUntil&&frame%10<5){
            ctx.globalAlpha=.45;
        }

        ctx.drawImage(
            currentImage,
            player.x,
            player.y,
            player.width,
            player.height
        );

        ctx.globalAlpha=1;
    }

    if(gameOver||gameWon){
        ctx.fillStyle="rgba(0,0,0,.65)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle="#fff";
        ctx.textAlign="center";
        ctx.font="bold 38px Arial";

        ctx.fillText(
            gameWon?"LEVEL COMPLETE!":"GAME OVER",
            canvas.width/2,
            220
        );
        ctx.font="20px Arial";
        ctx.fillText(
            gameWon?
            "You reached the exit portal!":
            "Press R to try again",
            canvas.width/2,
            260
        );

        ctx.textAlign="left";
    }
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

if(exitGame){
    exitGame.addEventListener("click",()=>{
        window.location.href="index.html";
    });
}

gameLoop();