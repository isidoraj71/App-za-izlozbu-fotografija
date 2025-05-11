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
        Schema::create('prijave', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('korisnik_id'); // Strani ključ ka korisnicima
            $table->unsignedBigInteger('izlozba_id'); // Strani ključ ka izložbama
            $table->foreign('korisnik_id')->references('id')->on('korisnici')->onDelete('cascade');
            $table->foreign('izlozba_id')->references('id')->on('izlozbe')->onDelete('cascade');
            $table->enum('status', ['AKTIVNA', 'PONIŠTENA', 'NA ČEKANJU'])->default('NA ČEKANJU');
            $table->dateTime('datum_prijave');
            $table->string('qr_kod');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prijave');
    }
};
