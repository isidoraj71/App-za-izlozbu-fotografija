<?php
namespace App\Http\Controllers\Auth;

use App\Models\Korisnik;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validacija unetih podataka
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:korisnici,email',
            'lozinka' => 'required|string|min:8',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        // Kreiranje novog korisnika
        $user = Korisnik::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'lozinka' => Hash::make($request->lozinka),  // Hashed password
        ]);
    
        // Logovanje korisnika nakon registracije
        Auth::login($user);
    
        // Vraćanje odgovora sa statusom 201
        return response()->json(['message' => 'User registered and logged in successfully', 'user' => $user], 201);
    }
    
}
