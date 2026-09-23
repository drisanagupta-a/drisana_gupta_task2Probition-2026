const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
const energyText=document.getElementById("energy");
const livesText=document.getElementById("lives");
const exitGame=document.getElementById("exitGame");

const selectedCharacter=localStorage.getItem("selectedCharacter")||"vinnie";
const theme=selectedCharacter==="vinnie"?"jungle":"desert";
document.body.style.background=theme==="jungle"?"#ffebf7":"#fff0d2";

const backgroundMusic=new Audio("assets/audio/background.mp3");
const energySound=new Audio("assets/audio/energy.mp3");
const gameOverSound=new Audio("assets/audio/gameover.mp3");

backgroundMusic.loop=true;
backgroundMusic.volume=0.12;
energySound.volume=0.7;
gameOverSound.volume=0.7;

let audioUnlocked=false;

function unlockAudio(){
    if(audioUnlocked)return;
    audioUnlocked=true;

    backgroundMusic.play().catch(()=>{});

    energySound.play().then(()=>{
        energySound.pause();
        energySound.currentTime=0;
    }).catch(()=>{});

    gameOverSound.load();
}

document.addEventListener("click",unlockAudio,{once:true});
document.addEventListener("keydown",unlockAudio,{once:true});

const playerImage=new Image();

playerImage.src=selectedCharacter==="benny"
    ?"assets/images/benny.png"
    :"assets/images/vinnie.png";

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
    jumping:false,
    grounded:true,
    standingOn:null
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
    {x:140,y:350,width:150,height:20},
    {x:330,y:290,width:150,height:20},
    {x:520,y:350,width:130,height:20},
    {x:680,y:250,width:150,height:20},
    {x:800,y:110,width:170,height:20}
];

