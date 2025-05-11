<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GalerijaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'slika' => $this->slika ? asset('storage/' . $this->slika) : null,
            'izlozbe' => IzlozbaResource::collection($this->whenLoaded('izlozbe')),
        ];
    }
}


