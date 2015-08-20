'use strict';
(function () {

    var Resource = function (indexUrl, detailUrl) {
        this.indexUrl = indexUrl;
        this.detailUrl = detailUrl;
    };

    Resource.prototype.getIndex = function (cb) {
        return $.ajax({
            url: this.indexUrl
        }).done(cb);
    };

    $(function () {
        var resource = new Resource();
        window.myResource = window.myResource || resource;
    });

})();
