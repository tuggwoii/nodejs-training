app.factory('MenuService', function () {
    return {
		getMenu: function () {
			return [
				{ id: 1, title: 'Home', url: '/' },
				{ id: 2, title: 'About', url: '/' },
				{ id: 3, title: 'Contact', url: '/' }
			];
		}
	}
});