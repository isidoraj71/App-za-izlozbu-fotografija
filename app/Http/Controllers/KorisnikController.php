<?php

namespace App\Http\Controllers;

use App\Models\Korisnik;
use App\Http\Resources\KorisnikResource;
use Illuminate\Http\Request;

class KorisnikController extends Controller
{
    public function index() {
        return KorisnikResource::collection(Korisnik::all());
    }

    public function show($id) {
        return new KorisnikResource(Korisnik::findOrFail($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:korisnici,email',
            'lozinka' => 'required|string|min:6',
        ]);

        $data['lozinka'] = bcrypt($data['lozinka']);
        $korisnik = Korisnik::create($data);
        return new KorisnikResource($korisnik);
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'ime' => 'sometimes|required|string|max:255',
            'prezime' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:korisnici,email,' . $id,
            'lozinka' => 'sometimes|required|string|min:6',
        ]);

        $korisnik = Korisnik::findOrFail($id);

        if (isset($data['lozinka'])) {
            $data['lozinka'] = bcrypt($data['lozinka']);
        }

        $korisnik->update($data);
        return new KorisnikResource($korisnik);
    }

    public function destroy($id) {
        $korisnik = Korisnik::findOrFail($id);
        $korisnik->delete();

        return response(null, 204);
    }
}
