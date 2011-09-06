var devDerbyHistoryDemo = {
	defaults:{ mainContainer : 'main-image' },
	history:{
		push: function(title, src){
			window.history.pushState(src, title, title);
		}
	},
	init: function (settings) {
		var settings = $.extend(this.defaults, settings),
			_this = this,
			utils = {
				changeImage: function(newSrc) {
					with(settings) {
						var container = $("#"+mainContainer);
						container.fadeOut('fast', function() {
							container.attr('src', newSrc)
							container.fadeIn('fast');
						});
					}
				}
			};
		var firstImg = $(".image-right").live('click', function() {
			var obj = $(this),
				title = obj.attr('title'), 
				src = obj.find('img').attr('src');
			_this.history.push(title, src);
			utils.changeImage(src);
		}).eq(0).find('img').attr('src');
		window.onpopstate = function(event){
			var img = event.state;
			if (img == null) img = firstImg;
			utils.changeImage(img);
		};
	}
};

$(document).ready(function(){
	devDerbyHistoryDemo.init();
});
