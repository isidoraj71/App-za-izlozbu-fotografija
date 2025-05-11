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
        Schema::create('korisnici', function (Blueprint $table) {
            $table->id(); // Auto-increment id
            $table->string('ime');
            $table->string('prezime');
            $table->string('email')->unique();
            $table->string('lozinka');
            $table->timestamps();
        });

        // Dodajemo ulogu_id kao strani ključ sa ispravnim tipom
        Schema::table('korisnici', function (Blueprint $table) {
            $table->string('remember_token', 100)->nullable();
            // Prvo dodajemo 'unsignedBigInteger' za strani ključ
            $table->unsignedBigInteger('uloga_id')->default(2);  // Postavljena podrazumevana vrednost
            // Zatim dodajemo strani ključ koji se poziva na id iz tabele 'uloge'
            $table->foreign('uloga_id')->references('id')->on('uloge')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('korisnici', function (Blueprint $table) {
            $table->dropForeign(['uloga_id']); // Brisanje stranog ključa
            $table->dropColumn('uloga_id');    // Brisanje kolone uloga_id
            $table->dropColumn('remember_token'); // Brisanje remember_token kolone
        });

        Schema::dropIfExists('korisnici'); // Brisanje tabele korisnici
    }
};
