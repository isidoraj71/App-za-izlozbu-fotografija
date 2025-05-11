<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Korisnik;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'lozinka' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Pokušaj autentifikacije
        $korisnik = Korisnik::where('email', $request->email)->first();

        if (!$korisnik || !Hash::check($request->lozinka, $korisnik->lozinka)) {
            return response()->json(['message' => 'Pogrešan email ili lozinka.'], 401);
        }

        // Generiši JWT token
        $token = JWTAuth::fromUser($korisnik);

        return response()->json([
            'message' => 'Uspešna prijava!',
            'token' => $token,
            'korisnik' => [
                'id' => $korisnik->id,
                'ime' => $korisnik->ime,
                'prezime' => $korisnik->prezime,
                'email' => $korisnik->email,
                'uloga' => $korisnik->uloga->naziv
            ]
        ]);
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::parseToken());
            return response()->json(['message' => 'Uspešno ste se odjavili.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Greška prilikom odjave.'], 500);
        }
    }
}
