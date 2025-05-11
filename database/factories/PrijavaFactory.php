<?php

namespace Database\Factories;

use App\Models\Prijava;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrijavaFactory extends Factory
{
    protected $model = Prijava::class;

    public function definition()
    {
        return [
            'korisnik_id' => \App\Models\Korisnik::factory(),  // Povezivanje sa Korisnik
            'izlozba_id' => \App\Models\Izlozba::factory(),  // Povezivanje sa Izlozba
            'status' => $this->faker->randomElement(['AKTIVNA', 'ISTEKLA', 'PONIŠTENA']),
            'datum_prijave' => $this->faker->dateTime,
            'qr_kod' => $this->faker->uuid,
        ];
    }
}
