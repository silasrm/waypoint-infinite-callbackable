/*!
 Waypoints InfiniteCallbackable Scroll Shortcut - 0.0.1
 Copyleft!

 based on Waypoints Infinite Scroll Shortcut - 4.0.0
 Copyright Â© 2011-2015 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
 */
(function() {
    'use strict';

    var $ = window.jQuery;
    var Waypoint = window.Waypoint;

    /* http://imakewebthings.com/waypoints/shortcuts/infinite-scroll */
    function InfiniteCallbackable(options) {
        this.options = $.extend({}, InfiniteCallbackable.defaults, options);
        this.container = this.options.element;

        if (this.options.container !== 'auto') {
            this.container = this.options.container;
        }

        this.$container = $(this.container);
        this.noMore = false;

        if(!this.noMore) {
            this.setupHandler();
            this.waypoint = new Waypoint(this.options);
        }
    }

    /* Private */
    InfiniteCallbackable.prototype.setupHandler = function() {
        this.options.handler = $.proxy(function() {
            this.options.onBeforePageLoad();
            this.destroy();
            this.options.addLoadingClass();

            $.ajax({
                method: "GET",
                url: this.options.getUrl(),
                dataType: this.options.dataType
            })
            .done(
                $.proxy(
                    function(data) {
                        if(data.items.length == 0) {
                            this.noMore = true;
                        } else {
                            for(var i in data.items) {
                                var item = data.items[i];

                                if(typeof item !== 'undefined') {
                                    this.options.addCallback(item);
                                }
                            }
                        }

                        this.options.removeLoadingClass();

                        if(!this.noMore) {
                            this.waypoint = new Waypoint(this.options);
                        }

                        this.options.onAfterPageLoad(data.items);
                    },
                    this
                )
            )
            .fail(
                $.proxy(
                    function(jqXHR, textStatus) {
                        this.options.removeLoadingClass();
                    },
                    this
                )
            );
        }, this);
    }

    /* Public */
    InfiniteCallbackable.prototype.destroy = function() {
        if (this.waypoint) {
            this.waypoint.destroy();
        }
    }

    InfiniteCallbackable.defaults = {
        container: 'auto',
        dataType: 'json',
        getUrl: $.noop,
        addCallback: $.noop,
        addLoadingClass: $.noop,
        removeLoadingClass: $.noop,
        offset: 'bottom-in-view',
        onBeforePageLoad: $.noop,
        onAfterPageLoad: $.noop
    }

    Waypoint.InfiniteCallbackable = InfiniteCallbackable;
}());