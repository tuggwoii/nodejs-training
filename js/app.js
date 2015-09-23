var app = angular.module('app', ['ngAnimate', 'ui.router']);
var sys = {
    module: {},
    onInit: function () {
        $(document).ready(this.onReady);
    },
    onReady: function () {
        angular.bootstrap(document, ['app']);
    }
};
sys.onInit();