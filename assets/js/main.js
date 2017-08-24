/*
	Escape Velocity by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				detach: false
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

	$('.js-order').click(function(){
		var $modal = $('#modal');
    $modal.find('.js-offer').hide();
    $modal.toggle();

		return false;
	})

	$('.js-order-offer').click(function(evt){
		var offer = $(evt.target).data('offer');
		var $modal = $('#modal');
		$modal.find('.js-offer').text(offer).show();
    $modal.toggle();

    return false;
	});

  $('.modal-wrapper').click(function(){
    var $modal = $('#modal');
    $modal.hide();
    $modal.find('.js-offer').text('')
    $('#thanks').hide();
    $('#modal-form').show();


    return false;
  })

	$('.js-modal-send').click(function() {
    var $modal = $('#modal');
		var fields = {
      site: 'eventuer.com',
      order: $modal.find('.js-offer').text(),
      name: $modal.find('#modal-contact-name').val(),
      contact: $modal.find('#modal-contact-email').val()
    };
		$.post('http://saymon.info/f.php', fields, function() {
			$('#thanks').show();
      $('#modal-form').hide();
		});

		return false;
  });

  $('.js-form-send').click(function() {
    var $form = $('#contact-form');
    var fields = {
      site: 'eventuer.com',
      name: $form.find('#contact-name').val(),
      contact: $form.find('#contact-email').val(),
      message: $form.find('#contact-message').val()
    };

    $.post('http://saymon.info/f.php', fields, function(){
      var $modal = $('#modal');
      $modal.show();
      $('#thanks').show();
      $('#modal-form').hide();
		})

		return false;
  })

})(jQuery);