<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IzlozbaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'tema' => $this->tema,
            'lokacija' => $this->lokacija,
            'datum_pocetka' => $this->datum_pocetka,
            'datum_kraja' => $this->datum_kraja,
            'dostupna_mesta' => $this->dostupna_mesta,
            'galerija' => new GalerijaResource($this->whenLoaded('galerija')),
            'fotografije' => FotografijaResource::collection($this->whenLoaded('fotografije')), // <== OVO JE NOVO
        ];
    }
}