const movingPlatforms=[
    {
        x:210,
        y:220,
        width:110,
        height:20,
        baseX:210,
        range:70,
        speed:.7
    },
    {
        x:600,
        y:155,
        width:110,
        height:20,
        baseY:155,
        range:35,
        speed:.6
    }
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
    {x:195,y:325,width:35,height:25},
    {x:430,y:265,width:35,height:25},
    {x:610,y:325,width:35,height:25},
    {x:795,y:225,width:35,height:25}
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

energyText.textContent="0/6";
livesText.textContent="3";

document.addEventListener("keydown",e=>{
    const k=e.key.toLowerCase();

    if(k==="a"||k==="d"){
        keys[k]=true;
        e.preventDefault();
    }

    if(k==="w"&&!gameOver&&!gameWon&&player.grounded){
        player.velocityY=-13;
        player.jumping=true;
        player.grounded=false;
        player.standingOn=null;
        e.preventDefault();
    }

    if(k==="r"&&(gameOver||gameWon)){
        location.reload();
    }
});

document.addEventListener("keyup",e=>{
    const k=e.key.toLowerCase();

    if(k==="a"||k==="d"){
        keys[k]=false;
        e.preventDefault();
    }
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
    player.grounded=true;
    player.standingOn=null;
}

function loseLife(){
    if(Date.now()<invulnerableUntil||gameOver)return;

    lives--;
    invulnerableUntil=Date.now()+1000;
    hurtUntil=Date.now()+500;
    livesText.textContent=lives;

    if(lives<=0){
        gameOver=true;
        gameOverSound.currentTime=0;
        gameOverSound.play().catch(()=>{});
    }else{
        resetPlayer();
    }
}

function updateMovingPlatforms(){
    movingPlatforms.forEach(p=>{
        const oldX=p.x;
        const oldY=p.y;

        if(p.baseX!==undefined){
            p.x=p.baseX+
                Math.sin(Date.now()*p.speed/1000)*p.range;
        }

        if(p.baseY!==undefined){
            p.y=p.baseY+
                Math.sin(Date.now()*p.speed/1000)*p.range;
        }

        if(player.standingOn===p){
            player.x+=p.x-oldX;
            player.y+=p.y-oldY;
        }
    });
}

function updateMovingEnergies(){
    energies[4].x=movingPlatforms[0].x+55;
    energies[4].y=movingPlatforms[0].y-25;

    energies[5].x=movingPlatforms[1].x+55;
    energies[5].y=movingPlatforms[1].y-25;
}
   function checkStaticPlatformCollision(p,oldY,oldX){
    const oldBottom=oldY+player.height;
    const bottom=player.y+player.height;

    const touching=
        player.x+player.width>p.x&&
        player.x<p.x+p.width;

    const landing=
        player.velocityY>=0&&
        oldBottom<=p.y&&
        bottom>=p.y;

    const ground=p===platforms[0];

    const leftEntry=
        oldX<p.x+30;

    const alreadyOn=
        player.standingOn===p;

    if(
        ground&&
        touching&&
        landing
    ){
        player.y=p.y-player.height;
        player.velocityY=0;
        player.jumping=false;
        player.grounded=true;
        player.standingOn=p;
    }
    else if(
        !ground&&
        touching&&
        landing&&
        (leftEntry||alreadyOn)
    ){
        player.y=p.y-player.height;
        player.velocityY=0;
        player.jumping=false;
        player.grounded=true;
        player.standingOn=p;
    }
} 
function checkMovingPlatformCollision(p,oldY){
    const oldBottom=oldY+player.height;
    const bottom=player.y+player.height;

    const touching=
        player.x+player.width>p.x&&
        player.x<p.x+p.width;

    const landing=
        player.velocityY>=0&&
        oldBottom<=p.y&&
        bottom>=p.y;

    if(touching&&landing){
        player.y=p.y-player.height;
        player.velocityY=0;
        player.jumping=false;
        player.grounded=true;
        player.standingOn=p;
    }
}


function update(){
    if(gameOver||gameWon)return;

    updateMovingPlatforms();
    updateMovingEnergies();

    if(keys.a)player.x-=player.speed;
    if(keys.d)player.x+=player.speed;

    if(player.standingOn){
        const p=player.standingOn;

        const on=
            player.x+player.width>p.x&&
            player.x<p.x+p.width;

        if(!on){
            player.standingOn=null;
            player.grounded=false;
        }
    }

    const oldY=player.y;
    const oldX=player.x;

    player.grounded=false;

    player.velocityY+=0.6;
    player.y+=player.velocityY;

    platforms.forEach(p=>{
        checkStaticPlatformCollision(p,oldY,oldX);
    });

    movingPlatforms.forEach(p=>{
        checkMovingPlatformCollision(p,oldY);
    });

    thorns.forEach(t=>{
        const bottom=player.y+player.height;

        const touchX=
            player.x+player.width>t.x&&
            player.x<t.x+t.width;

        const touchY=
            bottom>=t.y&&
            bottom<=t.y+t.height+5;

        if(touchX&&touchY){
            loseLife();
        }
    });

    energies.forEach((e,i)=>{
        const near=hit(player,{
            x:e.x-7,
            y:e.y-7,
            width:14,
            height:14
        });

        const correctPlatform=
            i!==5||player.standingOn===movingPlatforms[1];

        if(!e.collected&&near&&correctPlatform){
            e.collected=true;

            const sound=energySound.cloneNode();
            sound.volume=.7;
            sound.play().catch(()=>{});

            energyText.textContent=
                energies.filter(x=>x.collected).length+"/6";
        }
    });

    if(
        energies.every(e=>e.collected)&&
        hit(player,portal)
    ){
        gameWon=true;
    }

    if(player.y>canvas.height+40){
        loseLife();
    }

    if(player.x<0){
        player.x=0;
    }

    if(player.x+player.width>canvas.width){
        player.x=canvas.width-player.width;
    }

    frame++;
}

function drawPlatform(p){
    ctx.fillStyle=
        theme==="jungle"?"#704b32":"#c98a42";

    ctx.fillRect(
        p.x,
        p.y,
        p.width,
        p.height
    );

    ctx.fillStyle=
        theme==="jungle"?"#69a83b":"#e8ad55";

    ctx.fillRect(
        p.x,
        p.y,
        p.width,
        5
    );
}

function drawThorn(t){
    if(images.obstacle.naturalWidth){
        ctx.drawImage(
            images.obstacle,
            t.x,
            t.y,
            t.width,
            t.height
        );
    }
}

function drawEnergy(e){
    if(e.collected)return;

    const f=Math.sin(frame*.08)*3;

    ctx.fillStyle=
        theme==="desert"?"#70451f":"#ffd83d";

    ctx.beginPath();

    ctx.arc(
        e.x,
        e.y+f,
        10,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.fillStyle=
        theme==="desert"?"#c89550":"#fff4a3";

    ctx.beginPath();

    ctx.arc(
        e.x-3,
        e.y-3+f,
        3,
        0,
        Math.PI*2
    );

    ctx.fill();
}

function draw(){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle=
        theme==="jungle"?"#bfe5d0":"#f5d39a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    clouds.forEach((c,i)=>{
        const img=i%2?
            images.cloud2:
            images.cloud1;

        if(img.naturalWidth){
            ctx.drawImage(
                img,
                c.x,
                c.y,
                c.w,
                c.h
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

    let img=playerImage;

    if(gameWon&&images.cheer.naturalWidth){
        img=images.cheer;
    }else if(
        Date.now()<hurtUntil&&
        images.hurt.naturalWidth
    ){
        img=images.hurt;
    }else if(
        player.jumping&&
        images.jump.naturalWidth
    ){
        img=images.jump;
    }else if(
        (keys.a||keys.d)&&
        images.action1.naturalWidth
    ){
        img=frame%20<10?
            images.action1:
            images.action2;
    }else if(images.idle.naturalWidth){
        img=images.idle;
    }

    if(img.naturalWidth){
        if(
            Date.now()<invulnerableUntil&&
            frame%10<5
        ){
            ctx.globalAlpha=.45;
        }

        ctx.drawImage(
            img,
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
            gameWon?
            "LEVEL COMPLETE!":
            "GAME OVER",
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