(function ($) {
    var lookup = {
        minutes: 60,
        hours: 60 * 60,
        days: 24 * 60 * 60,
        weeks: 7 * 24 * 60 * 60
    };

    $(document).ready(function () {
        var $cbb = $(".block-cbb").each(function () {
            var $block = $(this);

            var blockId = $block.attr('id');
            console.log("Cookie based block: " + blockId);

            var cookieId = 'Drupal.cbb.' + blockId;
            var settings = Drupal.settings.cbb[blockId];
            //if (settings)
            if ($.cookie(cookieId) != '1') {

                var expires_data = settings.cbb_expose_after.split(' ');
                var steps = parseInt(expires_data[0]);
                var period = expires_data[1];

                var seconds = 60;

                if (lookup[period]) {
                    seconds = steps * lookup[period];
                }
                else if (lookup[period + 's']) {
                    seconds = steps * lookup[period + 's'];
                }

                var date = new Date();
                var nextMillisecs = date.getTime() + seconds * 1000;

                var cookieExpire = {expires: new Date(nextMillisecs)};

                $.cookie(cookieId, '1', cookieExpire);
                if (settings.cbb_use_colorbox && $.colorbox) {
                    $.colorbox({html: $block.html()});
                }
                else {
                    $block.show();
                }
            }
        });
    });
})(jQuery);
