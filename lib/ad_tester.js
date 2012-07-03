/*
 * ad_tester
 * https://github.com/benbreedlove/ad_tester
 *
 * Copyright (c) 2012 
 * Licensed under the MIT license.
 */

var Ad_Tester = function(url, times) {
    var ad_url = url;
    var iframe;
    var is_testing_done = jQuery.Deferred();
    var times_test_run = 0;
    var times_to_test = times || 10;
    var times_taken = [];

    return {
        'init': function() {
            var times_taken = [];
            times_test_run = 0;
            is_testing_done = jQuery.Deferred();
            return this;
        },
        'run': function() {
            if (times_test_run < times_to_test) {
            }
            return this;
        },
        'iframe': function() {
            return iframe;
        },
        'make' : function() {
            iframe = document.createElement('iframe');
            iframe.setAttribute('src', ad_url);
            document.appendChild(iframe);
            return this;
        },
        'store' : function() {
        },
        'ad_url' : function(url) {
            if (url) {
                ad_url = url;
                return this;
            } else {
                return ad_url;
            }
        }
    };
};

//I exist just for unit testing. Is there a better way to do this?
(function(exports) {
  exports.Ad_Tester = Ad_Tester;
}(typeof exports === 'object' && exports || this));
