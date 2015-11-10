app.factory('MenuService', function () {
   
    return {
        getMenu: function () {
            return [
                { title: 'Home', url: '#/'},
                { title: 'CH 1: Get started', url: '#/getstarted'},
                { title: 'CH 2: Web server, Express', url: '#/webserver'},
                { title: 'CH 3: Web project', url: '#/webproject'},
                { title: 'CH 4: AngularJs on Node.js', url: '#/angularjs' },
                { title: 'CH 5: Database', url: '#/database' },
                { title: 'CH 6: RESTFul', url: '#/restful' }
            ];
        }
    }
});
