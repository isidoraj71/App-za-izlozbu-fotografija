<?php

namespace Tests\Feature;

use App\Models\Izlozba;
use App\Models\Galerija;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IzlozbaFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_an_izlozba_using_factory()
    {
        // Kreiraj galeriju
        $galerija = Galerija::factory()->create();

        // Kreiraj izložbu
        $izlozba = Izlozba::factory()->create(['galerija_id' => $galerija->id]);

        // Testiraj da li je izložba kreirana
        $this->assertDatabaseHas('izlozbe', [
            'naziv' => $izlozba->naziv,
            'galerija_id' => $galerija->id,
        ]);
    }
}
