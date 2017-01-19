<?php namespace App\Http\Middleware;

/*use Closure;  
use Illuminate\Contracts\Routing\TerminableMiddleware;  */
use Illuminate\Support\Facades\Log;

class RequestLogger {

    public function handle($request, \Closure  $next)
	{
		return $next($request);
	}

	public function terminate($request, $response)
	{
		// Log::info('app.requests', ['request' => $request->all()]);
		// Log::info('app.requests', ['request' => $request->all()]);
		$action = $request->route() ? $request->route()->getActionName() : 'No Action';
		Log::info('start: vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
        Log::info('IP Address: '.$request->getClientIp());
        Log::info('Status Code: '.$response->getStatusCode());
        Log::info('User-Agent: ' . $request->header('user-agent'));
        Log::info('PATH: ' . $request->url());
        Log::info('ACTION: ' . $action);
        Log::info('Method: ' . $request->method());
        Log::info('REQUEST: ' . $request->path());
        $param = json_encode(array_except($request->all(), 'password'));
        Log::info('PARAMS: '. $param);
        Log::info('end: ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
	}

}