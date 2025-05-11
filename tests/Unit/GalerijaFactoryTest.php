<?php

namespace Tests\Feature;

use App\Models\Galerija;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GalerijaFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_galerija_using_factory()
    {
        // Kreiraj galeriju
        $galerija = Galerija::factory()->create();

        // Testiraj da li je galerija kreirana
        $this->assertDatabaseHas('galerije', [
            'naziv' => $galerija->naziv,
        ]);
    }
}
