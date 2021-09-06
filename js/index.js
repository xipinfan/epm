//主类，用来初始化以及保存获取到的数据
import {contrast,whiteBoard} from './constants/image.js';
import {contentInit,protote,$,canvasDemoInit} from './constants/config.js'

'use strict';

export class Tools{  
  constructor(){
    this.init();
  }
  //初始化 
  init(){
    this.dataInit();
    this.canvasInit();
    this.labelInit();
    this.lableFound();
  }
  dataInit(){
    protote();  //设定原型链
    this.state = false;   //设定当前操作选项
    this.stateType = '';    //设定当前为图像还是视频操作

    this.direction = [ 'upper','right','lower','left' ];  //设定操作画布朝向
    this.directionIndex = 0;  //设定操作画布当前朝向
    this.toolCurrent = '';  //设定当前工具

    this.pensize = 6;  //初始化画笔大小
    this.strokeColor = '#000000';    //初始化画笔颜色
    this.penstate = false;   //直线绘制判断
    this.ImageData = [];  //保存每一次绘制的图像
    this.forwardData = [];  //保存每一次回撤前的图像
    this.centralPoint = { x1:-1 , y1:-1 , x2:-1 , y2:-1 };  //图像翻转坐标记录
    this.textDottedLine = {};  //文本的坐标记录
    this.textValue = '';  //记录textarea输入框的输入内容
    this.typebullet = 'top';
    this.timeto = setInterval(null,1000);  //设定定时闪烁的提示

    this.eraserStrength = 0.7;
    this.eraserSize = 3;

    this.demo1 = '';
    this.mainpanelState = '';

    this.dialog = undefined;

    this.tool = [  //工具初始化
      'pencil',   //画笔工具
      'line',   //直线工具
      'brush',  //刷子工具
      'eraser',   //橡皮擦工具
      'rectangle',//矩形工具
      'round',  //圆形工具
      'bucket',   //油漆桶
      'extract',  //颜色提取器
      'rightTriangle',//直角三角形
      'isosceles',  //等腰三角形
      'diamond',    //菱形
      'text',     //文本工具
      'shear',     //剪切
    ];
    
    this.progressobarWidth = $('#player')[0].getBoundingClientRect().width;
  }
  //初始化canvas画布
  canvasInit(){
    //设定canvas所在的盒模型大小
    let parentNode = $('#contains')[0];

    let content = $('#content')[0];
    let contentW = Math.floor(content.getBoundingClientRect().width) - 8 ;
    let contentH = Math.floor(content.getBoundingClientRect().height) - 5 ;

    contentInit(content,contentH,contentW);
    let footerspan = Array.from($('footer>span'));
    footerspan[0].innerHTML = contentW,footerspan[1].innerHTML = contentH;

    $('#main-content')[0].className = 'items-class';

    this.nodePlot = { x:contentW/2,y:contentH/2 };

    //设定图片canvas
    this.canvasVideo = document.createElement('canvas');
    this.canvasVideoCtx = canvasDemoInit(this.canvasVideo,contentW,contentH,'absolute','1000');

    //设定字幕canvas
    this.canvasSubtitle = document.createElement('canvas');
    this.canvasSubtitle.style.zIndex = '1001';
    this.canvasSubtitleCtx = this.canvasSubtitle.getContext('2d');

    // //设定背景图canvas
    this.canvasBackground = document.createElement('canvas');
    this.canvasBackground.className = 'canvasStyle';
    this.canvasBackground.style.border = '2px solid #f1f1f1'
    this.canvasBackgroundCxt = canvasDemoInit(this.canvasBackground,contentW,contentH,'absolute','-1');

    //设置录像canvas.
    this.canvasVideoTape = document.createElement('canvas');
    this.canvasVideoTapeCtx = this.canvasVideoTape.getContext('2d');

    //设置操作画布
    this.canvasDemo = document.createElement('canvas');
    this.canvasDemo.className = 'canvasStyle';
    this.canvasDemoCtx = canvasDemoInit(this.canvasDemo,contentW,contentH,'absolute','1');

    parentNode.appendChild(this.canvasVideo);
    parentNode.appendChild(this.canvasBackground);
    parentNode.appendChild(this.canvasDemo);

    this.textarea = document.createElement('textarea');  //隐藏输入文本框
    this.textarea.style.opacity = 0;  //透明度为0，直接就行隐藏
    this.textarea.style.zIndex = -999;  //藏在画布地下
    this.textarea.style.position = 'absolute';  //绝对定位
    parentNode.appendChild(this.textarea);
  }

  //canvasCtx初始化，获取其宽高
  labelInit(){
    this.width=this.canvasVideo.width;
    this.height=this.canvasVideo.height;
    this.canvasVideoCtx.lineCap = 'round';   //设置线条末端样式。
    this.canvasDemoCtx.lineCap = 'round';   //设置线条末端样式。
    this.canvasVideoCtx.lineJoin = 'round';  //设定线条与线条间接合处的样式。
    this.canvasDemoCtx.lineJoin = 'round';  //设定线条与线条间接合处的样式。
    this.canvasVideoCtx.lineWidth = this.pensize;
    this.canvasDemoCtx.lineWidth = this.pensize;

    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
  }
  
  //设置初始图片
  lableFound(){
    whiteBoard.call(this,this.canvasBackgroundCxt);
    whiteBoard.call(this,this.canvasVideoCtx);
    this.backstageVideo = document.createElement('Video');
    this.initialImg = new Image();

    // this.initialImg.src = './fonts/hkd.png';
    // this.initialImg.onload = function(){
    //   let node = contrast.call(that,that.initialImg.width,that.initialImg.height);
    //   let x = that.width/2-node.a/2, y = that.height/2-node.b/2;
    //   that.canvasVideoCtx.drawImage(that.initialImg,0,0,that.initialImg.width,that.initialImg.height,x,y,node.a,node.b); 
    // }
  }
}
