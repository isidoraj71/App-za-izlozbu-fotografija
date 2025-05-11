<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Uloga;

class UlogaSeeder extends Seeder
{
    public function run()
    {
        // Kreiraj osnovne uloge
        Uloga::create(['naziv' => 'ADMINISTRATOR']);
        Uloga::create(['naziv' => 'POSETILAC']);
        Uloga::create(['naziv' => 'UMETNIK']);
    }
}
