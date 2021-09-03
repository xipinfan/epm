
'use strict';

export function $(el){
  return document.querySelectorAll(el);
}

export function _$(el){
  return document.querySelector(el);
}

export function on(el, func, use){
  el.addEventListener(func, use);
}

export function arrBind(...arr){
  return arr.map(index=>
    _$('#'+index)
  );
}

export function canvasDemoInit(canvas, ...item){
  canvas.width = item[0];
  canvas.height =  item[1];
  canvas.style.position =  item[2];
  canvas.style.zIndex =  item[3];

  return canvas.getContext('2d');
}

export function contentInit(content,contentH,contentW){
  content.style.height = contentH + 'px';
  content.style.width = contentW + 'px';
  // content.style.transformOrigin = '50% 50% 0';
  content.style.position = 'relative';
  content.style.transform = 'scale(1)';
}
export function protote(){
  String.prototype.colorHex = function () {
  // RGB颜色值的正则
    let reg = /^(rgb|RGB)/;
    let color = this;
    if (reg.test(color)) {
      let strHex = '#';
      // 把RGB的3个数值变成数组
      let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
      // 转成16进制
      for (let i = 0; i < colorArr.length; i++) {
        let hex = Number(colorArr[i]).toString(16);
        if (hex === '0') {
          hex += hex;
        }
        if (hex.length === 1){
          hex = '0' + hex;
        }
        strHex += hex;
      }
      return strHex;
    } 
    else {
      return String(color);
    }
  };
  String.prototype.colorRgb = function () {
    // 16进制颜色值的正则
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    let color = this.toLowerCase();
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        let colorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
      }
      // 处理六位的颜色值，转为RGB
      let colorChange = [];
      for (let i = 1; i < 7; i += 2) {
        colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
      }
      return 'RGB(' + colorChange.join(',') + ')';
    } 
    else {
      return color;
    }
  };
  
  if (!CanvasRenderingContext2D.prototype.ellipse) {  //椭圆绘制函数
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle,
      anticlockwise) {
      let r = radiusX > radiusY ? radiusX : radiusY; //用打的数为半径
      let scaleX = radiusX / r; //计算缩放的x轴比例
      let scaleY = radiusY / r; //计算缩放的y轴比例
      this.save(); //保存副本          
      this.translate(x, y); //移动到圆心位置
      this.rotate(rotation); //进行旋转
      this.scale(scaleX, scaleY); //进行缩放
      this.arc(0, 0, r, startAngle, endAngle, anticlockwise); //绘制圆形
      this.restore(); //还原副本
    }
  }
}