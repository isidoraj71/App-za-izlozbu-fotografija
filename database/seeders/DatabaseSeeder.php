<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

/*class DatabaseSeeder extends Seeder
{
    public function run(): void
    {        
        \App\Models\Galerija::factory(2)->create();
        \App\Models\Izlozba::factory(2)->create();
        \App\Models\Fotografija::factory(5)->create();
        \App\Models\Prijava::factory(5)->create();
        \App\Models\Korisnik::factory(10)->create();
    }
}*/

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UlogaSeeder::class, 
            KorisnikSeeder::class,
            GalerijaSeeder::class,
            IzlozbaSeeder::class,
            PrijavaSeeder::class,
            FotografijaSeeder::class, 
           
        ]);
    }
}
