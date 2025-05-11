<?php

namespace Tests\Feature;

use App\Models\Uloga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UlogaFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_uloga_using_factory()
    {
        // Kreiraj ulogu
        $uloga = Uloga::factory()->create();

        // Testiraj da li je uloga kreirana
        $this->assertDatabaseHas('uloge', [
            'naziv' => $uloga->naziv,
        ]);
    }
}
