module.exports = {
	run: function(http, port){
		
		var server = http.createServer(handleRequest);

		server.listen(port, function(){
			console.log("Server listening on: http://localhost:%s", port);
		});
		
		function handleRequest(request, response){
			var url = urlExtractor(request.url);
			
			if(url.path == '/hello'){
				hello(response, url.params);
			} else if (url.path == '/showparams'){
				viewParams(response, url.params);
			} else {
				notFound(response);
			}
		}
		
		function hello(response, params){
			response.end('today is: ' + params.day + ' already ' + params.name);
		};
		
		function viewParams(response, params){
			response.end(JSON.stringify(params));
		};
		
		function notFound(response, params){
			response.end('<h1>404</h1>');
		};
		
		function urlExtractor(url){
			var extracted = url.split('?');
			
			if(extracted[1]){
				var params = extracted[1].split('&').reduce(function(memo, param){
					var splitedParam = param.split('=');
					memo[splitedParam[0]] = splitedParam[1];
					return memo;
				}, {});
			};
			
			return {
				path: extracted[0].toLowerCase(),
				params: params
			};
		};
	}
	
};