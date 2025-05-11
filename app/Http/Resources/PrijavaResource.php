<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrijavaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'datum_prijave' => $this->datum_prijave,
            'qr_kod' => $this->qr_kod,
            'korisnik' => new KorisnikResource($this->whenLoaded('korisnik')),
            'izlozba' => new IzlozbaResource($this->whenLoaded('izlozba')),
        ];
    }
}

