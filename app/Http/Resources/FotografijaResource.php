<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FotografijaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'datum_kreiranja' => $this->datum_kreiranja,
            'tehnika' => $this->tehnika,
            'slika' => $this->slika ? asset('storage/' . ltrim($this->slika, '/')) : null,
            'izlozba' => new IzlozbaResource($this->whenLoaded('izlozba')),
            'korisnik' => new KorisnikResource($this->whenLoaded('korisnik')),
        ];
    }
}



