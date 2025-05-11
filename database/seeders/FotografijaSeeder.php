<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Fotografija;

class FotografijaSeeder extends Seeder
{
    public function run()
    {
        $fotografije = [
            [
                'naziv' => 'Planinska panorama',
                'opis' => 'Prelepa panorama planina.',
                'datum_kreiranja' => now()->subDays(12),
                'tehnika' => 'Digitalna',
                'slika' => 'fotografije/PlaninePejzaz.jpg',
                'izlozba_id' => 2,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Morski horizont',
                'opis' => 'Zalazak sunca na moru.',
                'datum_kreiranja' => now()->subDays(10),
                'tehnika' => 'Digitalna',
                'slika' => 'fotografije/MorePejzaz.jpg',
                'izlozba_id' => 2,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Vodopad',
                'opis' => 'Pogled na prirodni vodopad',
                'datum_kreiranja' => now()->subDays(8),
                'tehnika' => 'Analogna',
                'slika' => 'fotografije/vodopad.jpg',
                'izlozba_id' => 2,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Noćni grad',
                'opis' => 'Osvetljene ulice noću.',
                'datum_kreiranja' => now()->subDays(6),
                'tehnika' => 'Digitalna',
                'slika' => 'fotografije/gradnocu.jpg',
                'izlozba_id' => 3,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Most u sumrak',
                'opis' => 'Golden Gate most obasjan suncem pred zalazak',
                'datum_kreiranja' => now()->subDays(4),
                'tehnika' => 'Digitalna',
                'slika' => 'fotografije/most.jpg',
                'izlozba_id' => 3,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Kit',
                'opis' => 'Najveci sisar napravljen od sijalica',
                'datum_kreiranja' => now()->subDays(3),
                'tehnika' => 'Analogna',
                'slika' => 'fotografije/kit.jpg',
                'izlozba_id' => 1,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Svetlosno drvo',
                'opis' => 'Drvo pod led lampicama',
                'datum_kreiranja' => now()->subDays(2),
                'tehnika' => 'Digitalna',
                'slika' => 'fotografije/drvo.jpg',
                'izlozba_id' => 1,
                'korisnik_id' => 3,
            ],
            [
                'naziv' => 'Grad pod snegom',
                'opis' => 'Ulice grada prekrivene snegom.',
                'datum_kreiranja' => now()->subDays(1),
                'tehnika' => 'Analogna',
                'slika' => 'fotografije/sneg.jpg',
                'izlozba_id' => 3,
                'korisnik_id' => 3,
            ],
        ];

        foreach ($fotografije as $f) {
            Fotografija::create($f);
        }
    }
}


