<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registruj bilo koju aplikacijsku uslugu.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Podesi sve servise u aplikaciji.
     *
     * @return void
     */
    public function boot()
    {
        // Podesi Simple QrCode da koristi 'svg' umesto 'imagick'
        QrCode::format('png'); // Alternativno: 'svg' ako hoćeš vektorski kod

        // Registruj sve API rute
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));
    }
}

