//主类，用来初始化以及保存获取到的数据
import {whiteBoard} from './constants/image.js';
import {contentInit,protote,_$,$,canvasDemoInit,getJSON, canvasICOInit} from './constants/config.js'

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
    //基础设定
    {
      this.state = false;   //设定当前操作选项
      this.stateType = 'image';    //设定当前为图像还是视频操作
      this.reduceWidth = 1;    //侧边栏的展开个数
      this.dialog = null;    //当前打开的dialog
    }
    //图像设定
    {
      this.stateFrom = false;    //true为透明，false为画板 设置画板背景是否透明
      this.toolCurrent = null;  //设定当前工具
      this.penstate = false;   //直线绘制判断
      this.ImageData = [];  //保存每一次绘制的图像
      this.forwardData = [];  //保存每一次回撤前的图像
      this.imgIndex = 1;    //当前页面模板图片所在页数
      this.operationstorage = [];   //保存操作
      //基础画布设定
      {
        this.imageAttribute = Array.from({length:4},x=>0); //分别为图像长宽与起使点
        this.saveImageData = null;      //当前保存的base64文件
      }
      //操作画布设定
      {
        this.directionIndex = 0;  //设定操作画布当前朝向
        this.direction = [ 'upper','right','lower','left' ];  //设定当前操作画布朝向
        this.imageRecord = { w:0, h:0 };    //保存导入图片的数据
        this.centralPoint = { x1:-1 , y1:-1 , x2:-1 , y2:-1 };  //图像翻转坐标记录
        this.textDottedLine = { clinet:{x:0,y:0},clinetTo:{x:0,y:0} };  //文本的坐标记录
        this.jq = Array.from({length:4},x=>0); //分别为长宽与起使点

        this.againImageData = null;   //保存需要剪切的图片
      }
      //工具设定
      {
        this.xpcICO = null;   //保存橡皮擦的base编码鼠标图片
        this.hbICO = null;    //保存画笔的base编码鼠标图片

        this.mainpanelState = null;     //当前点击的形状
        this.imageStatus = 'stroke';    //判断图形是填充还是轮廓
        this.yqtintensity = 30;    //油漆桶力度 
        this.pensize = 6;  //初始化画笔大小
        this.strokeColor = '#000000';    //初始化画笔颜色
        this.eraserSize = 6;    //橡皮擦大小    
        this.rotateIF = false;    //判断当前是否翻转
        this.fontSize = 16;     //字体大小
        this.fontFamily = 'sans-serif';   //字体样式
        this.fontWeight = '400';    //字体粗细
        this.textStyle = '1';   //判断当前是否填充
      }
    }
    //视频设定
    {
      this.fps = 60;  //当前gif图帧数
      this.worker = {};    //导入gif.js的多线程
      this.haole = false;    //判断当前视频是否是第一次加载
      this.base = false;    //视频录制状态
      this.videoData = { w:0, h:0 };     //保存视频修改尺寸信息
      this.videoInitial = { height:0, width:0 };      //保存视频基础尺寸信息
      this.proportion = 1;    //视频与画布缩小比例
      this.videoTimedate = {};      //保存视频时间点
      this.saveto = [];   //保存视频截取的base64编码图片数组
      this.progressoafter = $("#progressoafter")[0];    //绑定进度条
      this.videoTimedisplay = $(".timedisplay");    //绑定视频时间显示  
      this.progressobarWidth = 0;   //进度条长度
      this.videoIndex = "video";   //判断当前canvas播放类型video表示映射视频，canvas表示映射图片数组
      //文字设定
      {
        this.barrage = null;   //弹幕参数
        this.barrageType = '逆轴滚动弹幕';    //滚动形式
        this.barrageSpeed = 5;    //当前滚动速度
        this.barrageData = [];    //保存所有弹幕
        this.barrForwardData = [];    //保存撤回的弹幕
        this.timeto = setInterval(null,1000);  //设定定时闪烁的提示
        this.videoBarragePlot = { x: -1, y : -1 };    //弹幕画布坐标系统
        this.bottomDistance = 5;  //字幕距离底边的距离
        this.textValue = null;  //记录textarea输入框的输入内容
      }
    }
    
  }
  //初始化canvas画布
  canvasInit(){
    //设定canvas所在的盒模型大小
    const parentNode = $('#contains')[0];

    const content = $('#content')[0];
    const contentW = Math.floor(content.getBoundingClientRect().width) - 8 ;
    const contentH = Math.floor(content.getBoundingClientRect().height) - 5 ;

    contentInit(content,contentH,contentW);
    const footerspan = Array.from($('footer>span'));
    footerspan[0].innerHTML = contentW,footerspan[1].innerHTML = contentH;

    $('#main-content')[0].className = 'items-class';

    this.nodePlot = { x:contentW/2,y:contentH/2 };

    //设定图片canvas
    this.canvasVideo = document.createElement('canvas');
    this.canvasVideoCtx = canvasDemoInit(this.canvasVideo,contentW,contentH,'absolute','1000');

    //设定字幕canvas
    this.canvasSubtitle = document.createElement('canvas');
    this.canvasSubtitleCtx = this.canvasSubtitle.getContext('2d');
    //this.canvasSubtitleCtx = canvasDemoInit(this.canvasSubtitle,contentW,contentH,'absolute','1001');

    // //设定背景图canvas
    this.canvasBackground = document.createElement('canvas');
    //this.canvasBackground.className = 'canvasStyle';
    this.canvasBackground.style.border = '2px solid #f1f1f1'
    this.canvasBackgroundCxt = canvasDemoInit(this.canvasBackground,contentW,contentH,'absolute','-1');

    //设置录像canvas.
    this.canvasVideoTape = document.createElement('canvas');
    this.canvasVideoTapeCtx = this.canvasVideoTape.getContext('2d');

    //设置操作画布
    this.canvasDemo = document.createElement('canvas');
    //this.canvasDemo.className = 'canvasStyle';
    this.canvasDemoCtx = canvasDemoInit(this.canvasDemo,contentW,contentH,'absolute','1');

    //设置视频文字映射画布
    this.canvasTextMapping = document.createElement('canvas');
    //this.canvasTextMapping.className = 'canvasStyle';
    this.canvasTextMappingCtx = canvasDemoInit(this.canvasTextMapping,contentW,contentH,'absolute','0');

    //图标保存画布
    this.canvasICO = document.createElement('canvas');
    this.canvasICOctx = this.canvasICO.getContext('2d');

    this.xpcICO = canvasICOInit(this.canvasICO, this.canvasICOctx, this.eraserSize, this.eraserSize, 'xpc');
    this.hbICO = canvasICOInit(this.canvasICO, this.canvasICOctx, this.pensize * 2, this.pensize * 2, 'hb', this.pensize);

    parentNode.appendChild(this.canvasVideo);
    parentNode.appendChild(this.canvasBackground);
    parentNode.appendChild(this.canvasTextMapping);
    parentNode.appendChild(this.canvasDemo);
    //parentNode.appendChild(this.canvasSubtitle);

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
    this.imagedatasave = { w:this.width, h:this.height };
    this.canvasVideoCtx.lineCap = 'butt';   //设置线条末端样式。
    this.canvasDemoCtx.lineCap = 'butt';   //设置线条末端样式。
    this.canvasVideoCtx.lineJoin = 'butt';  //设定线条与线条间接合处的样式。
    this.canvasDemoCtx.lineJoin = 'butt';  //设定线条与线条间接合处的样式。
    this.canvasVideoCtx.lineWidth = this.pensize;
    this.canvasDemoCtx.lineWidth = this.pensize;

    this.canvasVideoCtx.fillStyle = this.strokeColor;
    this.canvasDemoCtx.fillStyle = this.strokeColor;
    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
  }
  
  //设置初始图片
  lableFound(){
    const that = this;
    whiteBoard.call(this,this.canvasBackgroundCxt);
    whiteBoard.call(this,this.canvasVideoCtx);
    this.backstageVideo = document.createElement('video');
    this.backstageVideo.style.position = 'absolute';
    this.backstageVideo.style.zIndex = -20;
    $('#contains')[0].appendChild(this.backstageVideo);
    this.initialImg = new Image();
    this.initialImg.setAttribute('crossOrigin', 'anonymous')
    getJSON(`/submit`).then(function(e){
      let expressionModel = JSON.parse(e) || [];
      const selectModel = _$('select[title=默认模板]');
      for(let i of expressionModel){
        let optionModel = document.createElement('option');
        optionModel.value = i.cate2;
        optionModel.innerHTML = i.cate2;
        selectModel.appendChild(optionModel);
      }
    })
  }
}
