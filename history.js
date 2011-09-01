var devDerbyHistoryDemo = {};
devDerbyHistoryDemo.defaults = {
	MAIN_CONTAINER : 'main-image'	
};
devDerbyHistoryDemo.history = {
	push : function(obj){
		var util = devDerbyHistoryDemo.util,
			title = obj.attr('title'), 
			src = obj.find('img').attr('src');
		var stateObj = { t: title,s:src };
		history.pushState(stateObj, "page 2", title);
		util.changeImage(src);
	}
}
devDerbyHistoryDemo.util = {
	getCurrentImage : function(){
		var cur = document.location.href.split(/\/+/g).pop().split('.')[0];
		if(cur!='index'){
			var imageName = 'images/'+cur.replace('-','')+'.jpg';
			this.changeImage(imageName);
		}else{
			this.changeImage('images/image1.jpg');
		}
	},
	addEvents : function(){
		var h = devDerbyHistoryDemo.history;
		$('.image-right').bind('click',function(){
			h.push($(this));
		});
	},
	changeImage : function(newSrc){
		var d = devDerbyHistoryDemo.defaults;
		$('#'+d.MAIN_CONTAINER).fadeOut('fast',function(){
			$('#'+d.MAIN_CONTAINER).attr('src',newSrc);
			$('#'+d.MAIN_CONTAINER).fadeIn('fast');
		});		
	}
};
devDerbyHistoryDemo.start = function(){
	var util = this.util;
	util.addEvents();
	util.getCurrentImage();
}

$(document).ready(function(){
	devDerbyHistoryDemo.start();
});
window.onpopstate = function(event){
	devDerbyHistoryDemo.util.getCurrentImage();
};
