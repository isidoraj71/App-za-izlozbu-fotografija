<?php

namespace Database\Factories;

use App\Models\Korisnik;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class KorisnikFactory extends Factory
{
    protected $model = Korisnik::class;

    public function definition()
    {
        return [
            'ime' => $this->faker->firstName,
            'prezime' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'lozinka' => bcrypt('password123'),
            'uloga_id' => \App\Models\Uloga::factory(),  // Povezivanje sa Uloga
        ];
    }
}
