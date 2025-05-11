<?php

namespace App\Http\Controllers;

use App\Models\Galerija;
use App\Http\Resources\GalerijaResource;
use Illuminate\Http\Request;

class GalerijaController extends Controller
{
    public function index() {
        return GalerijaResource::collection(Galerija::all());
    }

    public function show($id) {
        $galerija = Galerija::with('izlozbe')->findOrFail($id);
        return new GalerijaResource($galerija);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'slika' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('slika')) {
            $data['slika'] = $request->file('slika')->store('galerije', 'public');
        }

        $galerija = Galerija::create($data);
        return new GalerijaResource($galerija);
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'naziv' => 'sometimes|required|string|max:255',
            'opis' => 'sometimes|required|string',
            'slika' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $galerija = Galerija::findOrFail($id);

        if ($request->hasFile('slika')) {
            $data['slika'] = $request->file('slika')->store('galerije', 'public');
        }

        $galerija->update($data);
        return new GalerijaResource($galerija);
    }

    public function destroy($id) {
        $galerija = Galerija::findOrFail($id);
        $galerija->delete();

        return response(null, 204);
    }
}




