<?php

namespace Tests\Feature;

use App\Models\Korisnik;
use App\Models\Uloga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KorisnikFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_korisnik_using_factory()
    {
        // Kreiraj ulogu
        $uloga = Uloga::factory()->create();

        // Kreiraj korisnika
        $korisnik = Korisnik::factory()->create(['uloga_id' => $uloga->id]);

        // Testiraj da li je korisnik kreiran
        $this->assertDatabaseHas('korisnici', [
            'ime' => $korisnik->ime,
            'uloga_id' => $uloga->id,
        ]);
    }
}
