'use strict';
describe('AboutService unit test:', function () {

    beforeEach(module('kion'));

    var aboutService;

    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    beforeEach(inject(function (AboutService) {
        aboutService = AboutService;
    }));
	
	 beforeEach(inject(
    ['$compile', '$rootScope', function () {
        var html = '<div id=\'wordList\'><div><ul><li></li></ul></div></div><div id=\'alphabetList\'><div><ul><li class=\'word-group\' data-group=\'A\'></li></ul></div></div><div class=\'character\'>A</div>';
        angular.element(document.body).append(html);
    }]));

    it('Unit test setContent function', function () {
        expect(aboutService.setContent).toBeDefined();
        var content = { title: 'test', html: '<p>Test</p>' };
        aboutService.setContent(content);
    });

    it('Unit test getContent function', function () {
        expect(aboutService.getContent).toBeDefined();
        var content = { title: 'test', html: '<p>Test</p>' };
        aboutService.setContent(content);
        var getContent = aboutService.getContent();
        expect(getContent.title).toEqual('test');
        expect(getContent.html).toEqual('<p>Test</p>');
    });

    it('Unit test setBoxes function', function () {
        expect(aboutService.setBoxes).toBeDefined();
        var boxes = [{ title: 'box 1', url: '/b1' }, { title: 'box 2', url: '/b2' }];
        aboutService.setBoxes(boxes);
    });

    it('Unit test getBoxes function', function () {
        expect(aboutService.getBoxes).toBeDefined();
        var boxes = [{ title: 'box 1', url: '/b1' }, { title: 'box 2', url: '/b2' }];
        aboutService.setBoxes(boxes);
        var getBoxes = aboutService.getBoxes();
        expect(getBoxes.length).toEqual(2);
        expect(getBoxes[0].title).toEqual('box 1');
        expect(getBoxes[0].url).toEqual('/b1');
        expect(getBoxes[1].title).toEqual('box 2');
        expect(getBoxes[1].url).toEqual('/b2');
    });

    it('Unit test onLoaded function', function () {
        expect(aboutService.onLoaded).toBeDefined();
        var data = {
            rows: {
                length: 1,
                item: function () {
                    return {
                        boxes: [{ title: 'box 1', url: '/b1' }, { title: 'box 2', url: '/b2' }],
                        content: { html: '<p>content</p>' }
                    };
                }
            }
        };
        aboutService.onLoaded(data, function () { });
        data = 0;
        aboutService.onLoaded(data, function () { });
    });

});
