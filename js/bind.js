import * as images from './constants/image.js'
import * as videos from './constants/video.js'
import {$, _$, on, checkUrl} from './constants/config.js'
import {Tools} from './index.js'

'use strict';

class Bind extends Tools{
  constructor(){
    super();
    this.baseButtonBind();
    this.animationBind();
    this.canvasVideoBindInit();
    this.canvasDemoBindInit();
  }
  baseButtonBind(){   //初始按键绑定
    const that = this;
    let [warning, inputUrl, saveToImage, saveToGif] = Array.from($('dialog'));
    let panel = Array.from($('template'));
    let mainnav = $('#main-nav>ul>li');

    $('.model-header>span.close, .model-footer>button[value=cancel]').forEach((el)=>{
      on(el,'click',function(){
        that.dialog.close();
      })
    });
    on(_$('#acceptURL'),'click',function(){
      let value = _$('#inputTextUrl1').value;
      if(!value){
        alert('请输入URL');
      }
      else{
        if(checkUrl(value)){
          images.imageinput.call(that,'',value);
          that.dialog.close();
        }
        else{
          alert('该URL不合法');
        }
      }
    })

    on(_$('#acceptWarning'), 'click', function(){
      images.whiteBoard.call(that,that.canvasVideoCtx);
      that.dialog.close();
    })

    on(_$('#acceptImage'),'click',async function(){
      let name = _$('#imageName').value;
      await images.saveImag(that.demo1,name);
      that.dialog.close();
    })

    on(_$('input[name=ImageFile]'), 'change', function(e){
      images.imageinput.call(that,e);
    });

    on(_$('input[name=VideoFile]'), 'change', function(){
      videos.openCanvasVideo.call(that);
    });

    $('#file>li').forEach((index)=>{  //文件操作绑定
      switch(index.id){
        case 'openImageFile':{  //打开图片文件
          on(index, 'click', function(){
            _$('input[name=ImageFile]').click();
          })
          break;
        }
        case 'openVideoFile':{  //打开视频文件
          on(index, 'click', function(){
            _$('input[name=VideoFile]').click();
          })
          break;
        }
        case 'openUrl':{  //从URL打开
          this.dialogBind(index, inputUrl);
          break;
        }
        case 'saveImage':{  //保存图片
          this.dialogBind(index, saveToImage);
          break;
        }
        case 'saveGIFImage':{  //保存GIF图
          this.dialogBind(index, saveToGif);
          break;
        }
      }
    });
    $('#shape>li').forEach((index)=>{  //形状操作绑定
      switch(index.id){
        case 'pencil':{ //铅笔
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[2],panel[2],that.node,'画笔',that);
          })
          break;
        }
        case 'line':{   //直线
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[0].click();
          })
          break;
        }
        case 'brush':{  //刷子
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[2],panel[2],that.node,'画笔',that);
          })
          break;
        }
        case 'round':{  //圆
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[1].click();
          })
          break;
        }
        case 'rectangle':{  //矩形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[2].click();
          })
          break;
        }
        case 'rightTriangle':{  //直角三角形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[3].click();
          })
          break;
        }
        case 'isosceles':{  //等腰三角形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[4].click();
          })
          break;
        }
        case 'diamond':{  //菱形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具',that);
            }
            
            $('#xzgj-panel>div')[5].click();
          })
          break;
        }
      }
    });
    $('#tool>li').forEach((index)=>{  //工具操作绑定
      switch(index.id){
        case 'eraser':{ //橡皮擦
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[5],panel[5],that.node,'橡皮擦',that);
          })
          break;
        }
        case 'bucket':{ //油漆桶
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[4],panel[4],that.node,'油漆桶',that);
          })
          break;
        }
        case 'text':{   //文本
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[6],panel[6],that.node,'文本工具',that);
          })
          break;
        }
        case 'shear':{  //剪切
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[1],panel[1],that.node,'剪切',that);
          })
          break;
        }
        case 'extract':{  //颜色提取器
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[3],panel[3],that.node,'拾色器',that);
          })
          break;
        }
      }
    })
    $('#image>li').forEach((index)=>{  //图像操作绑定
      switch(index.id){
        case 'white':{  //重置
          this.dialogBind(index, warning);
          break;
        }
      }
    });
    $('#video>li').forEach((index)=>{  //视频操作绑定
      switch(index.id){
        case 'addsubtitle':{  //添加字幕
          break;
        }
        case 'bulletchat':{   //添加弹幕
          break;
        }
        case 'intercept':{  //截取当前帧
          break;
        }
      }
    });
    $('#buttonLayer>input').forEach((index)=>{
      if(index.type === 'text'){

      }
      else{
        switch(index.value){
          case '导入图片':{
            on(index, 'click', function(){
              _$('input[name=ImageFile]').click();
            })
            break;
          }
          case '导入视频':{
            on(index, 'click', function(){
              _$('input[name=VideoFile]').click();
            })
            break;
          }
          case '搜索素材':{
            break;
          }
        }  
      }
      
    })
    $('#toggle>ul>li').forEach(index=>{
      switch(index.title){
        case '工具初始化':{
          on(index, 'click', function(){
            if(that.node && _$('#main-panel').style.display === 'none'){
              that.state = false;
              that.node.className = '';
              that.mainpanelState = '';
              that.canvasVideo.style.cursor = "default";
            }
          })
          break;
        }
        case '撤销':{
          break;
        }
        case '下一步':{
          break;
        }
        case '保存':{
          this.dialogBind(index, saveToImage);
          break;
        }
      }
    });
    mainnav.forEach((index,i)=>{
      on(index, 'click', function(){
        that.node = that.sidebarControl.call(this,panel[i],that.node,this.title,that);
      })
    });
  }
  animationBind(){  //侧边栏动画绑定
    const that = this;
    let control = '';
    let mainPanelcontent = _$('#main-panel-content');
    let PanelOut = _$('#main-panel>span');
    let headerlogo = _$('#header-logo');
    let mainright = _$('#main-right');
    let mainPanel = _$('#main-panel');
    let content = _$('#content');
    $('.toggle-control').forEach((e)=>{
      if(e.title === '展开')control = e;
      e.addEventListener('click',function(){
          console.log(mainright.getBoundingClientRect());
          if(this.title === '缩小'){
              mainright.className = 'mainRightOutAnima';
              headerlogo.className = 'mainRightOutAnima';
          }
          else{
              headerlogo.style.display = 'block';
              mainright.style.display = 'block';
              mainright.className = 'mainRightUpAnima';
              headerlogo.className = 'mainRightUpAnima';
          }
          this.style.display = 'none';
          control.style.display = 'block';
          control = this;
      });
    });

    on(PanelOut, 'click', function(){
      mainPanel.className = 'mainPanelOutAnima';
    });

    mainPanel.addEventListener('webkitAnimationEnd',function(){
      if(this.className == 'mainPanelOutAnima'){
        this.style.display = 'none';
        mainPanelcontent.innerHTML = '';
      }
    });
    mainright.addEventListener('webkitAnimationEnd',function(){
      if(mainright.className == 'mainRightOutAnima'){
        mainright.style.display = 'none';
        headerlogo.style.display = 'none';
      }
    });
  }

  canvasVideoBindInit(){
    const that = this, lastCoordinate = { x: 1, y: 1 };
    on(this.canvasVideo, 'mousedown', function(e){
      if(!that.state)return;
      that.penstate = true;
      switch(that.toolCurrent){
        case 'pen':{
          lastCoordinate.x = e.layerX;
          lastCoordinate.y = e.layerY;
          break;
        }
        case 'pickup':{
          let RGB = images.extractPixels(that.canvasVideoCtx, e.layerX, e.layerY).colorHex().toLowerCase();
          _$('#ssq-color').value = RGB;
          that.colorAssignment(RGB);
          break;
        }
        case 'bucket':{
          let color = _$('#yqt-color').value;
          let intensity = _$('#yqt-power').value;
          let ImageDate = that.canvasVideoCtx.getImageData(0,0,that.width,that.height);
          that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
          images.paintBucket(ImageDate, e.layerX, e.layerY, color, intensity);
          that.canvasVideoCtx.putImageData(ImageDate, 0, 0);
          break;
        }
        case 'eraser':{
          images.eliminate.call(that, e);
          break;
        }
      }
      if(that.toolCurrent !== "bucket"){
        that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
    }
    })
    let drawEndBind = ['mouseup','mouseleave'];
    drawEndBind.forEach(function(item){
      on(that.canvasVideo, item, function(e){
        that.penstate = false;
      })
    })
    on(this.canvasVideo, 'mousemove', function(e){
      if(!that.state || !that.penstate)return;
      switch(that.toolCurrent){
        case 'pen':{
          images.drawLine.call(that, lastCoordinate.x, lastCoordinate.y, e.layerX, e.layerY);
          lastCoordinate.x = e.layerX;
          lastCoordinate.y = e.layerY;
          break;
        }
        case 'eraser':{
          images.eliminate.call(that, e);
          break;
        }
      }
    })
  }

  canvasDemoBindInit(){
    const that = this;
    const firstplot = { x :1, y :1 },   //起使点和结束点
          endplot = { x :1, y: 1},
          beginLine = { x : 1,y : 1},
          endLine = { x : 1,y : 1},
          beginmobile = { x :1, y: 1 },
          endmobile = { x :1, y: 1 };
    let controlnode = true, operation = false, stay;   //判断当前状态
    
    on( this.canvasDemo, 'mousedown', function(e){
      if(!that.state)return;
      if(controlnode){
        beginLine.x = e.layerX;
        beginLine.y = e.layerY;
        that.penstate = true;
      }
      else{
        if(that.toolCurrent === 'line'){
          stay = images.spotLineDistance(beginLine, endLine, { x:e.layerX, y:e.layerY });
        }
        else{
          stay = images.boundary(that.canvasDemo, e, firstplot, endplot);
        }
        if(stay != "default"){
          beginmobile.x = e.layerX;
          beginmobile.y = e.layerY;
          operation = true;
        }
        else{
          that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
          that.toolCurrentJudge(that.canvasVideoCtx, beginLine, endLine, firstplot, endplot);
          that.directionIndex = 0;    //设定翻转和点初始化
          that.centralPoint = { x1:-1 , y1:-1 , x2:-1 , y2:-1 };
        }
      }
    })
    on( this.canvasDemo, 'mouseup', function(e){
      if(that.penstate){
        endLine.x = e.layerX;
        endLine.y = e.layerY;
        if(that.toolCurrent === 'line'){
          that.centralPoint = { x1:beginLine.x , y1:beginLine.y , x2:endLine.x , y2:endLine.y };
          images.lineBox.call(that, beginLine.x, beginLine.y, endLine.x , endLine.y); 
        }
        else{
          [firstplot.x,firstplot.y,endplot.x,endplot.y ] = [Math.min(beginLine.x,endLine.x), 
          Math.min(beginLine.y,endLine.y),Math.max(beginLine.x,endLine.x),Math.max(beginLine.y,endLine.y)];
          that.centralPoint = { x1:firstplot.x , y1:firstplot.y , x2:endplot.x , y2:endplot.y };
          images.dottedBox.call(that, firstplot.x, firstplot.y, endplot.x, endplot.y); 
        }
      }
      if(!operation){
        controlnode = !controlnode;
      }
      that.penstate = false;
      operation = false;
    })
    on( this.canvasDemo, 'mousemove', function(e){
      if(!that.state)return;
      if(controlnode){
        if(!that.penstate)return;
        endLine.x = e.layerX;
        endLine.y = e.layerY;
        if(that.toolCurrent !== 'line'){
          [firstplot.x,firstplot.y,endplot.x,endplot.y ] = [Math.min(beginLine.x,endLine.x), 
          Math.min(beginLine.y,endLine.y),Math.max(beginLine.x,endLine.x),Math.max(beginLine.y,endLine.y)];
        }
        that.toolCurrentJudge(that.canvasDemoCtx, beginLine, endLine, firstplot, endplot);
      }
      else{
        if(that.toolCurrent === 'line'){
          images.mousePointLine(e, beginLine, endLine, that.canvasDemo);
        }
        else{
          images.boundary(that.canvasDemo, e, firstplot, endplot);
        }
        if(operation){
          endmobile.x = e.layerX - beginmobile.x;
          endmobile.y = e.layerY - beginmobile.y;
          beginmobile.x = e.layerX;
          beginmobile.y = e.layerY;
          if(that.toolCurrent === 'line'){
            that.lineJudgment(stay,beginLine, endLine, endmobile )
            that.toolCurrentJudge(that.canvasDemoCtx, beginLine, endLine, firstplot, endplot);
            images.lineBox.call(that, beginLine.x, beginLine.y, endLine.x , endLine.y); 
          }
          else{
            that.directionJudgment(stay,firstplot, endplot, endmobile );
            that.centralPoint = { x1:firstplot.x , y1:firstplot.y , x2:endplot.x , y2:endplot.y };
            that.toolCurrentJudge(that.canvasDemoCtx, beginLine, endLine, firstplot, endplot);
            images.dottedBox.call(that, firstplot.x, firstplot.y, endplot.x, endplot.y);    //虚线提示框
          }
        }
      }
    })
  }

  sidebarControl(template1, node, title,that){    //模板工具绑定
    let mainPaneltitle = _$('#main-panel-title');
    let mainPanelcontent = _$('#main-panel-content');
    let mainPanel = _$('#main-panel');
    mainPaneltitle.innerHTML = title;
    if( mainPanel.style.display === 'none' ){
      if(node && node.title !== this.title){
        node.className = '';
      }
      mainPanel.style.display = 'flex';
      mainPanel.className = 'mainPanelUpAnima';
      this.className = 'active';

      mainPanelcontent.appendChild(template1.content.cloneNode(true));

      xzgjBind();
    }
    else{
      mainPanelcontent.innerHTML = '';
      if(node.title == this.title){
        mainPanel.className = 'mainPanelOutAnima';
      }
      else{
        node.className = '';
        this.className = 'active';
        mainPanelcontent.appendChild(template1.content.cloneNode(true));
        xzgjBind();
      }
    }
    function xzgjBind(){
      that.canvasVideo.style.cursor = "default";
      if(title === '拾色器'){
        that.canvasVideo.style.cursor = "crosshair";
      }
      that.canvasDemo.style.zIndex = -1;
      if(title === '形状工具'){
        let stata = '';
        let xzgj1 = $('#xzgj-panel>div');
        xzgj1.forEach(function(e,index){
          on(e,'click', function(){
            if(stata != this){
              if(stata)stata.style = '';
              this.style.backgroundColor = 'rgb(53, 53, 53)';
              this.style.color = 'white';
              stata = this;
              that.mainpanelState = index;
              that.canvasDemo.style.zIndex = 1001;
              switch(index){
                case 0:{    //直线
                  that.drawStraightLine('line');
                  break;
                }
                case 1:{
                  that.drawStraightLine('round');
                  break;
                }
                case 2:{
                  that.drawStraightLine('rectangle');
                  break;
                }
                case 3:{
                  that.drawStraightLine('rightTriangle');
                  break;
                }
                case 4:{
                  that.drawStraightLine('isosceles');
                  break;
                }
                case 5:{
                  that.drawStraightLine('diamond');
                  break;
                }
              }
            }
          })
        })
        if(xzgj1[that.mainpanelState]){
          xzgj1[that.mainpanelState].click();
        }
      }
      if(title === '重置画板'){
        that.dialogBind(_$('#czhb-panel>div'), _$('#warning'));
      }
      if(title === '画笔'){
        that.paintBrush();
      }
      if(title === '拾色器'){
        that.colorPickup();
      }
      if(title === '油漆桶'){
        that.paintBucket();
      }
      if(title === '橡皮擦'){
        that.rubber();
      }
      if(title === '文本工具'){

      }
    }
    node = this;
    return node;
  }
  dialogBind(index , event){
    const that = this;
    on(index, 'click', function(){
      that.dialog = event;
      that.dialog.showModal();
      if(event.id === 'saveToImage'){
        let canvasTemporarily = images.saveImagMapping.call(that);
        _$('input[id=save-w]').value = canvasTemporarily.width;
        _$('input[id=save-h]').value = canvasTemporarily.height;
        that.demo1 = canvasTemporarily;
      }
    });
  }
  paintBrush(){
    const that = this;
    this.toolCurrent = 'pen';
    this.state = true;
    _$('#hb-size').value = this.pensize;
    _$('#hb-color').value = this.strokeColor;
    on(_$('#hb-size'),'change',function(){
      that.pensize = this.value;
      that.canvasVideoCtx.lineWidth = that.pensize;
      that.canvasDemoCtx.lineWidth = that.pensize;
    })
    on(_$('#hb-color'),'change',function(){
      that.colorAssignment(this.value);
    })
  }
  colorPickup(){
    this.state = true;
    this.toolCurrent = 'pickup';
    _$('#ssq-color').value = this.strokeColor;
  }
  paintBucket(){
    this.state = true;
    this.toolCurrent = 'bucket';
  }
  rubber(){
    const that = this;
    let xpcsize = _$('#xpc-size'),xpcpower = _$('#xpc-power');
    this.state = true;
    this.toolCurrent = 'eraser';
    xpcsize.value = this.eraserSize;
    xpcpower.value = this.eraserStrength;
    on(xpcsize, 'change', function(){
      that.eraserSize = this.value;
    })
    on(xpcpower, 'change', function(){
      that.eraserStrength = this.value;
    })
  }
  drawStraightLine(Current){
    this.state = true;
    this.toolCurrent = Current;
  }
  textTool(){
    const that = this;
    this.state = true;
    this.toolCurrent = 'text';
  }

  lineJudgment(stay, beginLine, endLine, endmobile){
    switch(stay){
      case "core":{
        beginLine.x += endmobile.x;    //移动线段初始或者结束坐标
        beginLine.y += endmobile.y;
        endLine.x += endmobile.x;
        endLine.y += endmobile.y;
        break;
      }
      case "begin":
        beginLine.x += endmobile.x;
        beginLine.y += endmobile.y;
        break;
      case "end":
        endLine.x += endmobile.x;
        endLine.y += endmobile.y;
        break;
    }
  }
  directionJudgment(stay, firstplot, endplot, endmobile){
    switch(stay){
      case "core":
        firstplot.x += endmobile.x;
        firstplot.y += endmobile.y;
        endplot.x += endmobile.x;
        endplot.y += endmobile.y;
        break;
      case "top":
        firstplot.y += endmobile.y;
        break;
      case "lower":
        endplot.y += endmobile.y;
        break;
      case "right":
        endplot.x += endmobile.x;
        break;
      case "left":
        firstplot.x += endmobile.x;
        break;
    }
    switch(this.direction[this.directionIndex]){
        case "upper":{    //当图形正向时
          switch(stay){
            case "topleft":
              firstplot.x += endmobile.x;
              firstplot.y += endmobile.y;
              break;
            case "lowerleft":
              firstplot.x += endmobile.x;
              endplot.y += endmobile.y;
              break;
            case "topright":
              endplot.x += endmobile.x;
              firstplot.y += endmobile.y;
              break;
            case "lowerright":
              endplot.x += endmobile.x;
              endplot.y += endmobile.y;
              break;
          }
          break;
        }
        case "right":{    //当图形右向时
          switch(stay){
            case "topleft":
              endplot.x += endmobile.x;
              firstplot.y += endmobile.y; 
              break;
            case "lowerleft":
              endplot.x += endmobile.x;
              endplot.y += endmobile.y;
              break;
            case "topright":
              firstplot.x += endmobile.x;
              firstplot.y += endmobile.y; 
              break;
            case "lowerright":
              endplot.x += endmobile.x;
              firstplot.y += endmobile.y; 
              break;
          }
          break;  
        }
        case "lower":{    //当图形反向时
          switch(stay){
            case "topleft":
              endplot.x += endmobile.x;
              endplot.y += endmobile.y; 
              break;
            case "lowerleft":
              endplot.x += endmobile.x;
              firstplot.y += endmobile.y;
              break;
            case "topright":
              firstplot.x += endmobile.x;
              endplot.y += endmobile.y;
              break;
            case "lowerright":
              firstplot.x += endmobile.x;
              firstplot.y += endmobile.y;
              break;
          }
          break;
        }
        case "left":{     //当图形右向时
          switch(stay){
            case "topleft":
              firstplot.x += endmobile.x;
              endplot.y += endmobile.y; 
              break;
            case "lowerleft":
              firstplot.x += endmobile.x;
              firstplot.y += endmobile.y;
              break;
            case "topright":
              endplot.x += endmobile.x;
              endplot.y += endmobile.y;     
              break;
            case "lowerright":
              endplot.x += endmobile.x;
              firstplot.y += endmobile.y; 
              break;
          } 
          break;
        }
    }
  }
  toolCurrentJudge(canvas, beginLine, endLine, firstplot, endplot){
    this.canvasDemoCtx.clearRect(0,0,this.width,this.height);    //清除虚拟画布
    switch(this.toolCurrent){
      case "line":{
        images.drawDemoLine.call(this, canvas, beginLine, endLine);      //将直线数据记录在主canvas画布上
        break;
      }     
      case 'rectangle':{
        images.solidBox.call(this, canvas, firstplot.x, firstplot.y, endplot.x, endplot.y);    //矩形框
        break;
      }       
      case 'round':{
        images.solidRound.call(this, canvas, firstplot, endplot);    //圆形
        break;
      }
      case 'rightTriangle':{
        images.solidTriangle.call(this, canvas, firstplot, endplot);    //直角三角形
        break;
      }
      case 'isosceles':{
        images.isoscelesTriangle.call(this, canvas, firstplot, endplot);    //等腰三角形
        break;
      }
      case 'diamond':{
        images.drawDiamond.call(this, canvas, firstplot, endplot);    //等腰三角形
        break;
      }
    }
  }

  colorAssignment(color){
    this.strokeColor = color;
    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
  }
}

new Bind();