<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Izlozba;

class IzlozbaSeeder extends Seeder
{
    public function run()
    {
        Izlozba::create([
            'naziv' => 'Umetnost svetla',
            'tema' => 'Eksperimentisanje sa svetlom i senkama',
            'lokacija' => 'Beograd, Kulturni centar',
            'datum_pocetka' => now()->addDays(2),
            'datum_kraja' => now()->addWeeks(2),
            'dostupna_mesta' => 40,
            'galerija_id' => 1,
        ]);

        Izlozba::create([
            'naziv' => 'Zov prirode',
            'tema' => 'Priroda oko nas',
            'lokacija' => 'Novi Sad, Muzej fotografije',
            'datum_pocetka' => now()->addDays(10),
            'datum_kraja' => now()->addWeeks(3),
            'dostupna_mesta' => 60,
            'galerija_id' => 2,
        ]);

        Izlozba::create([
            'naziv' => 'Tragovi prošlosti',
            'tema' => 'Fotografije starih gradova i ruševina',
            'lokacija' => 'Niš, Stari hram',
            'datum_pocetka' => now()->addDays(5),
            'datum_kraja' => now()->addWeeks(1),
            'dostupna_mesta' => 20,
            'galerija_id' => 3,
        ]);
    }
}

