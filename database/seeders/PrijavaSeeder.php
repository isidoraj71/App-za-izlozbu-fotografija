<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prijava;
use App\Models\Korisnik;
use App\Models\Izlozba;

class PrijavaSeeder extends Seeder
{
    public function run()
    {
        // Pronađi korisnike i izložbe za kreiranje prijava
        $korisnik1 = Korisnik::first(); // Prvi korisnik
        $korisnik2 = Korisnik::skip(1)->first(); // Drugi korisnik
        $izlozba1 = Izlozba::first(); // Prva izložba
        $izlozba2 = Izlozba::skip(1)->first(); // Druga izložba

        Prijava::create([
            'korisnik_id' => $korisnik1->id,
            'izlozba_id' => $izlozba1->id,
            'status' => 'AKTIVNA',
            'datum_prijave' => now(),
            'qr_kod' => 'QR12345', // Primer QR koda
        ]);

        Prijava::create([
            'korisnik_id' => $korisnik2->id,
            'izlozba_id' => $izlozba2->id,
            'status' => 'PONIŠTENA',
            'datum_prijave' => now()->subDays(2),
            'qr_kod' => 'QR54321', // Primer QR koda
        ]);
    }
}
