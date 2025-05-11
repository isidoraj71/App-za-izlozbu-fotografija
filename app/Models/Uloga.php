<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Korisnik; // Dodaj ovu liniju

class Uloga extends Model
{
    use HasFactory;

    protected $table = 'uloge';

    protected $fillable = ['naziv'];

    // Veza sa korisnicima (jedna uloga može imati više korisnika)
    public function korisnici()
    {
        return $this->hasMany(Korisnik::class, 'uloga_id'); 
    }
}
