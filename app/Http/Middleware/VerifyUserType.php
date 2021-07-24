<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->type === "user") {
            return response()->json([
                'message' => 'Dados inválidos',
                'error' => 'Seu usuário sem permissão'
            ], 401);
        }
        return $next($request);
    }
}
