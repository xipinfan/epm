
'use strict';

//将视频投射到画布上
export function openCanvasVideo(){
  let that = this;
  new Promise((resolve, reject)=>{
    let inputVideo = document.querySelector('input');
    this.backstageVideo.src = window.URL.createObjectURL(inputVideo.files[0]);  //获取视频所在路径并播放
    this.backstageVideo.controls = true;
    resolve();
  }).then((e)=>{
    that.backstageVideo.play();  //异步播放视频
  })
}
export function onloadOpenVideo(videoWidth,videoHeight){
  let that = this;
  let node = that.contrast(videoWidth,videoHeight);
  render();
  function render(){  //将视频投放到canvas上
    let x = that.nodePlot.x - node.a/2, y = that.nodePlot.y - node.b/2;

    that.ed = window.requestAnimationFrame(render);  //每秒触发60次这个函数
    
    that.videoTimedisplay[0].innerHTML = that.CanvasNode.timeChange(that.backstageVideo.currentTime);  //将当前视频时间显示在屏幕上
    that.progressoafter.style.width = (that.backstageVideo.currentTime/that.backstageVideo.duration) * that.progressobarWidth + 'px';
    if(that.backstageVideo.paused)window.cancelAnimationFrame(that.ed);

    that.canvasVideoCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height);  //清空canvas
    that.canvasVideoCtx.drawImage( that.backstageVideo, 0, 0, videoWidth, videoHeight, x, y, node.a, node.b);

    that.canvasVideoTapeCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height); 
    that.canvasVideoTapeCtx.drawImage(that.backstageVideo, 0, 0, videoWidth, videoHeight);  //设定录制canvas

    if(that.base){  //导出开始录制
      document.getElementById('base64').style.backgroundColor = 'red'; 
      that.saveto.push(that.canvasVideoTape.toDataURL('image/png'));
    }
    else{
      document.getElementById('base64').style.backgroundColor = 'blue';
    }
  }
}

export function timeChange(time){  //修改时间

  let t = parseInt(time);
  let m = parseInt(t/60).toString();
  let s = (t - m*60).toString();

  if(m.length < 2)m = '0' + m;
  if(s.length < 2)s = '0' + s;
  return `${m}:${s}`;
}

export function timeChangeFrame(time){  //修改时间

  let t = parseInt(time/60);
  let m = parseInt(t/60).toString();
  let s = (t - m*60).toString();
  let f = time - s*60 - m*60*60;

  if(m.length < 2)m = '0' + m;
  if(s.length < 2)s = '0' + s;
  if(f.length < 2)f = '0' + f;

  return `${m}:${s}:${f}`;
}

export function recordPlay(){  //开始播放图片数组
  let that = this;
  let img = new Image();
  let node = that.contrast(that.canvasvideoData.w,that.canvasvideoData.h);
  let x = that.nodePlot.x - node.a/2, y = that.nodePlot.y - node.b/2;

  func();
  function func(){
    that.playbackStatus = true;
    that.AnimationFrameVideo = window.requestAnimationFrame(func);

    that.progressoafter.style.width = ((that.videoOnload + 1)/that.saveto.length) * that.progressobarWidth + 'px';
    that.videoTimedisplay[0].innerHTML = that.CanvasNode.timeChange((that.videoOnload + 1)/60);  //将当前视频时间显示在屏幕上

    img.src = that.saveto[that.videoOnload];  //导入
    img.onload = function(){

      that.canvasVideoCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height);  //清空canvas
      that.canvasVideoCtx.drawImage(img, 0, 0, that.canvasvideoData.w, that.canvasvideoData.h, x, y, node.a, node.b);         
    }

    if(that.barrage != null){
      console.log('????');
      that.canvasDemoCtx.clearRect( 0, 0, that.canvasVideo.width, that.canvasVideo.height); 
      that.canvasSubtitleCtx.clearRect( 0, 0, that.canvasvideoData.w, that.canvasvideoData.h); 
      switch(that.barrage.typebullet){
        case 'bottom':
        case 'top':{
          that.barrage.drawFixed(that.videoOnload);
          break;
        }
        case 'roll':{
          that.barrage.draw(that.videoOnload);
          break;
        }
      }
      that.canvasDemoCtx.drawImage(that.canvasSubtitle, 0, 0,that.videoData.w,that.videoData.h, x, y, node.a, node.b);
    }

    that.videoOnload = that.videoOnload + 1;
    if(that.videoOnload >= that.saveto.length ){  //当到达结尾时结束
      that.videoOnload --;
      document.querySelector('#progressopen').click();  //修改播放图标样式
    }
  }
}

