import React from 'react';

function ONama() {
  return (
    <>
      {/* HERO SEKCIJA */}
      <div
        style={{
          position: 'relative',
          height: '100vh',
          backgroundImage: "url('/gallery-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(95%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px 60px',
            borderRadius: '10px',
            zIndex: 1,
          }}
        >
          <h1 className="text-white display-4 fw-bold m-0">O nama</h1>
        </div>
      </div>

      {/* SADRŽAJ STRANICE */}
      <div className="container py-5">
        {/* Dobrodošlica */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Dobro došli na platformu za ljubitelje fotografije</h5>
                <p className="card-text">
                  Naša aplikacija okuplja umetnike, fotografe i sve one koji cene vizuelnu umetnost.
                  Kreirali smo prostor u kom možete da izložite svoje radove, pregledate tuđe,
                  učestvujete u izložbama i povežete se sa zajednicom koja deli istu strast prema fotografiji.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misija i Vizija */}
        <div className="row text-center mb-5">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Naša misija</h5>
                <p className="card-text">
                  Podržavamo kreativnost i omogućavamo svakome da se izrazi kroz umetnost fotografije.
                  Verujemo da umetnost ima moć da inspiriše, edukuje i povezuje ljude širom sveta.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Naša vizija</h5>
                <p className="card-text">
                  Želimo da postanemo vodeća online zajednica za izložbe fotografija – dostupna svima. 
                  Umetnost je univerzalna, a naša vizija je da joj omogućimo prostor da raste i inspiriše.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Citat */}
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <blockquote className="blockquote">
              <p className="mb-0 fst-italic">
                "Umetnost ne menja svet. Ona menja ljude, a ljudi menjaju svet."
              </p>
              <footer className="blockquote-footer mt-2">Pablo Picasso</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}

export default ONama;






