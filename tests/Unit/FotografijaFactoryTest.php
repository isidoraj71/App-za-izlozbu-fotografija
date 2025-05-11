<?php


namespace Tests\Feature;

use App\Models\Fotografija;
use App\Models\Izlozba;
use App\Models\Galerija;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FotografijaFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_fotografija_using_factory()
    {
        // Kreiraj galeriju i izložbu
        $galerija = Galerija::factory()->create();
        $izlozba = Izlozba::factory()->create(['galerija_id' => $galerija->id]);

        // Kreiraj fotografiju
        $fotografija = Fotografija::factory()->create(['izlozba_id' => $izlozba->id]);

        // Testiraj da li je fotografija kreirana
        $this->assertDatabaseHas('fotografije', [
            'naziv' => $fotografija->naziv,
            'izlozba_id' => $izlozba->id,
        ]);
    }
}
