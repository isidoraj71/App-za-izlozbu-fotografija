<?php

namespace Tests\Feature;

use App\Models\Korisnik;
use App\Models\Izlozba;
use App\Models\Prijava;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PrijavaFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_prijava_using_factory()
    {
        // Kreiraj korisnika i izložbu
        $korisnik = Korisnik::factory()->create();
        $izlozba = Izlozba::factory()->create();

        // Kreiraj prijavu
        $prijava = Prijava::factory()->create([
            'korisnik_id' => $korisnik->id,
            'izlozba_id' => $izlozba->id,
        ]);

        // Testiraj da li je prijava kreirana
        $this->assertDatabaseHas('prijave', [
            'korisnik_id' => $korisnik->id,
            'izlozba_id' => $izlozba->id,
        ]);
    }
}
