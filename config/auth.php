<?php

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'korisnici',
    ],

    // 1) GUARDS
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'korisnici',
        ],

        'api' => [
            'driver' => 'jwt', // PROMENA: sa 'sanctum' na 'jwt'
            'provider' => 'korisnici',
        ],
    ],

    // 2) PROVIDERS
    'providers' => [
        'korisnici' => [
            'driver' => 'eloquent',
            'model' => App\Models\Korisnik::class,
        ],
    ],

    // 3) PASSWORDS (ako koristiš reset lozinke)
    'passwords' => [
        'korisnici' => [
            'provider' => 'korisnici',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];

