<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KorisnikResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ime' => $this->ime,
            'prezime' => $this->prezime,
            'email' => $this->email,
            'uloga' => new UlogaResource($this->whenLoaded('uloga')),
        ];
    }
}

