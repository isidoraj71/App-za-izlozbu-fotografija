<?php

namespace Database\Factories;

use App\Models\Galerija;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalerijaFactory extends Factory
{
    protected $model = Galerija::class;

    public function definition()
    {
        return [
            'naziv' => $this->faker->word,
            'opis' => $this->faker->sentence,
        ];
    }
}
