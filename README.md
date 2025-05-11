Aplikacija za izložbe fotografija
Opis
Aplikacija pruža pregled raznovrsnih izložbi i galerija, uz diferenciran pristup u zavisnosti od statusa korisnika. Neulogovani posetioci mogu videti osnovni prikaz svake izložbe kroz jednu fotografiju, dok ulogovani korisnici imaju pristup kompletnim galerijama i mogućnost prijave za izložbe. Po uspešnoj prijavi, korisnici dobijaju potvrdu putem mejla sa generisanim QR kodom za ulaz. Izložbe je moguće filtrirati po datumu, a svaka je prikazana na zasebnoj stranici pomoću paginacije

Glavne funkcionalnosti
Korisnici:
Registracija i prijava na platformu.
Pregled različitih galerija i izložbi.
Prijava na izložbe.
Prijem digitalnih potvrda sa QR kodovima za prijavu na izložbe.
KREDENCIJALI: jelena.jovanovic@example.com password456

Umetnici:
Registracija i prijava kao umetnici.
Postavljanje i objavljivanje fotografija u okviru izložbi.
KREDENCIJALI: nikola.nikolic@example.com password789

Administratori: 
Prijava kao administrator.
Pregled, brisanje i editovanje svih korisničnik profila.
Pregled i brisanje fotografija svih umetnika.
KREDENCIJALI: marko.markovic@example.com password123

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
Otvorite aplikaciju u svom pregledaču na http://localhost:8000
