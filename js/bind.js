import * as image from './constants/image.js'
import * as video from './constants/video.js'
import {$, _$, on, arrBind} from './constants/config.js'
import {Tools} from './index.js'

'use strict';

class Bind extends Tools{
  constructor(){
    super();
    this.baseButtonBind();
    this.animationBind();
  }
  baseButtonBind(){
    const that = this;
    let node = '',indexXzgj = '';
    let mainPaneltitle = _$('#main-panel-title');
    let mainPanelcontent = _$('#main-panel-content');
    let mainPanel = _$('#main-panel');


    let [warning, inputUrl, saveToImage, saveToGif] = arrBind('warning', 'inputUrl', 'saveToImage', 'saveToGif')
    let panel = arrBind('txbh-template','jq-template','hb-template','ssq-template',
    'yqt-template','xpc-template','wbgj-template','xzgj-template','czhb-template');

    $('.model-header>span.close, .model-footer>button[value=cancel]').forEach((el)=>{
      on(el,'click',function(){
        that.dialog.close();
      })
    })
    
    $('#file>li').forEach((index)=>{  //文件操作绑定
      switch(index.id){
        case 'openImageFile':{  //打开图片文件
          on(index, 'click', function(){
            
          })
          break;
        }
        case 'openVideoFile':{  //打开视频文件
          
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
    })
    $('#shape>li').forEach((index)=>{  //形状操作绑定
      switch(index.id){
        case 'pencil':{ //铅笔
          break;
        }
        case 'line':{   //直线
          break;
        }
        case 'brush':{  //刷子
          break;
        }
        case 'round':{  //圆
          break;
        }
        case 'rectangle':{  //矩形
          break;
        }
        case 'rightTriangle':{  //直角三角形
          break;
        }
        case 'isosceles':{  //等腰三角形
          break;
        }
        case 'diamond':{  //菱形
          break;
        }
      }
    })
    $('#tool>li').forEach((index)=>{  //工具操作绑定
      switch(index.id){
        case 'eraser':{ //橡皮擦
          break;
        }
        case 'bucket':{ //油漆桶
          break;
        }
        case 'text':{   //文本
          break;
        }
        case 'shear':{  //剪切
          break;
        }
        case 'extract':{  //颜色提取器
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
    })
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
    })
    $('#toggle>ul>li').forEach(index=>{
      switch(index.title){
        case '撤销':{
          break;
        }
        case '下一步':{
          break;
        }
        case '保存':{
          break;
        }
        case '缩小':{
          break;
        }
        case '展开':{
          break;
        }
      }
    })
    $('#main-nav>ul>li').forEach((index,i)=>{
      on(index, 'click', function(){

        mainPaneltitle.innerHTML = this.title;
        if( mainPanel.style.display === 'none' ){
          mainPanel.style.display = 'flex';
          mainPanel.className = 'mainPanelUpAnima';
          this.className = 'active';

          mainPanelcontent.appendChild(panel[i].content.cloneNode(true));

          if(this.title === '形状工具'){
            $('#xzgj-panel>div').forEach((e)=>{
              e.addEventListener('click',function(){
                if(indexXzgj != this){
                  if(indexXzgj)indexXzgj.style = '';
                  this.style.backgroundColor = 'rgb(53, 53, 53)';
                  this.style.color = 'white';
                  indexXzgj = this;
                }
              })
            });
          }
        }
        else{
          mainPanelcontent.innerHTML = '';
          node.className = '';
          if(node.title == this.title){
            mainPanel.className = 'mainPanelOutAnima';
          }
          else{
            this.className = 'active';

            mainPanelcontent.appendChild(panel[i].content.cloneNode(true));
          }
        }
        node = this;
      })
    })
  }
  animationBind(){
    let control = ''
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
      })
  })

    on(PanelOut, 'click', function(){
      mainPanel.className = 'mainPanelOutAnima';
      node.className = '';
    })

    mainPanel.addEventListener('webkitAnimationEnd',function(){
      if(this.className == 'mainPanelOutAnima'){
        this.style.display = 'none';
        mainPanelcontent.innerHTML = '';
        indexXzgj.className = '';
      }
    })
    mainright.addEventListener('webkitAnimationEnd',function(){
      if(mainright.className == 'mainRightOutAnima'){
        mainright.style.display = 'none';
        headerlogo.style.display = 'none';
      }
    })
  }
  dialogBind(index , event){
    const that = this;
    on(index, 'click', function(){
      that.dialog = event;
      that.dialog.showModal();
    })
  }
  
}

new Bind();