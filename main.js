
//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

con.mozimageSmoothingEnabled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;
con.font = "20px 'Century Gothic'";

//フィールド（仮想画面）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;
vcon.font = "12px 'Century Gothic'";

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//
let gameOver = false;
let score = 0;
let gameClear = false;

//
let bossHP = 0;
let bossMHP = 0;

//ダメージカウント
let damageCount = 0;

//星の実態
//let star=[];

//キーボードの状態
let key=[];

//オブジェクト
let teki=[];
let teta=[];
let tama=[];
//let expl=[];
let jiki = new Jiki();

//ファイル読み込み
let spriteImage = new Image();
spriteImage.src = "sprite1.png";

//ゲーム初期化
function gameInit(){
  //for( let i = 0; i<STAR_MAX; i++) star[i] = new Star();
  setInterval( gameLoop, GAME_SPEED );

}

//オブジェクトをアップデート
function updateObj( obj ){
  for( let i = obj.length-1; i>=0; i--) {
    obj[i].update();
    //splite(配列, 何個消すか)
    if(obj[i].kill) obj.splice( i,1 );
  }
}

//オブジェクトを描画
function drawObj( obj ){
  for( let i = 0; i<obj.length; i++) obj[i].draw();
}


//移動の処理
function updateAll(){

  //updateObj(star);
  updateObj(tama);
  updateObj(teta);
  updateObj(teki);
  //updateObj(expl);
  if(!gameOver) jiki.update();
}

  let img = new Image();
  img.src = "hatake.jpg";


//描画の処理
function drawAll(){

  //vcon.fillStyle = (jiki.damage)?"red":"black";
  vcon.drawImage(img, 0, 0, 500, 500);
  //vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);

  //drawObj( star );
  drawObj( tama );
  if(!gameOver) jiki.draw();
  drawObj( teki );
  //drawObj( expl );
  drawObj( teta );

  //自機の範囲　０～FIELD_W
  //カメラの範囲　０～（FIELD_W　-　ZCREEN_W）
  camera_x = Math.floor((jiki.x>>8) / FIELD_W * (FIELD_W - SCREEN_W));
  camera_y = Math.floor((jiki.y>>8) / FIELD_H * (FIELD_H - SCREEN_H));

  //ボスのHPを表示する

  if( bossHP > 0){
    let sz = (SCREEN_W-20) * bossHP / bossMHP;
    let sz2 = (SCREEN_W-20);

    vcon.fillStyle="rgba(255,0,0,0.5)";
    vcon.fillRect(camera_x+10, camera_y+10, sz, 10);
    vcon.strokeStyle="rgba(255,0,0,0.9)";
    vcon.strokeRect(camera_x+10, camera_y+10, sz2, 10);

  }

  //スコア表示

  vcon.fillStyle = "white";
  vcon.fillText("守った回数　"+score,camera_x+10,camera_y+54 );
  vcon.fillText("荒らされた回数　"+damageCount,camera_x+10,camera_y+74 );


  //仮想画面から実際のキャンバスにコピー
  con.drawImage( vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H );

}

//情報の表示
function putInfo(){
  con.fillStyle = "white";

  if( gameOver ){
    let s = "畑を荒らされちゃった　．．．";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20;
    con.fillText(s,x,y);


    s = "あなたが畑を守ったのは、"+score+" 回です!";
    w = con.measureText(s).width;
    x = CANVAS_W/2 - w/2;
    y = CANVAS_H/2 - 20+30;
    con.fillText(s,x,y);


  setInterval(countup(), GAME_SPEED); //1秒毎にcountup()を呼び出し

  }

  if( gameClear ){
    let s = "あなたは "+score+" 回畑を守れました ♡";
    let w = con.measureText(s).width;
    let x = CANVAS_W/2 - w/2;
    let y = CANVAS_H/2 - 20;
    con.fillText(s,x,y);
    //con.fillText("あなたは "+score+" 回畑を守れました ♡",CANVAS_W/2,CANVAS_H/2);
  }

  if(DEBUG){
    drawCount++;
    if( lastTime +1000 <= Date.now()){
      fps = drawCount;
      drawCount = 0;
      lastTime = Date.now();
    }

    con.fillText("FPS:"+fps,20,20);
    con.fillText("Tama:"+tama.length,20,40);
    con.fillText("Teki:"+teki.length,20,60);
    con.fillText("Teta:"+teta.length,20,80);
    //con.fillText("Expl:"+expl.length,20,100);
    con.fillText("X:"+(jiki.x>>8),20,120);
    con.fillText("Y:"+(jiki.y>>8),20,140);
    con.fillText("HP:"+jiki.hp,20,160);
    con.fillText("SCORE:"+score,20,180);
    con.fillText("COUNT:"+gameCount,20,200);
    con.fillText("WAVE:"+gameWave,20,220);
    con.fillText("Timer:"+countTimer,20,240);
    con.fillText("Count:"+damageCount,20,260);
    con.fillText("BOSS:"+bossHP,20,280);
  }
}

var countTimer = 0;

function countup(){
  countTimer++;
  //ここにクリア画面
  if(countTimer==60*5)location.href = "https://www.google.com";
  //console.log(countTimer);
}

function clear1(){
  countTimer++;
  //ここに荒らされた数が3以下のクリア画面
  if(countTimer==60*5)location.href = "https://www.yahoo.co.jp/";
  //console.log(countTimer);
}

function clear2(){
  countTimer++;
  //ここに６以下のクリア画面
  if(countTimer==60*5)location.href = "https://www.goo.ne.jp/";
  //console.log(countTimer);
}

function clear3(){
  countTimer++;
  //ここに７以上のクリア画面
  if(countTimer==60*5)location.href = "https://www.biglobe.ne.jp/";
  //console.log(countTimer);
}


let gameCount = 0;
let gameWave  = 0;
let gameRound = 0;

//ゲームループ
function gameLoop(){

  gameCount++;


  if( gameWave == 0 ){

    if( rand(0,40)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 0, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      gameWave++;
      gameCount = 0;
    }

  }else if( gameWave == 1 ){

    if( rand(0,20)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 0, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      gameWave++;
      gameCount = 0;
    }

  }else if( gameWave == 2 ){

    if( rand(0,15)==1 ){
      // 1/30で敵をだす
      teki.push( new Teki( 1, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      gameWave++;
      gameCount = 0;
    }

  }else if( gameWave == 3 ){

    if( rand(0,10)==1 ){
      // 1/30で敵をだす
      let r = rand(0,1);
      teki.push( new Teki( r, rand(0, FIELD_W)<<8, 0, 0, rand(300, 1200) ) )
    }

    if( gameCount > 60 * 10){
      gameWave++;
      gameCount = 0;

      if(damageCount>=11){
        gameOver = true;
      } else {
        teki.push( new Teki( 2, (FIELD_W/2)<<8, -(70<<8), 0, 200 ) );
      }
    }

  }else if( gameWave == 4 ){

    if( rand(0,15)==1 ){
    }

    if( teki.length == 0 ){
      gameWave++;
      gameCount = 0;

    }
  }else if( gameWave == 5){

    if( bossHP!=0 ){
      gameOver = true;
    } else {
      gameClear = true;

      if(damageCount<=3){
        setInterval(clear1(), GAME_SPEED);
      } else if(damageCount>3 && damageCount<=7){
        setInterval(clear2(), GAME_SPEED);
      } else {
        setInterval(clear3(), GAME_SPEED);
      }
    }

    // location.href = "https://www.google.com";

  }

  updateAll();
  drawAll();
  putInfo();

}

//オンロードでゲーム開始
window.onload = function(){
  gameInit();
}
