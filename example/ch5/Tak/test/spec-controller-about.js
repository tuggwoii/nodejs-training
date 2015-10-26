'use strict';
describe('AboutController unit test:', function () {

    beforeEach(module('kion'));

    var scope;

    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.header = {};
        $controller('AboutController', {
            $scope: scope
        });
    }));

    it('Unit test onApplicationStart function', function () {
        expect(scope.onApplicationStart).toBeDefined();
        scope.onApplicationStart();
        expect(scope.detail.visible).toEqual(false);
    });

    it('Unit test openDetail function', function () {
        expect(scope.openDetail).toBeDefined();
        scope.openDetail({ url: '#history' });
        expect(scope.detail.visible).toEqual(true);
        scope.openDetail({ url: '#management' });
    });

    it('Unit test moveLeft function', function () {
        expect(scope.moveLeft).toBeDefined();
        scope.moveLeft();
    });

    it('Unit test moveRight function', function () {
        expect(scope.moveRight).toBeDefined();
        scope.moveRight();
    });

    it('Unit test preventTouch function', inject(function ($timeout, $httpBackend) {
        expect(scope.preventTouch).toBeDefined();
        scope.preventTouch();
        expect(scope.lock).toEqual(true);
        asynchronize.flushAsync($timeout, $httpBackend);
        asynchronize.flushAsync($timeout, $httpBackend);
        asynchronize.flushAsync($timeout, $httpBackend);
        expect(scope.lock).toEqual(false);
    }));

    it('Unit test onResize function', function () {
        expect(scope.onResize).toBeDefined();
        scope.onResize();
    });

});
