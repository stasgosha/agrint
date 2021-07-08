jQuery(function($){



	$(window).scroll(function(){
	    if($('#true_loadmore').length){
		var bottomOffset = 4000; // отступ от нижней границы сайта, до которого должен доскроллить пользователь, чтобы подгрузились новые посты
		var data = {
			'action': 'loadmore1',
			'query': true_posts,
			'page' : current_page
		};

		if( $(document).scrollTop() > ($(document).height() - bottomOffset) && !$('body').hasClass('loading')){
			$.ajax({
				url:ajaxurl,
				data:data,
				type:'POST',
				beforeSend: function( xhr){
					$('body').addClass('loading');
				},
				success:function(data){
					if( data ) { 
						$('.articles-grid').append(data);
						$('body').removeClass('loading');
						current_page++;
					}
				}
			});
		}
		}
	});
});