export function Recording(){  //导出mp4视频函数
  let that = this;
  let onload1 = 0;
  
  this.CanvasNode.recordingVideo.call(this);
  let gif = new GIF({
    worker: 2,
    quality: 10,
    workerScript: './js/layer/gif.worker.js'
  })

  for( let i = 0 ; i < that.saveto.length ; i+=5 ){
    let img = new Image();
    img.src = that.saveto[i];
    img.onload = function(){
      let node = that.contrast(that.canvasvideoData.w,that.canvasvideoData.h);
      let x = that.nodePlot.x - node.a/2, y = that.nodePlot.y - node.b/2;

      that.canvasVideoTapeCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height);  //清空canvas
      if(that.canvasvideoData.h === this.height && that.canvasvideoData.w === this.width){
        that.canvasVideoTapeCtx.drawImage(img, 0, 0);  //设定图片距离
      }
      else{
        that.canvasVideoTapeCtx.drawImage(img, x, y, node.a, node.b);
      }

      gif.addFrame(that.canvasVideoTape, {copy:true, delay:120});

      if( i + 5 >= that.saveto.length - 1 ){
        gif.render();
      }
    }
  }

  gif.on('finished', function(blob){
    alert('导出成功!!!!');
    let url = URL.createObjectURL(blob);
    let el = document.createElement('a');
    el.href = url;
    el.download = 'demo-name';
    el.click();
  })

  // lz();  //导出MP4文件函数
  // function lz(){  //循环一遍图片数组并记录导出
  //   img.src = that.saveto[onload1];
  //   img.onload = function(){
  //     let node = that.contrast(that.canvasvideoData.w,that.canvasvideoData.h);
  //     let x = that.nodePlot.x - node.a/2, y = that.nodePlot.y - node.b/2;

  //     let onloadAnimation = window.requestAnimationFrame(lz);

  //     that.canvasVideoTapeCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height);  //清空canvas
  //     if(that.canvasvideoData.h === this.height && that.canvasvideoData.w === this.width){
  //       that.canvasVideoTapeCtx.drawImage(img, 0, 0);  //设定图片距离
  //     }
  //     else{
  //       that.canvasVideoTapeCtx.drawImage(img, x, y, node.a, node.b);
  //     }
  //     onload1 = onload1 + 1;
  //     gif.addFrame(that.canvasVideoTape, {copy:true,delay:0});

  //     if(onload1 >= that.saveto.length ){
  //       window.cancelAnimationFrame(onloadAnimation);
  //       that.CanvasNode.stopRecordingVideo.call(that);
  //       gif.render()
  //       alert('导出成功!!!!');
  //     }
  //   }
  // }
  
}

//视频录制函数
export function recordingVideo(){
  let stream = this.canvasVideoTape.captureStream();  //返回一个实时视频捕获画布
  this.recorder = new MediaRecorder(stream, {mimeType: 'video/webm'});  //设置一个队stream就行录制的对象
  let data = [];
  this.recorder.ondataavailable = function(event){
    if(event.data && event.data.size){  //将捕获到的媒体数据传入data里
      data.push(event.data);
    }
  }
  this.recorder.onstop = () =>{  //当结束录制时导出视频
    let url = URL.createObjectURL(
      new Blob(data, {type:'video/webm'})
    );
    this.backstageVideo.src = url;
    console.log(url);
  }
  this.recorder.start();  //开启录制
}

export function stopRecordingVideo(){  //暂停录制
  if(this.recorder){
    this.recorder.stop();
  }
}

