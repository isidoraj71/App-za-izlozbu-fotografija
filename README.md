# App-za-izlozbu-fotografija
Web aplikacija koja korisnicima omogućava pregled različitih galerija i izložbi, kao i prijavu na iste. 

Opis
Aplikacija pruža pregled raznovrsnih izložbi i galerija, uz diferenciran pristup u zavisnosti od statusa korisnika. Neulogovani posetioci mogu videti osnovni prikaz svake izložbe kroz jednu fotografiju, dok ulogovani korisnici imaju pristup kompletnim galerijama i mogućnost prijave za izložbe. Po uspešnoj prijavi, korisnici dobijaju potvrdu putem mejla sa generisanim QR kodom za ulaz. Izložbe je moguće filtrirati po datumu, a svaka je prikazana na zasebnoj stranici pomoću paginacije.

Glavne funkcionalnosti

Korisnici:
Registracija i prijava na platformu.
Pregled različitih galerija i izložbi.
Prijava na izložbe.
Prijem digitalnih potvrda sa QR kodovima za prijavu na izložbe.

Umetnici:
Registracija i prijava kao umetnici.
Postavljanje i objavljivanje fotografija u okviru izložbi.
Pregled svih svojih objavljenih fotografija za sve izložbe.
Upravljanje izložbama na kojima učestvuju.

Administratori:
Pregled svih naloga na platformi.
Brisanje i menjanje informacija naloga.
Pregled i brisanje objavljenih fotografija.

Tehnologije:
Frontend: React.js
Backend: Laravel
Autentifikacija: JWT tokeni
Baza podataka: MySQL
Slanje mejlova: Mailtrap (za generisanje i slanje digitalnih potvrda sa QR kodovima)

Kako koristiti:
Instalacija:
Klonirajte repozitorijum na lokalni računar.
Pokrenite composer install za instalaciju PHP zavisnosti.
Pokrenite npm install za instalaciju JavaScript zavisnosti.
Konfigurišite .env fajl za lokalnu bazu podataka i Mailtrap.
Pokretanje aplikacije:
Pokrenite backend koristeći php artisan serve.
Pokrenite frontend koristeći npm run dev.
Otvorite aplikaciju u svom pregledaču na http://localhost:8000.
Dodatne napomene:
Aplikacija koristi JWT autentifikaciju za bezbednu prijavu korisnika, kao i funkcionalnost generisanja QR kodova za potvrde. Prilikom registracije umetnika, omogućeno je postavljanje slika, a posetioci mogu da se prijavljuju na izložbe.

