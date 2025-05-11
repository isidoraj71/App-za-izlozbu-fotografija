<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Korisnik;
use Illuminate\Support\Facades\Hash;

class KorisnikSeeder extends Seeder
{
    public function run()
    {
        // Kreiramo nekoliko korisnika
        Korisnik::create([
            'ime' => 'Marko',
            'prezime' => 'Marković',
            'email' => 'marko.markovic@example.com',
            'lozinka' => Hash::make('password123'),
            'uloga_id' => 1,  // Administrator (pretpostavljeni ID uloge)
        ]);

        Korisnik::create([
            'ime' => 'Jelena',
            'prezime' => 'Jovanović',
            'email' => 'jelena.jovanovic@example.com',
            'lozinka' => Hash::make('password456'),
            'uloga_id' => 2,  // Menadžer (pretpostavljeni ID uloge)
        ]);

        Korisnik::create([
            'ime' => 'Nikola',
            'prezime' => 'Nikolić',
            'email' => 'nikola.nikolic@example.com',
            'lozinka' => Hash::make('password789'),
            'uloga_id' => 3,  // Korisnik (pretpostavljeni ID uloge)
        ]);
    }
}
