<?php

namespace App\Http\Controllers;

use App\Models\Fotografija;
use App\Http\Resources\FotografijaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class FotografijaController extends Controller
{
    public function index()
    {
        $korisnik = JWTAuth::parseToken()->authenticate();

        if ($korisnik->uloga->naziv === 'ADMINISTRATOR') {
            $fotografije = Fotografija::all();
            return FotografijaResource::collection($fotografije);
        }

        return response()->json(['message' => 'Nemate dozvolu da vidite sve fotografije'], 403);
    }

    public function show($id)
    {
        $fotografija = Fotografija::findOrFail($id);
        return new FotografijaResource($fotografija);
    }

    public function store(Request $request)
    {
        $korisnik = JWTAuth::parseToken()->authenticate();

        $data = $request->validate([
            'naziv'           => 'required|string|max:255',
            'opis'            => 'required|string',
            'datum_kreiranja' => 'required|date',
            'tehnika'         => 'required|string|max:255',
            'izlozba_id'      => 'required|exists:izlozbe,id',
            'slika'           => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $slikaPutanja = $request->file('slika')->store('fotografije', 'public');
        $data['slika'] = $slikaPutanja;
        $data['korisnik_id'] = $korisnik->id;

        $fotografija = Fotografija::create($data);

        return response()->json([
            'message'     => 'Fotografija uspešno dodata!',
            'fotografija' => new FotografijaResource($fotografija)
        ], 201);
    }

    public function mojeFotografije() {
        $korisnik = JWTAuth::parseToken()->authenticate();
    
        $fotografije = Fotografija::where('korisnik_id', $korisnik->id)->get();
    
        return FotografijaResource::collection($fotografije);
    }

    public function update(Request $request, $id)
    {
        $korisnik = JWTAuth::parseToken()->authenticate();
        $fotografija = Fotografija::findOrFail($id);

        if ($fotografija->korisnik_id !== $korisnik->id) {
            return response()->json(['message' => 'Nemate dozvolu da ažurirate ovu fotografiju'], 403);
        }

        $data = $request->validate([
            'naziv'           => 'sometimes|required|string|max:255',
            'opis'            => 'sometimes|required|string',
            'datum_kreiranja' => 'sometimes|required|date',
            'tehnika'         => 'sometimes|required|string|max:255',
            'izlozba_id'      => 'sometimes|required|exists:izlozbe,id',
            'slika'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('slika')) {
            Storage::disk('public')->delete($fotografija->slika);
            $data['slika'] = $request->file('slika')->store('fotografije', 'public');
        }

        $fotografija->update($data);

        return new FotografijaResource($fotografija);
    }

    public function destroy($id)
    {
        $korisnik = JWTAuth::parseToken()->authenticate();
        $fotografija = Fotografija::findOrFail($id);

        if ($fotografija->korisnik_id !== $korisnik->id) {
            return response()->json(['message' => 'Nemate dozvolu da obrišete ovu fotografiju'], 403);
        }

        Storage::disk('public')->delete($fotografija->slika);
        $fotografija->delete();

        return response()->json(['message' => 'Fotografija uspešno obrisana'], 204);
    }
}


