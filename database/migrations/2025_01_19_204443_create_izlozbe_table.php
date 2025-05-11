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
        Schema::create('izlozbe', function (Blueprint $table) {
            $table->id(); // Automatski primarni ključ
            $table->string('naziv'); // Možeš dodati maksimalnu dužinu: $table->string('naziv', 255);
            $table->string('tema'); // Isto kao i naziv
            $table->string('lokacija'); // Isto kao i naziv
            $table->date('datum_pocetka'); // Datum početka
            $table->date('datum_kraja'); // Datum kraja
            $table->integer('dostupna_mesta')->default(0); // Podrazumevana vrednost 0 za dostupna mesta
            $table->unsignedBigInteger('galerija_id'); // Definicija spoljneg ključa za galeriju
            $table->foreign('galerija_id')->references('id')->on('galerije')->onDelete('cascade'); // Spajanje sa tabelom galerije sa pravilom brisanja
            $table->timestamps(); // Automatski kreira created_at i updated_at kolone
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('izlozbe'); // Brisanje tabele
    }
};
