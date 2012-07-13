/* look at me failing at figuring out how to do mock ups.  Look at it.
var document = {};
document.appendChild = function() {
    return {};
};
var jQuery = function() {
    return {
        bind : function(to_call) {
               }
    };
};
var jQuery;
var localStorage;
*/
/*
 * ad_tester
 * https://github.com/benbreedlove/ad_tester
 *
 * Copyright (c) 2012 
 * Licensed under the MIT license.
 */
var Ad_Tester;
(function(jQuery) {
Ad_Tester = function(url, times) {
    var MILLISECONDS_IN_A_SECOND = 1000; //yeah probably unnecessary, but I hate magic numbers
    var ad_url = url;
    var iframe;
    //var is_testing_done = jQuery.Deferred();
    var times_test_run = 0;
    var times_to_test = times || 10;
    var times_taken = [];
    var start_time;
    var average_time;
    var median_time;
    var that;

    var get_median_from_list = function(array) {
        var mid_point = Math.floor(array.length / 2);
        array.sort();
        return array.length % 2 ?
            array[ mid_point ] ://odd 
            (array[ mid_point ] + array[ mid_point + 1 ]) / 2; //even
    };

    return ({
        'init': function() {
            times_taken = [];
            that = this;
//            is_testing_done = jQuery.Deferred();
            return that;
        },
        'run': function() {
            if (!iframe) { that.make(); }
            if (times_taken.length < times_to_test) {
                iframe.bind('load', that.mark_time);
                start_time = new Date().valueOf();
                iframe.attr( 'src', ad_url );
            } else {
                that.interpret_results();
                that.display_results();
                that.store_results();
            }
            return that;
        },
        'interpret_results' : function() {
            var total = 0;
            for (var i in times_taken) { total += times_taken[i]; }
            average_time  = (total / times_taken.length) / MILLISECONDS_IN_A_SECOND;
            median_time = get_median_from_list(times_taken) / MILLISECONDS_IN_A_SECOND;
        },
        'store_results' : function() {
            if (typeof(Storage) === 'undefined') {
                return;
            }
            var local_storage_array;
            console.log(localStorage['ad_tester_url_' + ad_url]);
            if (!localStorage['ad_tester_url_' + ad_url]
                    || localStorage['ad_tester_url_' + ad_url] == 'undefined'
            ) {
                local_storage_array = []
            } else {
                console.log('lolwut');
                local_storage_array = eval(localStorage['ad_tester_url_' + ad_url]);
            }
            var storage_time = new Date().valueOf();
            local_storage_array.push({
                'storage_time' : storage_time,
                'median_time' : median_time,
                'average_time': average_time
            });
            localStorage['ad_tester_url_' + ad_url] = JSON.stringify(local_storage_array);
            return;
        },
        'fetch_previous_results' : function() {
            if (typeof(Storage) === 'undefined') {
                return;
            }
            return eval(localStorage['ad_tester_url_' + ad_url]);
        },
        'make_previous_results' : function(previous) {
            var previous_results_holder = jQuery('<ol class="previous_results"></div>');
            for (var i = 0; i < previous.length; i++) {
                var previous_result = previous[i];
                previous_results_holder.append('<li class="previous_result_set">' +
                    '<span>At ' + new Date(previous_result.storage_time).toLocaleString() +
                    '</span><dt>Average Time</dt><dd>' +
                    previous_result.average_time +
                    '</dd><dt>Median Time</dt><dd>' +
                    previous_result.median_time + '</dd></li>'
                );
            }
            iframe.before(previous_results_holder);
        },
        'display_results' : function() {
            iframe.before(jQuery( '<h3>On average, ' + ad_url + ' took ' + 
                    average_time +' seconds.</h3>' + 
                    '<h3>The median load time for ' + ad_url + ' was ' + 
                    median_time +' seconds.</h3>' ));
        },
        'mark_time' : function() {
            var now = new Date().valueOf();
            times_taken.push( now - start_time );
            iframe.unbind('load');
            return that.run();
        },
        'iframe': function() {
            return iframe;
        },
        'make' : function() {
            if ( !that ) {
                this.init();
            }
            iframe = jQuery('<iframe></iframe>');
            jQuery('body').append(iframe);
            var previous = that.fetch_previous_results();
            if (previous) { 
                iframe.before( that.make_previous_results(previous) ); 
            }
            return that;
        },
        'ad_url' : function(url) {
            if (url) {
                ad_url = url;
                return that;
            } else {
                return ad_url;
            }
        }
    }).init();
};
}(jQuery));