export function pictureLoad(){  //重新导入页面
  let that = this;
  let img = new Image();
  img.src = this.saveto[this.videoOnload];
  img.onload = function(){
    let node = that.contrast(this.width,this.height);
    let x = that.nodePlot.x - node.a/2, y = that.nodePlot.y - node.b/2;
    that.videoTimedisplay[0].innerHTML = that.CanvasNode.timeChange((that.videoOnload + 1)/60);  //将当前视频时间显示在屏幕上

    if(!!!that.canvasvideoData){  //修改视频的初始数据
      
      that.canvasSubtitle.width = this.width;
      that.canvasSubtitle.height = this.height;
      that.canvasvideoData = { w:this.width,h:this.height };
      that.canvasvideoNode = { w:node.a, h:node.b };
    }
    that.canvasVideoCtx.clearRect(0, 0,that.canvasVideo.width,that.canvasVideo.height);  //清空canvas
    that.canvasVideoCtx.drawImage(img, 0, 0, this.width, this.height, x, y, node.a, node.b);  

    if(that.barrage != null){
      that.canvasDemoCtx.clearRect( 0, 0, that.canvasVideo.width, that.canvasVideo.height); 
      that.canvasSubtitleCtx.clearRect( 0, 0, that.canvasvideoData.w, that.canvasvideoData.h); 
      switch(that.barrage.typebullet){
        case 'bottom':
        case 'top':{
          that.barrage.drawFixed(that.videoOnload);
          break;
        }
        case 'roll':{
          that.barrage.draw(that.videoOnload);
          break;
        }
      }
      that.canvasDemoCtx.drawImage(that.canvasSubtitle, 0, 0,that.videoData.w,that.videoData.h, x, y, node.a, node.b);
    }

  }
}

export function canvasGIF(){  //导出图片数组之后的初始化
  this.videoOnload = 0;
  this.AnimationFrameVideo = null;
  this.playbackStatus = false;
  document.querySelector('#inputVido').value = '';
  this.backstageVideo.src = '';
  this.videoTimedisplay[0].innerHTML = '00:00';
  this.videoTimedisplay[1].innerHTML = this.CanvasNode.timeChange(this.saveto.length/60);
  this.progressoafter.style.width = '0px';
  this.videoIndex = 'canvas';
}

export function saveBase64(){  //进行base64编码
  if(!this.base){
    this.base = true;  
  }
  else{
    this.base = false;
    window.cancelAnimationFrame(this.ed);
    this.backstageVideo.pause();
    document.getElementById('base64').style.backgroundColor = 'blue';
  }
}

export function progressbarVideo(percent, e){  //映射视频时的进度条控制
  if(this.backstageVideo.readyState === 4){  
    //window.cancelAnimationFrame(this.ed);
    this.progressoafter.style.width = (e.pageX - progressobar.offsetLeft) + 'px';
    this.backstageVideo.currentTime = percent * this.backstageVideo.duration;
  }
}

export function progressbarCanvas(percent, e){  //映射图片数组的进度条控制
  this.progressoafter.style.width = (e.pageX - progressobar.offsetLeft) + 'px';
  this.videoOnload = parseInt(percent * this.saveto.length);
  if(this.videoOnload < 0 )this.videoOnload = 0;
  if(this.videoOnload >= this.saveto.length) this.videoOnload = this.saveto.length - 1;
  this.CanvasNode.pictureLoad.call(this);
}

export function textQueueObtain(canvas, w, value){  //文本换行判断
  let index = 0;
  let textQueue = [];
  textQueue[index] = '';

  for(let i of value){
    if(canvas.measureText(textQueue[index] + i).width > w){
      index++;
      textQueue[index] = '';
    }
    textQueue[index] += i;
  }
  return textQueue;
}

export function addSubtitles(canvas, value, Text){  //字幕操作画布函数

  let node = this.contrast(this.videoData.w,this.videoData.h);
  let x1 = this.nodePlot.x - node.a/2, y1 = this.nodePlot.y - node.b/2;

  this.canvasSubtitleCtx.clearRect(0, 0,this.canvasvideoData.w,this.canvasvideoData.h);

  canvas.save();
  canvas.font = Text + 'px serif';  //字体大小

  let textQueue = this.CanvasNode.textQueueObtain(canvas, this.canvasvideoData.w, value);

  for(let i = 0 ; i < textQueue.length ; i++){
    let nP = { x:this.canvasvideoData.w/2 - canvas.measureText(textQueue[i]).width/2,
          y:this.canvasvideoData.h - (textQueue.length - 1 ) * Text - 2 };
    this.ImageLayerNode.textFill(canvas, textQueue[i], nP, i * Text);
  }

  this.canvasDemoCtx.drawImage(this.canvasSubtitle, 0, 0,this.videoData.w,this.videoData.h, x1, y1, node.a, node.b);

  canvas.restore();
}

