//=require get_started

/*jshint browser: true, strict: true, undef: true, jquery: true */
/*global define: false */

'use strict';

$(window).scroll(function() {
  if ($(this).scrollTop() > 1){
    $('.navbar-fixed-top').addClass('navbar-shrink');
  }
  else{
    $('.navbar-fixed-top').removeClass('navbar-shrink');
  }
});

/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
