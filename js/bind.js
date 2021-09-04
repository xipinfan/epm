import * as images from './constants/image.js'
import * as videos from './constants/video.js'
import {$, _$, on, arrBind, checkUrl} from './constants/config.js'
import {Tools} from './index.js'

'use strict';

class Bind extends Tools{
  constructor(){
    super();
    this.baseButtonBind();
    this.animationBind();
    this.canvasVideoBindInit();
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
            that.node = that.sidebarControl.call(mainnav[2],panel[2],that.node,'画笔');
          })
          break;
        }
        case 'line':{   //直线
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
            }
            
            $('#xzgj-panel>div')[0].click();
          })
          break;
        }
        case 'brush':{  //刷子
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[2],panel[2],that.node,'画笔');
          })
          break;
        }
        case 'round':{  //圆
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
            }
            
            $('#xzgj-panel>div')[1].click();
          })
          break;
        }
        case 'rectangle':{  //矩形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
            }
            
            $('#xzgj-panel>div')[2].click();
          })
          break;
        }
        case 'rightTriangle':{  //直角三角形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
            }
            
            $('#xzgj-panel>div')[3].click();
          })
          break;
        }
        case 'isosceles':{  //等腰三角形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
            }
            
            $('#xzgj-panel>div')[4].click();
          })
          break;
        }
        case 'diamond':{  //菱形
          on(index, 'click',async function(){
            if(_$('#main-panel-title').innerHTML !== '形状工具'){
              that.node =that.sidebarControl.call(mainnav[7],panel[7],that.node,'形状工具');
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
            that.node = that.sidebarControl.call(mainnav[5],panel[5],that.node,'橡皮擦');
          })
          break;
        }
        case 'bucket':{ //油漆桶
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[4],panel[4],that.node,'油漆桶');
          })
          break;
        }
        case 'text':{   //文本
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[6],panel[6],that.node,'文本工具');
          })
          break;
        }
        case 'shear':{  //剪切
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[1],panel[1],that.node,'剪切');
          })
          break;
        }
        case 'extract':{  //颜色提取器
          on(index, 'click', function(){
            that.node = that.sidebarControl.call(mainnav[3],panel[3],that.node,'拾色器');
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
    const that = this;
    let lastCoordinate = {};
    on(this.canvasVideo, 'mousedown', function(e){
      if(!that.state)return;
      that.penstate = true;
      switch(that.toolCurrent){
        case 'pen':{
          lastCoordinate.x = e.layerX;
          lastCoordinate.y = e.layerY;
          break;
        }
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
            }
          })
        })
        if(xzgj1[that.mainpanelState]){
          xzgj1[that.mainpanelState].click();
        }
      }
      else{
        that.mainpanelState = '';
      }
      if(title === '重置画板'){
        that.dialogBind(_$('#czhb-panel>div'), _$('#warning'));
      }
      if(title === '画笔'){
        that.paintBrush();
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
      that.strokeColor = this.value;
      that.canvasVideoCtx.strokeStyle = that.strokeColor;
      that.canvasDemoCtx.strokeStyle = that.strokeColor;
      that.canvasVideoCtx.strokeStyle = that.strokeColor;
      that.canvasDemoCtx.strokeStyle = that.strokeColor;
    })
  }
}

new Bind();