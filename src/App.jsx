import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navigacioni meni
import Pocetna from './pages/Pocetna';
import Izlozbe from './pages/Izlozbe';
import DetaljiIzlozbe from './pages/DetaljiIzlozbe';
import PrijavaNaIzlozbu from './pages/PrijavaNaIzlozbu';
import ONama from './pages/ONama';
import Greska from './pages/Greska';
import Galerije from './pages/Galerije';
import UlogujSe from './pages/UlogujSe';
import Registracija from './pages/Registracija';
import PregledKorisnika from './pages/PregledKorisnika';
import AzurirajKorisnika from './pages/AzurirajKorisnika';
import PregledPrijava from './pages/PregledPrijava';
import UpravljanjePrijavama from './pages/UpravljanjePrijavama';
import GalerijaDetalji from './pages/GalerijaDetalji';
import UmetnikPocetna from './pages/UmetnikPocetna';
import DodajFotografiju from './pages/DodajFotografiju';
import MojeFotografije from './pages/MojeFotografije';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <Navbar />
      <Layout> 
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/izlozbe" element={<Izlozbe />} />
        <Route path="/izlozba/:id" element={<DetaljiIzlozbe />} />
        <Route path="/prijava/:id" element={<PrijavaNaIzlozbu />} />
        <Route path="/galerije" element={<Galerije />} />
        <Route path="/uloguj-se" element={<UlogujSe />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/pregled-korisnika" element={<PregledKorisnika />} />
        <Route path="/o-nama" element={<ONama />} />
        <Route path="/pregled-prijava" element={<PregledPrijava />} />
        <Route path="/azuriraj-korisnika/:id" element={<AzurirajKorisnika />} />
        <Route path="/upravljanje-prijavama" element={<UpravljanjePrijavama />} />
        <Route path="/galerija/:id" element={<GalerijaDetalji />} />
        <Route path="/umetnik" element={<UmetnikPocetna />} />
        <Route path="/umetnik/dodaj-fotografiju" element={<DodajFotografiju />} />
        <Route path="/umetnik/moje-fotografije" element={<MojeFotografije />} />
        <Route path="*" element={<Greska />} />
        
      </Routes>
      </Layout>
    </div>
  );
}

export default App;