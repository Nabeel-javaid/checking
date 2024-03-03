$(document).ready(function ()  {
    'use strict';

    // Trigger Bx Slider
    $('.bxslider').bxSlider({
        pager: false,
        auto: true
    });

    //Fill bx Slider Full Screen
    $('.bxslider').height($(window).height());
    $(window).resize(function () {
        $('.bxslider').height($(window).height());
    });


    // Adding Class Fixed
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 2) {
            $('header').addClass('fixed');
        } else  {
            $('header').removeClass('fixed');
        }
    });

    // Smooth Scrolling
        $(' ul li a').click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('#' + $(this).data('target')).offset().top
            }, 1000);
    });

    // Remove Class Hidden
    $('.feature button').click(function () {
        $('.feature .hidden').fadeIn(1000).removeClass('hidden');
        $(this).hide();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >= $('.about').offset().top ) {
            $('.top').fadeIn();
        } else {
            $('.top').fadeOut();
        }
    });
    $('.top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

});