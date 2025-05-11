<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject; // Dodaj JWT interfejs
use App\Models\Uloga;
use App\Models\Prijava;

class Korisnik extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory;

    protected $table = 'korisnici';
    protected $primaryKey = 'id';

    protected $fillable = [
        'ime', 'prezime', 'email', 'lozinka', 'uloga_id',
    ];

    protected $with = ['uloga'];

    protected $attributes = [
        'uloga_id' => 2,
    ];

    public function prijave()
    {
        return $this->hasMany(Prijava::class);
    }

    public function uloga()
    {
        return $this->belongsTo(Uloga::class, 'uloga_id');
    }

    public function getAuthPassword()
    {
        return $this->lozinka;
    }

    // Implementacija JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}


