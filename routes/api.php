<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\IzlozbaController;
use App\Http\Controllers\PrijavaController;
use App\Http\Controllers\GalerijaController;
use App\Http\Controllers\FotografijaController;
use App\Http\Controllers\UlogaController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;

// Registracija i login
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LogoutController::class, 'logout'])->middleware('auth:api');

// JAVNO dostupne rute za izložbe i galerije
Route::get('/izlozbe', [IzlozbaController::class, 'index']);
Route::get('/izlozbe/{id}', [IzlozbaController::class, 'show']);
Route::get('/galerije', [GalerijaController::class, 'index']);
Route::get('/galerije/{id}', [GalerijaController::class, 'show']);

// Rute za ADMINISTRATORA
Route::middleware(['auth:api', 'role:ADMINISTRATOR'])->group(function () {
    Route::post('/izlozbe', [IzlozbaController::class, 'store']);
    Route::put('/izlozbe/{id}', [IzlozbaController::class, 'update']);
    Route::delete('/izlozbe/{id}', [IzlozbaController::class, 'destroy']);
    Route::post('/galerije', [GalerijaController::class, 'store']);
    Route::get('/fotografije', [FotografijaController::class, 'index']);
});

// Rute za autentifikovane korisnike
Route::middleware(['auth:api'])->group(function () {
    Route::get('/fotografije/{id}', [FotografijaController::class, 'show']);
    Route::get('/korisnici/me', function () {
        return response()->json(auth()->user());
    });

    Route::apiResource('korisnici', KorisnikController::class);
    Route::apiResource('prijave', PrijavaController::class);
    Route::apiResource('uloge', UlogaController::class);
});

// Rute za UMETNIKE
Route::middleware(['auth:api', 'role:UMETNIK'])->group(function () {
    Route::get('/moje-fotografije', [FotografijaController::class, 'mojeFotografije']);
    Route::post('/fotografije', [FotografijaController::class, 'store']);
    Route::put('/fotografije/{id}', [FotografijaController::class, 'update']);
    Route::delete('/fotografije/{id}', [FotografijaController::class, 'destroy']);
});

// POSETIOCI
Route::middleware(['auth:api', 'role:POSETILAC'])->group(function () {
    Route::get('/posetilac', function () {
        return response()->json(['message' => 'Welcome, Visitor!']);
    });
});

// Test ruta
Route::get('/test', function () {
    return response()->json(['message' => 'API radi!']);
});


