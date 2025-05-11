<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Dodaj ovo
use Illuminate\Database\Eloquent\Model;

class Galerija extends Model
{
    use HasFactory; // Dodaj HasFactory trait

    // Dodajemo naziv tabele kako bi se izbegle greške sa pluralizacijom
    protected $table = 'galerije'; // Tabela u bazi podataka je 'galerije'

    protected $fillable = ['naziv', 'opis', 'slika'];

    public function izlozbe()
    {
        return $this->hasMany(Izlozba::class, 'galerija_id');
    }
}
