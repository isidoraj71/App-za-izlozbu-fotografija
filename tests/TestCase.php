<?php
namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase as BaseRefreshDatabase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    use BaseRefreshDatabase;

    /**
     * Set up the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Onemogućavanje middleware-a za autentifikaciju tokom testova
        $this->withoutMiddleware();
    }
}
