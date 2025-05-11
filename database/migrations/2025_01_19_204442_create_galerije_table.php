<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('galerije', function (Blueprint $table) {
            $table->id(); // Automatski primarni ključ
            $table->string('naziv', 255); // Maksimalna duzina za naziv galerije
            $table->text('opis')->nullable(); // Omogućava prazne opise, ako je potrebno
            $table->string('slika')->nullable(); // ✅ Dodata kolona za naslovnu sliku galerije
            $table->timestamps(); // Automatski generiše created_at i updated_at kolone
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerije'); // Brisanje tabele galerije
    }
};

