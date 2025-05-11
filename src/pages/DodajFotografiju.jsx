import React, { useState, useEffect } from "react";
import axios from "axios";

function DodajFotografiju() {
  const [formData, setFormData] = useState({
    naziv: "",
    opis: "",
    datum_kreiranja: "",
    tehnika: "",
    izlozba_id: "",
    slika: null,
  });

  const [izlozbe, setIzlozbe] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [greska, setGreska] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/izlozbe", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setIzlozbe(res.data.data))
    .catch(() => setIzlozbe([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "slika") {
      setFormData({ ...formData, slika: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validirajFormu = () => {
    if (!formData.slika) {
      setGreska("Morate odabrati sliku.");
      return false;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(formData.slika.type)) {
      setGreska("Slika mora biti JPG ili PNG formata.");
      return false;
    }

    setGreska("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validirajFormu()) return;

    setLoading(true);
    setGreska("");
    setPoruka("");

    const token = localStorage.getItem("token");

    const podaci = new FormData();
    Object.entries(formData).forEach(([key, value]) => podaci.append(key, value));

    try {
      await axios.post("/api/fotografije", podaci, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setPoruka("Fotografija uspešno dodata!");
      setFormData({
        naziv: "",
        opis: "",
        datum_kreiranja: "",
        tehnika: "",
        izlozba_id: "",
        slika: null,
      });
    } catch (error) {
      setGreska("Greška pri dodavanju fotografije!");
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  const zatvoriModal = () => {
    setModalOpen(false);
    setPoruka("");
    setGreska("");
  };

  return (
    <div className="container my-5">
      <div className="card shadow border-0 p-4">
        <h2 className="mb-4 text-center">📷 Dodaj novu fotografiju</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Naziv fotografije *</label>
            <input
              type="text"
              className="form-control"
              name="naziv"
              value={formData.naziv}
              onChange={handleChange}
              required
              placeholder="Unesi naziv fotografije"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Opis fotografije *</label>
            <textarea
              className="form-control"
              name="opis"
              value={formData.opis}
              onChange={handleChange}
              required
              placeholder="Unesi opis fotografije"
            ></textarea>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Datum kreiranja *</label>
              <input
                type="date"
                className="form-control"
                name="datum_kreiranja"
                value={formData.datum_kreiranja}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Tehnika *</label>
              <input
                type="text"
                className="form-control"
                name="tehnika"
                value={formData.tehnika}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Izložba *</label>
            <select
              className="form-select"
              name="izlozba_id"
              value={formData.izlozba_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Izaberi izložbu --</option>
              {izlozbe.map((izl) => (
                <option key={izl.id} value={izl.id}>
                  {izl.naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Slika *</label>
            <input
              type="file"
              className="form-control"
              name="slika"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {loading ? "Slanje..." : "Dodaj fotografiju"}
            </button>
          </div>
        </form>
      </div>

      {/* MODAL za prikaz poruke */}
      {modalOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className={`modal-header ${poruka ? "bg-success" : "bg-danger"} text-white`}>
                <h5 className="modal-title">Obaveštenje</h5>
                <button type="button" className="btn-close btn-close-white" onClick={zatvoriModal}></button>
              </div>
              <div className="modal-body">
                <p className="text-center mb-0">{poruka || greska}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary w-100" onClick={zatvoriModal}>
                  U redu
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default DodajFotografiju;

