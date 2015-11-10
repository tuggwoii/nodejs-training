'use strict';
var app = angular.module('app', ['ngAnimate', 'ui.router', 'ui.sortable']);
var angularApp = {
    init: function () {
        $(document).ready(this.onReady);
    },
    onReady: function () {
        angular.bootstrap(document, ['app']);
    }
};
app.run();
angularApp.init();