document.addEventListener('DOMContentLoaded', function(){

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;
	const isPhone = $(window).width() < 768;

	if (isRTL) {
		$('.wpcf7').attr('dir','rtl');
	} else{
		$('.wpcf7').attr('dir','ltr');
	}

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// Fields
	$('.input-wrapper input').on('change keyup', function(e){
		if ($(this).val() !== '') {
			$(this).addClass('not-empty');
		} else{
			$(this).removeClass('not-empty');
		}
	});

	// 
	if ($(window).width() >= 1024) {
		$('.block-bottom-info .icons-item').hover(function(){
			$(this).find('.item-text').stop().slideDown(300);
		},function(){
			$(this).find('.item-text').stop().slideUp(300);
		});
	}

	// Wow
	new WOW().init();

	$('.wow-random-delay').each(function(i, el){
		$(el).attr('data-wow-delay', '0.'+(Math.floor(Math.random() * 4 + 2))+'s');
	});

	// Odometer
	window.odometerOptions = {
		auto: false,
		selector: '.odometer',
		format: '( ddd).dd',
		duration: 1500,
		theme: 'minimal',
		animation: 'count'
	};

	$(window).scroll(function(){
		var elem = $('.odometer');

		elem.each(function(){
			if ($(document).scrollTop() >= $(this).offset().top - $(window).height() * 0.9) {
				$(this).html($(this).data('val'));
			}
		});
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Previous slide"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.78 27.59"><path d="M4.76 13.8L15.2 24.23a1.96 1.96 0 010 2.79 1.99 1.99 0 01-2.8 0L.57 15.2a1.97 1.97 0 01-.05-2.72L12.39.58a1.97 1.97 0 012.8 2.78z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Next slide"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.78 27.59"><path d="M11.02 13.79L.58 3.36a1.96 1.96 0 010-2.79 1.99 1.99 0 012.8 0L15.2 12.4a1.97 1.97 0 01.06 2.72L3.38 27.01a1.97 1.97 0 01-2.8-2.78z"/></svg></button>'
	}

	// view-all-link
	$('.view-all-link').click(function(e){
		e.preventDefault();

		let target = $( 'li'+$(this).data('target') );

		target.addClass('active');

		target.on('mouseleave', function(){
			target.removeClass('active');
		})

		$(window).scroll(function(){
			target.removeClass('active');
		});
	});
	if (isPhone){ 
		//slider-mob-cards
		$('.slider-mob-cards').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 5000,
			rtl: isRTL,
			fade: true,
			responsive: [  
			{
				breakpoint: 575,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			} 
			]
		}); 
		$('.page-template-support .tabs-nav').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			swipe: false, 
			rtl: isRTL, 
			focusOnSelect: true, 
		}); 
	}
	// First screen slider
	$('.first-screen-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		speed: 800,
		autoplay: true,
		autoplaySpeed: 5000,
		rtl: isRTL,
		fade: true
	});

	// Product page - steps slider
	$('.steps-slider').each(function(i, slider){
		$(slider).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 5000,
			rtl: isRTL,
			fade: true
		});
 
		$(slider).find('.js-next-slide').click(function(e){
			e.preventDefault();

			$(slider).slick('slickNext');
		});

		$(slider).find('[data-go-to-slide]').click(function(e){
			e.preventDefault();

			$(slider).slick('slickGoTo', +$(this).data('go-to-slide') - 1);
		});
	});

	equalSlideHeight('.steps-slider');

	// Product page - solutions slider
	$('.product-solutions-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: true,
		infinite: true,
		speed: 800,
		autoplay: true,
		autoplaySpeed: 4000,
		rtl: isRTL,
		// fade: true
	});

	// Tree protection
	$('.tree-protection-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		rtl: isRTL,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: "unslick"
			}
		]
	});

	// Authors 
	$('.authors-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		rtl: isRTL,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	equalSlideHeight('.authors-slider');

	// Pests
	$('.pests-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: false,
		infinite: true,
		speed: 600,
		rtl: isRTL,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	equalSlideHeight('.pests-slider');

	// Tree protection
	$('.js-category-first-screen-slider-scope').each(function(i, el){
		$(el).find('.category-first-screen-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			dots: true,
			infinite: true,
			speed: 600,
			rtl: isRTL,
			...arrowsButtons,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						arrows: true,
						dots: false,
						appendArrows: $(el)
					}
				}, 
			]
		});

		equalSlideHeight( $(el).find('.category-first-screen-slider') );
	});
 
	//block-tab
	$('.block-tab .title').on('click', function(e){
		e.preventDefault();
		$(this).parent().toggleClass('on')
	}); 
	//Video HP start
	function videoHPStart()
	{
		let video = $(".home .big-video-section video").get(0); 
		calledTimes = 0;
		if(video){ 
			setInterval(function()
			{
				calledTimes++; 
				// if ( video.paused ) { 
				// 	$('.home .big-video-section .block-content').show();
				// } else { 
				// 	$('.home .big-video-section .block-content').hide();
				// }
				return false;
			}, 100); 
		}
	};   
	videoHPStart();
	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab'); 

		goToTab(dest, $(this));

		// $(dest).find('.slick-slider').slick('setPosition');
	});
	$(".page-template-support .tabs-nav .slick-arrow").click(function(e){
		e.preventDefault();
		let destTab = $(this).parents('.tabs-nav').find('.slick-current.slick-active [data-tab]'); 
		let dest = destTab.data('tab'); 

		goToTab(dest, $(this));
 
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});
	// Accordions
	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			$(el).find('> .ac-content').stop().slideToggle(300);
			// $(el).find('.slick-slider').slick('setPosition');
			$(el).toggleClass('opened');
		});

		if ($(el).hasClass('opened-on-load')) {
			$(el).find('.ac-header').trigger('click');
		}
	});
	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = $(window).width() * 0.055473;

		if ($(window).width() < 992) {
			offset = 68;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	if (isMobile) {
		$('.mobile-top-nav .menu-item-has-children > a').click(function(e){
			e.preventDefault();

			$(this).parent().toggleClass('opened');
			$(this).siblings().stop().slideToggle(300);
		});
	}

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 100
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	
	// Video
	$('.v-start:not([data-video-modal])').on('click', function() {
		let thise = $(this).parents('.video-section')
		thise.addClass('playing');
		thise.find('.block-overlay').fadeOut(300);

		let videoId = thise.find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = thise.data('video-id');
		}

		if (videoId == undefined) {
			thise.find('video')[0].play();
			thise.find('video').attr("controls", "controls");
		} else {
			let videoType = thise.data('video-type') ? thise.data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				thise.find('.block-video-container').append('<div class="video-iframe" id="' + videoId + '"></div>');
				createVideo(videoId, videoId);
			} else if (videoType == 'vimeo') {
				thise.find('.block-video-container').append('<div class="video-iframe" id="' + videoId + '"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/' + videoId + '?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}

	});
	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	$('[data-video-bg]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-bg');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$(this).closest('section').find('.block-video-container').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			$(this).closest('.big-video-block').addClass('playing');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$(this).closest('section').find('.block-video-container').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
			$(this).closest('.big-video-block').addClass('playing');
		}
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});


function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}