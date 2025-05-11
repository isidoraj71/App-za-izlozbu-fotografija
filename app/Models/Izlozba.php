<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Izlozba extends Model
{
    use HasFactory;

    protected $table = 'izlozbe';

    protected $fillable = [
        'naziv', 
        'tema', 
        'lokacija', 
        'datum_pocetka', 
        'datum_kraja', 
        'dostupna_mesta', 
        'galerija_id'
    ];

    // Veza sa galerijom – jedna izložba pripada jednoj galeriji.
    public function galerija()
    {
        return $this->belongsTo(Galerija::class); 
    }

    // Veza sa prijavama – jedna izložba može imati više prijava.
    public function prijave()
    {
        return $this->hasMany(Prijava::class); 
    }
    
    // NOVO: Veza – jedna izložba ima više fotografija.
    public function fotografije()
    {
        return $this->hasMany(Fotografija::class, 'izlozba_id');
    }
}

