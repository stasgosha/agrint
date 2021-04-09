document.addEventListener('DOMContentLoaded', function(){

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

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
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M10 2L8 0 0 8.2l8 8.2 2-2-6.2-6.2L10 2z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M0 2l2-2 8 8.2-8 8.2-2-2 6.2-6.2L0 2z"/></svg></button>'
	}

	// Product page - steps slider
	$('.steps-slider').slick({
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

	// Product page - solutions slider
	$('.product-solutions-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		speed: 800,
		autoplay: true,
		autoplaySpeed: 5000,
		rtl: isRTL,
		// fade: true
	});

	// if ($(window).width() < 768) {
	// 	$('.home-section .section-grid').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	// 		$('.home-section [data-slick-index='+nextSlide+']').trigger('mouseenter').trigger('mouseleave');
	// 	});

	// 	$('.home-section .section-grid').slick({
	// 		slidesToShow: 3,
	// 		slidesToScroll: 1,
	// 		arrows: false,
	// 		dots: false,
	// 		infinite: true,
	// 		speed: 600,
	// 		centerMode: true,
	// 		centerPadding: 0,
	// 		autoplay: true,
	// 		autoplaySpeed: 5000,
	// 		rtl: isRTL
	// 	});

	// 	equalSlideHeight('.home-section .section-grid');
	// }

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 72;

		if ($(window).width() < 992) {
			offset = 56;
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