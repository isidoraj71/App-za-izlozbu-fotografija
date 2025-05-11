<?php

namespace Database\Factories;

use App\Models\Fotografija;
use Illuminate\Database\Eloquent\Factories\Factory;

class FotografijaFactory extends Factory
{
    protected $model = Fotografija::class;

    public function definition()
    {
        return [
            'naziv' => $this->faker->word,
            'opis' => $this->faker->sentence,
            'datum_kreiranja' => $this->faker->date,
            'tehnika' => $this->faker->word,
            'izlozba_id' => \App\Models\Izlozba::factory(),  // Povezivanje sa Izlozba
        ];
    }
}
