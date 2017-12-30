//获得canvas元素
var canvas = document.getElementById("clock");
//创建canvas对象
var cxt = canvas.getContext("2d");


var img = new Image();
          img.src = "img/ROLEX.PNG";
    img.onload = function() {
        drawClock();
        setInterval(drawClock, 1000);  //每一秒中调用一次主函数
    };


    function drawClock() {
        var now = new Date();
        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hour = now.getHours();
        hour > 12 ? hour - 12 : hour; //时钟只有12个小时显示
        hour += ( min/ 60);   //让时针走的自然，不至于一小时突变转动30度
        min += (sec / 60);  //让分针走的自然

        //先清空画布
        cxt.clearRect(0, 0, canvas.width, canvas.height);
		
        //画表盘t填充一个背景色
        cxt.fillStyle = "#fdfdfd";
        cxt.beginPath();
        cxt.arc(250, 250, 200, 0, 360);
        cxt.closePath();
        cxt.fill();
       // cxt.clip();
		
       //图片logo作为表盘背景
       cxt.drawImage(img, 190, 120,120,80);
		
        //时刻度
        drawScale(12,7,"#000",30,-175,-195);
        //分刻度
        drawScale(60,5,"#000",6,-185,-195);

        //绘制刻度的方法
        function drawScale(n,width,color,angle,moveto,lineto) {
            for (var i = 0; i < n; i++) {
            cxt.save();    //保存此次位置移动的数据，并不影响后面的元素
            cxt.lineWidth = width;
            cxt.strokeStyle =color;
            cxt.translate(250, 250);  //将坐标原点移到原心
            cxt.rotate(i * angle * Math.PI / 180);  //坐标原点不断旋转，y轴跟着旋转
            cxt.beginPath(); 
            cxt.moveTo(0, moveto);
            cxt.lineTo(0, lineto);
            cxt.stroke();
            cxt.closePath();
            cxt.restore();
            }
         }
        
        //绘制时针
        drawPointer(12,"#000",hour,30,-130,10) ;
        //绘制分针
        drawPointer(7,"#000",min,6,-170,10) ;
        //绘制秒针
        drawPointer(3,"#f3a829",sec,6,-190,20) ;

        //绘制指针
        function drawPointer(width,color,time,angle,moveto,lineto) {
                cxt.save();
                cxt.lineWidth = width;
                cxt.strokeStyle =color;
                cxt.translate(250, 250);
                cxt.rotate(time * angle * Math.PI / 180);//每秒旋转6度
                cxt.beginPath();
                cxt.moveTo(0, moveto);
                cxt.lineTo(0, lineto);
                cxt.stroke();
                cxt.closePath();
                cxt.restore();
        }


        //美化表盘，画中间的小圆
        cxt.save();
        cxt.translate(250, 250);
        cxt.beginPath();
        cxt.arc(0, 0, 13, 0, 360);
        cxt.fillStyle = "#f3a829";
        cxt.fill();
        cxt.closePath();
        cxt.restore();

        //显示时间
        cxt.save();
        cxt.translate(250, 250);
        cxt.font = "12px 微软雅黑";
        cxt.lineWidth = 2;
        cxt.fillStyle = "#000";
        var hours=now.getHours();  //重新定义变量接收整数的小时
        var mins=now.getMinutes();  //重新定义变量接收整数的分钟
        var str =( hours > 9 ? hours : ("0" + hours)) + ":" + (mins > 9 ? mins : ("0" + mins))+":" + (sec > 9 ? sec : ("0" + sec));
        cxt.fillText(str, -25, 125);
        cxt.restore();

    
        //MADE BY YLLG
         cxt.save();
        cxt.translate(250, 250);
        cxt.font = "  18px 微软雅黑";
        cxt.lineWidth = 3;
        cxt.fillStyle = "#444";
        cxt.fillText("MADE BY YLLG", -65, 100);
        cxt.restore();


         drawText("12",-10,-150);
         drawText("11",-90,-130);
         drawText("1",85,-130);
         drawText("10",-145,-70);
         drawText("2",130,-70);
         drawText("9",-160,10);
         drawText("3",150,10);
         drawText("8",-145,90);
         drawText("4",130,90);
         drawText("7",-85,140);
         drawText("5",75,140);
         drawText("6",-5,160);
         //显示数字的方法
        function drawText(text,x,y) {
                cxt.save();
                cxt.translate(250, 250);
                cxt.font = " bold 18px 微软雅黑";
                cxt.lineWidth = 3;
                cxt.fillStyle = "#000";
                cxt.fillText(text, x, y);
                cxt.restore();
          }

    }

	