export function endFrame(img, value, Text, index){  //字幕完成添加函数

  this.canvasSubtitleCtx.clearRect(0, 0,this.canvasvideoData.w,this.canvasvideoData.h);
  this.canvasSubtitleCtx.drawImage(img, 0, 0);  
  this.canvasSubtitleCtx.save();
  this.canvasSubtitleCtx.font = Text + 'px serif';  //字体大小
  
  let textQueue = this.CanvasNode.textQueueObtain(this.canvasSubtitleCtx, this.canvasvideoData.w, value);

  for(let i = 0 ; i < textQueue.length ; i++){
    let nP = { x:this.canvasvideoData.w/2 - this.canvasSubtitleCtx.measureText(textQueue[i]).width/2 ,
        y:this.canvasvideoData.h- (textQueue.length-1) * Text } ;
    this.ImageLayerNode.textFill(this.canvasSubtitleCtx, textQueue[i], nP, i * Text);
  }

  this.canvasSubtitleCtx.restore();
  this.saveto[index] = this.canvasSubtitle.toDataURL('image/png');  //修改图片数组
}

export function speedCalculation(nP, value, speed){  //计算滚动弹幕时间

  let node = this.contrast(this.videoData.w,this.videoData.h);
  let x1 = this.nodePlot.x - node.a/2, y1 = this.nodePlot.y - node.b/2;
  let Ti = this.videoOnload, x = nP.x;
  let length = this.canvasSubtitleCtx.measureText(value).width;

  this.canvasSubtitleCtx.clearRect(0, 0, this.canvasvideoData.w, this.canvasvideoData.h);
  this.ImageLayerNode.textFill(this.canvasSubtitleCtx, value, nP, 0);
  this.canvasDemoCtx.drawImage(this.canvasSubtitle, 0, 0,this.videoData.w,this.videoData.h, x1, y1, node.a, node.b);

  while(Ti != this.saveto.length){  //计算从起使到结束点时间
    if(x + length < 0){
      break;
    }
    x -= speed;
    Ti ++;
  }

  return Ti;
}

export class Barrage{
  constructor(ctx, value, typebullet, plot, time, speed, font){
    this.ctx = ctx;
    this.color = '#000000';
    this.value = value;
    this.x = plot.x; //x坐标
    this.y = plot.y;
    this.speed = speed;
    this.fontSize = font;  //字体
    this.time = time;  //时间
    this.typebullet = typebullet;  //弹幕类型
  }
  draw(time1) {  //滚动弹幕
    
    if(this.time.begin <= time1 && this.time.end >= time1) {
      let d1 = time1 - this.time.begin;
      this.ctx.save();
      this.ctx.font = this.fontSize + 'px "microsoft yahei", sans-serif';
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(this.value, this.x - this.speed * d1, this.y);  //每次减少x值来进行移动
      this.ctx.restore();
      
    } else {
      return;
    }
  }
  drawFixed(time1) {  //固定弹幕
    if(this.time.begin <= time1 && this.time.end >= time1){
      this.ctx.save();
      this.ctx.font = this.fontSize + 'px "microsoft yahei", sans-serif';
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(this.value, this.x, this.y);
      this.ctx.restore();
    }
    else{
      return;
    }
  }

  changebulletchat(ctx, x1, y1){  //修改值
    this.ctx = ctx;
    this.x = x1;
    this.y = y1;
  }
}

export function bulletchatImageC(width, height, img, i){  //将图片与弹幕导入到新的画布上，然后保存当前画布的图片
  this.canvasSubtitleCtx.clearRect(0, 0,width,height);
  this.canvasSubtitleCtx.drawImage(img, 0, 0);  
  this.canvasSubtitleCtx.save();
  switch(this.barrage.typebullet){
    case 'bottom':
    case 'top':{
      this.barrage.drawFixed(i);
      break;
    }
    case 'roll':{
      this.barrage.draw(i);
    }
  }  
  this.saveto[i] = this.canvasSubtitle.toDataURL('image/png');
}

export function bulletchatChange(typebullet, value, random){
  let xx, yy;

  switch(typebullet){  //因为图片的分辨率与画布大小不一样，需要转换
    case 'top':
      xx = this.canvasvideoData.w / 2 - this.canvasSubtitleCtx.measureText(value).width/2;
      yy = this.canvasvideoData.h / 2 - this.canvasvideoData.h / 2 * random;
      break;
    case 'roll':
      xx = this.canvasvideoData.w;
      yy = this.canvasvideoData.h * random;
      break;
    case 'bottom':
      xx = this.canvasvideoData.w / 2 - this.canvasSubtitleCtx.measureText(value).width/2;
      yy = this.canvasvideoData.h / 4 * random + this.canvasvideoData.h / 4 * 3;
      break;
  }

  return { xx, yy };
}
