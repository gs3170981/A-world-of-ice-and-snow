function load(){
	var img=$("img"),p=0;
	var timer=setInterval(function(){
		for(var i=0;i<img.length;i++)
		if(img[i].complete)p++;
		if(p==img.length){
			clearInterval(timer);
			$('body').removeClass('overflow');
			$('#header').animate({'opacity':'0'},'slow')
			$('#header').hide('slow')
		}else p=0;
	},1000)
}
$(document).ready(function(){
	
//	complete
	
	//初始化
	var windowW=$(window).width();
	
	var Book=$("img[name='Book']"),BookMid=($(window).width()-$(Book[0]).width())/2;
	//Book-left值
	var BookPos=[BookMid,BookMid+280,BookMid+470,BookMid+470,BookMid+660,BookMid+600,BookMid+600,BookMid+500,BookMid,BookMid+670,BookMid,BookMid+420,BookMid,BookMid];
	var BookL=[],BookH=[],BookW=[],ScrTop=0;//初始拉伸值
	for(var i=0;i<Book.length;i++){
		$(Book[i]).css('left',BookPos[i]);
		BookL[i]=$(Book[i]).offset().left;
		BookH[i]=$(Book[i]).height();
		BookW[i]=$(Book[i]).width();
	}
	$(document).scrollTop(0);
	//窗口拉伸
	window.onresize=function(){
		windowW=$(window).width()-windowW;

		//偏移量计算
		for(var i=0;i<Book.length;i++){
			BookMid=windowW/2+$(Book[i]).offset().left;
			$(Book[i]).css('left',BookMid);
			BookL[i]=$(Book[i]).offset().left+ScrTop/ScrTopL[i];
		}
		windowW=$(window).width();
	}
	var ScrTopH=[],ScrTopL=[1,3,4,4,4,6.5,6.8,7,0,9,0,10,0],ScrTopT=[];//ScrTopL为必填项(onresize移动后的自增基础值)
	var Screen=4,ScreenTwo=4;//移动自增
	var UpDown=0,parScrTop=0;//判断上下
    var ScrTopOld=100;
	
	//Scroll滚动
	$(window).scroll(function(){
		ScrTop=$(document).scrollTop()*Screen;

		if(ScrTop<2000){
			ScrTopH[0]=1-$(document).scrollTop()/400/1.27
			ScrTopL[0]=ScrTopH[0]*2
		}else {
			ScrTopH[0]=0.1
			ScrTopL[0]=ScrTopH[0]*2
		}
		if(ScrTop<4800){
			ScrTopH[1]=3-$(document).scrollTop()/400
			ScrTopL[1]=ScrTopH[1]*2-(ScrTopH[1]*2)/100;//微偏移
		}else {
			ScrTopH[1]=0.1
			ScrTopL[1]=ScrTopH[0]*2
		}
		if(ScrTop<4800){
			ScrTopH[2]=4-$(document).scrollTop()/400
			ScrTopL[2]=ScrTopH[2]*2+(ScrTopH[2]*2)*0.5;//微偏移
		}else {
			ScrTopH[2]=0.1
			ScrTopL[2]=ScrTopH[0]*2
		}
		if(ScrTop<6400){
			ScrTopH[3]=4-$(document).scrollTop()/400
			ScrTopL[3]=ScrTopH[3]*2;//微偏移
			
			ScrTopH[4]=4-$(document).scrollTop()/400/1.3
			ScrTopL[4]=ScrTopH[4]*2;//微偏移
			$(Book[3]).css('opacity',1-(2-ScrTopH[4]))

		}else {
			ScrTopH[3]=0.1
			ScrTopL[3]=ScrTopH[0]*2
			$(Book[3]).css('opacity',0)
			ScrTopH[4]=0.9
			ScrTopL[4]=ScrTopH[0]*2
		}
		if(ScrTop<7700){
		
			ScrTopH[5]=6.5-$(document).scrollTop()/400
			ScrTopL[5]=ScrTopH[5]*2+(ScrTopH[5]*2)*0.8;//微偏移
		
			ScrTopH[6]=6.8-$(document).scrollTop()/400
			ScrTopL[6]=ScrTopH[6]*2-(ScrTopH[6]*2)*0.6;//微偏移
			ScrTopH[7]=7-$(document).scrollTop()/400
			ScrTopL[7]=ScrTopH[7]*2-(ScrTopH[7]*2)*0.4;//微偏移
		}else {
			ScrTopH[5]=1.7
			ScrTopL[5]=ScrTopH[0]*2
			ScrTopH[6]=2
			ScrTopL[6]=ScrTopH[0]*2
			ScrTopH[7]=2
			ScrTopL[7]=ScrTopH[0]*2
		}
		if(ScrTop>=8000){
			$(Book[9]).css('top',-20+Math.abs(8000-ScrTop)*1.5)//500
			$(Book[11]).css('top',Math.abs(8000-ScrTop)*1.5/2)//500
			$(Book[12]).css('opacity',1-Math.abs(8000-ScrTop)*0.00045)//500
			$(Book[13]).css('top',-250+Math.abs(8000-ScrTop)*1.5/5)//500
			$(Book[8]).css('background-color','rgba(211,230,236,0)')
			$(Book[10]).css('background-color','rgba(211,230,236,0)')
		}else {
			$(Book[9]).css('top',-20);
			$(Book[11]).css('top',0);
			$(Book[12]).css('opacity',1);
			$(Book[13]).css('top',-250);
			
			$(Book[8]).css('background-color','rgba(211,230,236,'+(0.2+(0.1-$(document).scrollTop()/400)*0.04)+')')
			
			ScrTopH[9]=9-$(document).scrollTop()/400
			ScrTopL[9]=ScrTopH[9]*2;//微偏移

			$(Book[10]).css('background-color','rgba(211,230,236,'+(0.2+(0.1-$(document).scrollTop()/400)*0.04)+')')
			
			ScrTopH[11]=10-$(document).scrollTop()/400
			ScrTopL[11]=ScrTopH[11]*2;//微偏移
			
			ScrTopH[12]=0
			ScrTopL[12]=ScrTopH[12]*2;//微偏移
		}
		//大小
		for(var i=0;i<Book.length;i++){
			var HW=ScrTop/ScrTopH[i];
			$(Book[i]).css({
				height:HW/($(Book[i]).width()/$(Book[i]).height())+BookH[i],
				width:HW+BookW[i],
				left:BookL[i]-ScrTop/ScrTopL[i],
			})
		}
	})
})
