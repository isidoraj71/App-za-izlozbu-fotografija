<?php

namespace Database\Factories;

use App\Models\Izlozba;
use Illuminate\Database\Eloquent\Factories\Factory;

class IzlozbaFactory extends Factory
{
    protected $model = Izlozba::class;

    public function definition()
    {
        return [
            'naziv' => $this->faker->word,
            'tema' => $this->faker->word,
            'lokacija' => $this->faker->city,
            'datum_pocetka' => $this->faker->date,
            'datum_kraja' => $this->faker->date,
            'dostupna_mesta' => $this->faker->randomNumber(),
            'galerija_id' => \App\Models\Galerija::factory(),  // Povezivanje sa Galerija
        ];
    }
}
