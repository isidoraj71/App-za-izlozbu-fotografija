<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fotografija extends Model
{
    use HasFactory;

    protected $table = 'fotografije';

    protected $fillable = [
        'naziv', 
        'opis', 
        'datum_kreiranja', 
        'tehnika', 
        'slika',
        'izlozba_id', 
        'korisnik_id'
    ];

    public function izlozba()
    {
        return $this->belongsTo(Izlozba::class, 'izlozba_id');
    }

    public function korisnik()
    {
        return $this->belongsTo(Korisnik::class, 'korisnik_id');
    }
}

