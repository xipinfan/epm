import * as images from './constants/image.js'
import * as videos from './constants/video.js'
import {$, _$, on, checkUrl,widthChange, displayChange} from './constants/config.js'
import {Tools} from './index.js'

'use strict';

class Bind extends Tools{
  constructor(){
    super();
    this.baseButtonBind();
    this.animationBind();
    this.canvasVideoBindInit();
    this.canvasDemoBindInit();
    this.videoBindInit();
  }
  baseButtonBind(){   //初始按键绑定
    const that = this;
    let [warning, inputUrl, saveToImage, saveToGif] = Array.from($('dialog'));
    let panel = Array.from($('template'));    //template Dom绑定
    let mainnav = $('#main-nav>ul>li');    //侧边栏 Dom绑定
    let videoControl = $('#main-right>div');

    $('.model-header>span.close, .model-footer>button[value=cancel]').forEach((el)=>{
      on(el,'click',function(){    //去除dialog弹出框
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
      widthChange.call(that);
      that.stateType = 'image';
      that.backstageVideo.src = '';
      that.dialog.close();
      setTimeout(()=>{
        images.whiteBoard.call(that,that.canvasVideoCtx);
      },50);
    })

    on(_$('#acceptImage'),'click',async function(){
      let name = _$('#imageName').value;
      await images.saveImag(that.demo1,name);
      that.dialog.close();
    })

    on(_$('input[name=ImageFile]'), 'change', function(e){
      images.imageinput.call(that,e);
    });

    on(_$('input[name=VideoFile]'), 'input', function(){
      _$('input[name=ImageFile]').value = '';
      that.stateType = 'video';
      that.height -= 40;
      _$('#player').style.display = 'flex';
      _$('#content').style.height = that.height + 'px';
      Array.from($('#contains>canvas')).forEach((index)=>{
        index.height = that.height;
      }) 
      displayChange(videoControl[0],videoControl[2],videoControl[1]);
      videos.openCanvasVideo.call(that);
      
      
      _$('#main-panel').className = 'mainPanelOutAnima'; 
      that.progressobarWidth = $('#progressobar')[0].getBoundingClientRect().width;
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
    $('.buttonLayer>input').forEach((index)=>{
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
        case '顺时针旋转':{
          that.rotate(index, '顺时针旋转');
          break;
        }
        case '逆时针旋转':{
          that.rotate(index, '逆时针旋转');
          break;
        }
        case '旋转180°':{
          that.rotate(index, '旋转180°');
          break;
        }
        case '工具初始化':{
          on(index, 'click', function(){
            that.toolInitTo();
          })
          break;
        }
        case '撤销':{
          on(index, 'click', function(){
            images.updownImage.call(that, that.ImageData, that.forwardData);
          })
          break;
        }
        case '下一步':{
          on(index, 'click', function(){
            images.updownImage.call(that, that.forwardData, that.ImageData);
          })
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
        if(that.stateType === 'video')return;
        that.node = that.sidebarControl.call(this,panel[i],that.node,this.title,that);
      })
    });
    let spanXY = Array.from($('footer>div>span'));
    on(_$('#content'), 'mousemove', function(el){
      spanXY.forEach(function(e, index){
        if(index === 0){
          e.innerHTML = el.layerX;
        }
        else{
          e.innerHTML = el.layerY;
        }
      })
    })
    
  }
  videoBindInit(){
    let nodeState = false,  //当前是否按下鼠标
      videoTextType = '字幕',
      start, end,     //字幕弹幕开始结束点
      typebullet = "top",    //弹幕类型
      Barrage = new videos.Barrage(),   //用来控制弹幕功能的工具函数
      random,videoState = true;   //保存随机数
    const that = this,
      openicon = _$("#openicon"),     //视频控制按键图标
      pauseicon = _$("#pauseicon"),
      progressobar = _$("#progressrange"),   //进度条范围，用来控制拖动
      currentPX = _$("#currentPX");   //当前插入的字体大小
    let videoControl = $('#main-right>div');

    on(this.backstageVideo, 'canplay', function(){        //准备就绪视频时调用，开启canvas打印video图像
      that.canvasVideoTape.width = this.videoWidth;
      that.canvasVideoTape.height = this.videoHeight;
      that.videoTimedisplay[1].innerHTML = videos.timeChange(this.duration);     //将视频总时长转换后显示
      [that.videoData.w, that.videoData.h] = [this.videoWidth, this.videoHeight];     //保存视频尺寸信息
      videos.onloadOpenVideo.call(that,this.videoWidth,this.videoHeight);    //开始使用canvas映射播放视频
    });

    Array.from($('#player>svg')).forEach((e,index)=>{
      on(e, 'click', function(){
        this.style.display = 'none';
        $('#player>svg')[Math.abs(index - 1)].style.display = 'inline';
        if(that.videoIndex === 'video'){
          if(that.backstageVideo.readyState === 4){
            if(!index){
              that.backstageVideo.pause();
              if(that.ed){
                  window.cancelAnimationFrame(that.ed);
              }
            }
            else{
              that.backstageVideo.play(); 
              videos.onloadOpenVideo.call(that,that.videoData.w,that.videoData.h);
            }
          }
        }
        else{
          if(that.playbackStatus){
            window.cancelAnimationFrame(that.AnimationFrameVideo);
            that.playbackStatus = false;
          }
          else{
            if(that.videoOnload === that.saveto.length - 1 ){
              that.videoOnload = 0;
            }
            videos.recordPlay.call(that); 
          }
        }
      })
    })

    on(progressobar, 'mousedown', function(e){
      let percent = (e.pageX - progressobar.offsetLeft) / that.progressobarWidth;   //获取当前点与屏幕边缘的距离，从而计算按下点的百分比
      nodeState = true;   //切换鼠标状态
      if(that.videoIndex === "video"){
        if(that.backstageVideo.paused === false){
          videoState = that.backstageVideo.paused;
          that.backstageVideo.pause();
          window.cancelAnimationFrame(that.ed);    
        }
        videos.progressbarVideo.call(that,percent, e);   //修改视频进度与进度条进度
      }
      else if(that.videoIndex === "canvas"){
        if(that.playbackStatus === true){
          videoState = false;
          window.cancelAnimationFrame(that.AnimationFrameVideo);
        }
        videos.progressbarCanvas.call(that,percent, e);   
      }
    })

    on(progressobar, 'mousemove', function(e){
      if(nodeState){
        let percent = (e.pageX - progressobar.offsetLeft) / that.progressobarWidth;
        if(that.videoIndex === "video"){
          videos.progressbarVideo.call(that,percent, e);   
        }
        else if(that.videoIndex === "canvas"){
          videos.progressbarCanvas.call(that,percent, e); 
        } 
      }
    })

    let drawEndBind = ['mouseup','mouseleave'];
    drawEndBind.forEach(function(item){
      on(progressobar, item, function(e){
        if(nodeState && !videoState){
          if(that.videoIndex === "video"){
            that.backstageVideo.play();
            videos.onloadOpenVideo.call(that,that.videoData.w,that.videoData.h);    
          }
          else if(that.videoIndex === "canvas"){
            videos.recordPlay.call(that); 
          }
          videoState = true;
        }
        nodeState = false;
      })
    })

    Array.from($('#main-right>div>input')).forEach((e,index)=>{
      switch(e.value){
        case '开启录制':{
          on(e, 'click', function(){
            if(that.backstageVideo.readyState === 4){
              this.style.display = 'none';
              _$('.buttonLayer>input[value="暂停录制"]').style.display = 'inline-block'
              videos.saveBase64.call(that);   
              videos.playPause.call(that);  
            }
          })
          break;
        }
        case '暂停录制':{
          on(e, 'click', function(){
            if(that.backstageVideo.readyState === 4){
              e.style.display = 'none';
              _$('.buttonLayer>input[value="开启录制"]').style.display = 'inline-block'
              videos.saveBase64.call(that); 
              videos.playPause.call(that); 
            }
          })
          break;
        }
        case '取消录制':{
          on(e, 'click', function(){
            _$('.buttonLayer>input[value="暂停录制"]').style.display = 'none';
            _$('.buttonLayer>input[value="开启录制"]').style.display = 'inline-block';
            that.base = true; 
            videos.saveBase64.call(that);  
            videos.playPause.call(that);  
            that.saveto.splice(0);
          })
          break;
        }
        case '截取当前帧':{
          on(e, 'click', function(){
            _$('.buttonLayer>input[value="取消录制"]').click();
            let name = _$('#imageName').value;
            let canvasTemporarily = images.saveImagMapping.call(that);

            widthChange.call(that);

            images.imageinput.call(that,'',canvasTemporarily.toDataURL());
            images.whiteBoard.call(that,that.canvasBackgroundCxt);
          })
          break;
        }
        case '导出结果':{
          on(e, 'click', function(){
            that.canvasvideoData = null;
            videos.canvasGIF.call(that);
            videos.pictureLoad.call(that);
            displayChange(videoControl[0],videoControl[1],videoControl[2]);

          })
          break;
        }
      }
    })

    Array.from($('#mainControl>button')).forEach((e,index)=>{
      on(e, 'click', function(event){
        Array.from($('#mainControl>button')).forEach((el)=>{ el.className = '' });
        _$('#captionControl').style.display = 'none';
        this.className = 'mainControlBackground';
        switch(e.value){
          case '添加字幕':{
            videoTextType = '字幕';
            break;
          }
          case '添加弹幕':{
            videoTextType = '弹幕';
            _$('#captionControl').style.display = 'inline-block';
            break;
          }
          case '添加文字':{
            videoTextType = '文字';
            break;
          }
        }  
      })
    })

    Array.from($('#captionControl>button')).forEach((e)=>{
      on(e, 'click', function(){
        Array.from($('#captionControl>button')).forEach((el)=>{ el.className = '' });
        this.className = 'mainControlBackground';
        _$('#textSpeed1').style.display='none';
        
        switch(e.value){
          case '顶部弹幕':{
            break;
          }
          case '底部弹幕':{
            break;
          }
          case '滚动弹幕':{
            _$('#textSpeed1').style.display='inline-block';
            break;
          }
        }
      })
    })
    Array.from(_$('.gifModify>input')).forEach((e)=>{
      on(e, 'click', function(){
        switch(e.value){
          case '添加':{
            break;
          }
          case '文字重新导入':{
            break;
          }
          case '重新录制':{
            break;
          }
          case '导出GIF文件':{
            break;
          }
        }  
      })
    })
    Array.from($('#wz-style>div>input')).forEach((e)=>{
      switch(e.id){
        case 'wz-size':{
          on(e, 'change', function(){
            that.fontSize = this.value;
            _$('#textSize1').title = this.value + 'px';
          })
        }
        case 'wz-speed':{
          on(e, 'change', function(){
            that.barrageSpeed = this.value;
            _$('#textSpeed1').title = this.value;
          })
        }
        case 'wz-color':{
          on(e, 'change', function(){
            that.strokeColor = this.value;
            _$('#textColor1').title = this.value;
          })
        }
      }
    })
  }
  animationBind(){  //侧边栏动画绑定
    let control = '';
    const that = this;
    const mainPanelcontent = _$('#main-panel-content');
    const PanelOut = _$('#main-panel>span');
    const headerlogo = _$('#header-logo');
    const mainright = _$('#main-right');
    const mainPanel = _$('#main-panel');
    const content = _$('#content');
    $('.toggle-control').forEach((e)=>{
      if(e.title === '展开')control = e;
      e.addEventListener('click',function(){
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
        if(that.reduceWidth === 2){
          let width1 =  parseInt(content.style.width);
          content.style.width = width1 + 260 + 'px';
        }
        that.reduceWidth -= 1;
        this.style.display = 'none';
        mainPanelcontent.innerHTML = '';
        $('.rotate').forEach((index)=>{
          index.className = 'nonec rotate';
        })
        if(that.stateType === 'video'){
          that.toolInitTo();
        }
      }
      else{
        that.reduceWidth += 1;
        if(that.reduceWidth === 2){
          let width1 =  parseInt(content.style.width);
          content.style.width = width1 - 260 + 'px';
        }
      }
    });
    mainright.addEventListener('webkitAnimationEnd',function(){
      if(mainright.className == 'mainRightOutAnima'){
        if(that.reduceWidth === 2){
          let width1 =  parseInt(content.style.width);
          content.style.width = width1 + 260 + 'px';
        }
        that.reduceWidth -= 1;
        mainright.style.display = 'none';
        headerlogo.style.display = 'none';
      }
      else{
        that.reduceWidth += 1;
        if(that.reduceWidth === 2){
          let width1 =  parseInt(content.style.width);
          content.style.width = width1 - 260 + 'px';
        }
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
          _$('#ssq-posX').value = e.layerX;
          _$('#ssq-posY').value = e.layerY;
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
          endmobile = { x :1, y: 1 },
          shearplot = { x1 :-1 , x2 : -1 , y1 : -1, y2 : -1  };
    let controlnode = true, operation = false, stay;   //判断当前状态
    
    on(_$('#intercept'), 'click', function(){   //截取绑定函数

    })
    on( this.canvasDemo, 'mousedown', function(e){
      if(!that.state)return;
      if(controlnode){
        beginLine.x = e.layerX;
        beginLine.y = e.layerY;
        that.textDottedLine.beginLine = beginLine;
        that.textDottedLine.clinet = { x:e.layerX,y:e.layerY };
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
          that.textarea.blur();    //取消焦点
        }
        else{
          clearInterval(that.timeto);
          that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
          that.canvasDemoCtx.clearRect(0,0,that.width,that.height);    //清除虚拟画布
          if(that.toolCurrent === 'text'){
            images.textTool.call(that,that.textDottedLine, that.canvasVideoCtx, that.textValue, 0);
            that.textValue = "";
            that.textarea.value = "";
          }
          else if(that.toolCurrent === 'shear'){
            new Promise((resolve, reject)=>{
              images.updownImage.call(that, that.ImageData, that.forwardData);
              images.updownImage.call(that, that.ImageData, that.forwardData);
              that.forwardData.pop();
              that.forwardData.pop();
              that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
              resolve();
            }).then((value)=>{
              images.shear.call(that, firstplot, endplot, shearplot);
              that.canvasVideoCtx.drawImage(that.canvasDemo,0,0);  
              that.canvasDemoCtx.clearRect(0,0,that.width,that.height);    //清除虚拟画布
            }) 
          } 
          else that.toolCurrentJudge(that.canvasVideoCtx, beginLine, endLine, firstplot, endplot);
          that.directionIndex = 0;    //设定翻转和点初始化
          that.centralPoint = { x1:-1 , y1:-1 , x2:-1 , y2:-1 };
        }
      }
    })
    on( this.canvasDemo, 'mouseup', function(e){
      if(that.penstate){
        endLine.x = e.layerX;
        endLine.y = e.layerY;
        [firstplot.x,firstplot.y,endplot.x,endplot.y ] = [Math.min(beginLine.x,endLine.x), 
          Math.min(beginLine.y,endLine.y),Math.max(beginLine.x,endLine.x),Math.max(beginLine.y,endLine.y)];
        if(that.toolCurrent === 'line'){
          that.centralPoint = { x1:beginLine.x , y1:beginLine.y , x2:endLine.x , y2:endLine.y };
          images.lineBox.call(that, beginLine.x, beginLine.y, endLine.x , endLine.y); 
        }
        else{
          that.centralPoint = { x1:firstplot.x , y1:firstplot.y , x2:endplot.x , y2:endplot.y };
          images.dottedBox.call(that, firstplot.x, firstplot.y, endplot.x, endplot.y); 
        }
        if(that.toolCurrent === "text"){    //保存文本框开始点和结束点并且修改textarea位置
          that.textDottedLine.endLine = endLine;
          let { x, y } = that.textDottedLine.clinet;
          that.textDottedLine.clinet = { x:Math.min(e.layerX, x), y:Math.min(e.layerY, y) };
          that.textDottedLine.clinetTo = { x:Math.max(e.layerX, x), y:Math.max(e.layerY, y) };
          that.textarea.style.marginLeft = that.textDottedLine.clinet.x + 'px';
          that.textarea.style.marginTop = that.textDottedLine.clinet.y + 'px';
          that.textarea.dispatchEvent(new Event('input', { bubbles: true }));    //触发input事件
          that.textarea.focus();    //获取焦点
        }
        if( that.toolCurrent === "shear" ){
          that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
          [shearplot.x1, shearplot.y1] = [ firstplot.x, firstplot.y ];
          [shearplot.x2, shearplot.y2] = [ endplot.x, endplot.y ];
          images.shear.call(that, firstplot, endplot, shearplot);
          [...that.jq] = [endplot.x - firstplot.x,endplot.y - firstplot.y,firstplot.x,firstplot.y]
          if(_$('#main-panel').style.display !== 'none' && _$('#main-panel-title').innerHTML === '剪切'){
            Array.from($('#jq-panel>div>input')).forEach((e,index)=>{
              e.value = that.jq[index];
            });
          }
        }
      }
      if(!operation){
        controlnode = !controlnode;
      }
      else{
        if(that.toolCurrent === "text"){
          that.textarea.focus();    //获取焦点
        }
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
        if(!operation && that.centralPoint !== -1){    //当图形翻转了之后修改其坐标
          [ beginLine.x, beginLine.y ] = [that.centralPoint.x1, that.centralPoint.y1];
          [ endLine.x, endLine.y ] = [that.centralPoint.x2, that.centralPoint.y2];
          [ firstplot.x, firstplot.y ] = [that.centralPoint.x1, that.centralPoint.y1];
          [ endplot.x, endplot.y ] = [that.centralPoint.x2, that.centralPoint.y2];
        }
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
            that.directionJudgment(stay, firstplot, endplot, endmobile );
            that.centralPoint = { x1:firstplot.x , y1:firstplot.y , x2:endplot.x , y2:endplot.y };
            if(that.toolCurrent === 'text'){
              that.textDottedLine.clinet.x = firstplot.x;    //替换点坐标，使得定时器内按照新坐标进行绘制
              that.textDottedLine.clinet.y = firstplot.y;
              that.textDottedLine.clinetTo.x = endplot.x;
              that.textDottedLine.clinetTo.y = endplot.y;
              images.textTool.call(that, that.textDottedLine, that.canvasDemoCtx, that.textValue, 0);
            }
            else if(that.toolCurrent === 'shear'){
              that.canvasDemoCtx.clearRect(0,0,that.width,that.height);
              new Promise((resolve, reject)=>{
                images.updownImage.call(that, that.ImageData, that.forwardData);
                that.ImageData.push(that.canvasVideoCtx.getImageData(0,0,that.width,that.height));    //记录canvas画布数据
                that.forwardData.pop();
                resolve();
              }).then((value)=>{
                images.shear.call(that, firstplot, endplot, shearplot);
              })
              images.dottedBox.call(that, firstplot.x, firstplot.y, endplot.x, endplot.y);    //虚线提示框
            }
            else{
              that.toolCurrentJudge(that.canvasDemoCtx, beginLine, endLine, firstplot, endplot);
              images.dottedBox.call(that, firstplot.x, firstplot.y, endplot.x, endplot.y);    //虚线提示框
            }
          }
        }
      }
    })
  }

  sidebarControl(template1, node, title,that){    //模板工具绑定
    let mainPaneltitle = _$('#main-panel-title');
    let mainPanelcontent = _$('#main-panel-content');
    let mainPanel = _$('#main-panel');
    let rotate = $('.rotate');
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
        rotate.forEach((index)=>{
          index.className = 'rotate';
        })
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
      else{
        rotate.forEach((index)=>{
          index.className = 'nonec rotate';
        })
      }
      if(title === '图像属性'){
        that.imageTransformation();
      }
      if(title === '剪切'){
        Array.from($('#jq-panel>div>input')).forEach((e,index)=>{
          e.value = that.jq[index];
        });
        that.shear();
      }
      else{
        that.jq = Array.from({length:4},x=>0);
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
        that.textTool();
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
    that.canvasDemo.style.zIndex = 1001;

    _$('#wbgj-text-size').value = this.fontSize;
    _$('#wbgj-text-color').value = this.strokeColor;
    _$('#wbgj-font-family').value = this.fontFamily;
    _$('#wbgj-font-weight').value = this.fontWeight;
    _$('#wbgj-text-style').value = this.textStyle;

    on(_$('#wbgj-font-family'),'change', function(){
      that.fontFamily = this.value;
    })
    on(_$('#wbgj-font-weight'), 'change', function(){
      that.fontWeight = this.value;
    })
    on(_$('#wbgj-text-style'), 'change', function(){
      that.textStyle = this.value;
    })
    on(_$('#wbgj-text-size'),'change',function(){
      that.fontSize = this.value;
    })
    on(_$('#wbgj-text-color'),'change',function(){
      that.colorAssignment(this.value);
    })
  }
  imageTransformation(){
    const that = this;
    Array.from($('#txhb-panel>div>input')).forEach((e,index)=>{
      e.value = that.imageAttribute[index];
    })
  }
  shear(){
    const that = this;
    this.state = true;
    that.canvasDemo.style.zIndex = 1001;
    this.toolCurrent = 'shear';
  }
  toolInitTo(){
    if(this.node && _$('#main-panel').style.display === 'none'){
      this.state = false;
      this.node.className = '';
      this.mainpanelState = '';
      this.canvasVideo.style.cursor = "default";
      this.jq = Array.from({length:4},x=>0);
    }
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
        let minbegin = {x:Math.min(firstplot.x,endplot.x),y:Math.min(firstplot.y,endplot.y)};
        let maxend = {x:Math.max(firstplot.x,endplot.x),y:Math.max(firstplot.y,endplot.y)};
        images.solidRound.call(this, canvas, minbegin, maxend);    //圆形
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
      case 'text':{
        images.dottedBox.call(this, firstplot.x, firstplot.y, endplot.x, endplot.y);
        break;
      }
      case "shear":{
        images.dottedBox.call(this, firstplot.x, firstplot.y, endplot.x, endplot.y);     //虚线提示框
        break;  
      }
    }
  }
  textareaInputBind(endplot){
    const that = this;
    on(this.textarea, 'input', function(){
      clearInterval(that.timeto);
      if(that.textDottedLine.beginLine !== undefined){
        that.textValue = this.value;
        let { clinet, clinetTo } = that.textDottedLine, dd = 0;
        that.timeto = setInterval(()=>{
          that.canvasDemoCtx.clearRect(0,0,that.width, that.height);
          let h = images.textTool.call(that,that.textDottedLine, that.canvasDemoCtx, this.value, dd);
          if(h > Math.abs(clinetTo.y - clinet.y)){
            clinetTo.y = clinet.y + h + 1;
            
            endplot.y = clinetTo.y;
          }
          dd ++;
          if(dd >= 20) dd -= 20;
          images.dottedBox.call(that, clinet.x, clinet.y, clinetTo.x, clinetTo.y);
        }, 40)
      }
    })
  }

  rotate(index, tit){
    const that = this;
    on(index, 'click',function(){
      let middle = { x:(that.centralPoint.x1+that.centralPoint.x2)/2 , y:(that.centralPoint.y1+that.centralPoint.y2)/2 };    //中心点
      let x = (that.centralPoint.x2 - that.centralPoint.x1)/2, y = (that.centralPoint.y2 - that.centralPoint.y1)/2 ;    //距离
      if(that.centralPoint.x1 !== -1){
        switch(tit){
          case "顺时针旋转":    //顺时针90°
            that.directionIndex ++;
            console.log({x: middle.x + y , y: middle.y - x}, {x: middle.x - y , y: middle.y + x} )
            that.shapeFlip( {x: middle.x + y , y: middle.y - x}, {x: middle.x - y , y: middle.y + x} );
            break;
          case "逆时针旋转":    //逆时针90°
            that.directionIndex --;
            that.shapeFlip( {x: middle.x - y , y: middle.y + x}, {x: middle.x + y , y: middle.y - x} );
            break;
          case "旋转180°":    //180°
            that.directionIndex += 2;
            that.shapeFlip( {x: middle.x + x , y: middle.y + y}, {x: middle.x - x , y: middle.y - y} );
            break;
        }    
      }
    });
  }
  shapeFlip( beginLine, endLine ){
    if(this.directionIndex < 0)this.directionIndex += this.direction.length;
    if(this.directionIndex > 3)this.directionIndex -= this.direction.length;
    this.canvasDemoCtx.clearRect(0,0,this.width,this.height);    //清除画布
    let minbegin = {x:Math.min(beginLine.x,endLine.x),y:Math.min(beginLine.y,endLine.y)};
    let maxend = {x:Math.max(beginLine.x,endLine.x),y:Math.max(beginLine.y,endLine.y)};
    switch(this.toolCurrent){
      case "line":
        images.drawDemoLine.call(this, this.canvasDemoCtx, beginLine, endLine);    //重绘直线
        images.lineBox.call(this, beginLine.x, beginLine.y, endLine.x , endLine.y);    //直线框
        break
      case "rectangle":
        images.solidBox.call(this, this.canvasDemoCtx, beginLine.x, beginLine.y, endLine.x, endLine.y);    //矩形框
        break;
      case "round":
        images.solidRound.call(this, this.canvasDemoCtx, minbegin, maxend);    //圆形
        break;
      case "rightTriangle":
        images.solidTriangle.call(this, this.canvasDemoCtx, beginLine, endLine);    //直角三角形
        break;
      case "isosceles":
        images.isoscelesTriangle.call(this, this.canvasDemoCtx, beginLine, endLine);    //等腰三角形
        break;
      case "diamond":
        images.drawDiamond.call(this, this.canvasDemoCtx, minbegin, maxend);    //等腰三角形
        break;
      default:
        return;
    }
    if(this.toolCurrent !== "line"){
      images.dottedBox.call(this, beginLine.x, beginLine.y, endLine.x, endLine.y);    //虚线提示框
    }
    this.centralPoint = { x1:beginLine.x , y1:beginLine.y , x2:endLine.x , y2:endLine.y };    //改变坐标
  }

  colorAssignment(color){
    this.strokeColor = color;
    this.canvasVideoCtx.fillStyle = this.strokeColor;
    this.canvasDemoCtx.fillStyle = this.strokeColor;
    this.canvasVideoCtx.strokeStyle = this.strokeColor;
    this.canvasDemoCtx.strokeStyle = this.strokeColor;
  }
}

new Bind();