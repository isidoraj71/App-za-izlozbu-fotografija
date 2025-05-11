<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Galerija;

class GalerijaSeeder extends Seeder
{
    public function run()
    {
        Galerija::create([
            'naziv' => 'Galerija Savremene umetnosti',
            'opis' => 'Galerija fokusirana na inovativne umetničke pravce i savremene stilove izražavanja.',
            'slika' => 'galerije/savremena.jpg',
        ]);

        Galerija::create([
            'naziv' => 'Galerija Prirode',
            'opis' => 'Posvećena lepotama prirode kroz oko fotografa i umetnika.',
            'slika' => 'galerije/priroda.jpg',
        ]);

        Galerija::create([
            'naziv' => 'Stari grad',
            'opis' => 'Tematska galerija o starim gradovima Evrope.',
            'slika' => 'galerije/stari_grad.jpg',
        ]);
    }
}

