<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        try {
            $korisnik = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token nije validan ili nedostaje.'], 401);
        }

        \Log::info('CheckRole debug:', [
            'id' => optional($korisnik)->id,
            'email' => optional($korisnik)->email,
            'uloga' => optional($korisnik->uloga)->naziv
        ]);

        // Provera da li korisnik ima ulogu iz dozvoljenih
        if (!$korisnik || !$korisnik->uloga || !in_array($korisnik->uloga->naziv, $roles)) {
            return response()->json(['message' => 'Nemate dozvolu za pristup.'], 403);
        }

        return $next($request);
    }
}





