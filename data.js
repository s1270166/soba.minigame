//
// data.js
//

//敵マスター
class TekiMaster{
  constructor( tnum, r, hp, score ){
    this.tnum = tnum;
    this.r = r;
    this.hp = hp;
    this.score = score;
  }
}

let tekiMaster=[
  new TekiMaster( 0, 10, 1, 1), //0,ピンクひよこ
  new TekiMaster( 1, 10, 1, 1), //1,きいろひよこ
  new TekiMaster( 2, 70, 2000, 100), //1,ボスきいろひよこ
]

//スプライトクラス
class Sprite{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

//スプライト(xの開始座標,　yの開始座標, 横(x)の長さ, 縦(y)の長さ)
let sprite = [
  new Sprite(0,0,50,67), //0 ,ばあさん
  new Sprite(50,0,6,6),  //1 ,に
  new Sprite(57,0,6,6),  //2 ,し
  new Sprite(65,0,5,6),  //3 ,ゃ
  new Sprite(71,0,61,31), //4 ,いのしし
  new Sprite(74,38,45,34), //5 ,きじ
  new Sprite(122,0,136,156), //6 ,くま
];
