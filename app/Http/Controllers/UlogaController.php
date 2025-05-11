<?php

namespace App\Http\Controllers;

use App\Models\Uloga;
use App\Http\Resources\UlogaResource;
use Illuminate\Http\Request;

class UlogaController extends Controller
{
    public function index() {
        return UlogaResource::collection(Uloga::all());
    }

    public function show($id) {
        return new UlogaResource(Uloga::findOrFail($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'naziv' => 'required|in:ADMINISTRATOR,POSETILAC,UMETNIK',
        ]);

        $uloga = Uloga::create($data);
        return new UlogaResource($uloga);
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'naziv' => 'sometimes|required|in:ADMINISTRATOR,POSETILAC,UMETNIK',
        ]);

        $uloga = Uloga::findOrFail($id);
        $uloga->update($data);

        return new UlogaResource($uloga);
    }

    public function destroy($id) {
        $uloga = Uloga::findOrFail($id);
        $uloga->delete();

        return response(null, 204);
    }
}

