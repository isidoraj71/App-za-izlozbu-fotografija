<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('fotografije', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->text('opis');
            $table->date('datum_kreiranja');
            $table->string('tehnika');
            $table->string('slika'); // Dodato polje za sliku
            $table->foreignId('izlozba_id')->constrained('izlozbe')->onDelete('cascade');
            $table->foreignId('korisnik_id')->constrained('korisnici')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fotografije');
    }
};

