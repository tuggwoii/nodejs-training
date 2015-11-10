$(document).ready(function () {
    var elms = $('.col-md-4');
    var max = elms.length;
    var count = 0;
    function animate() {
        var celement = $(elms[count]);
        if (count % 3 == 0) {
            celement.addClass('animated slideInLeft');
        }
        else {
            celement.addClass('animated slideInRight');
        }
        celement.animate({ opacity: "1" }, 800);
        setTimeout(function () {
            celement.removeClass('slideInLeft');
            celement.removeClass('slideInRight');
            celement.addClass('pulse');
        }, 1000);
        count++;
        if (count < max) {
            setTimeout(function () {
                animate();
            }, 500);
        }
    }
    setTimeout(function () {
        animate();
    }, 1500);
});