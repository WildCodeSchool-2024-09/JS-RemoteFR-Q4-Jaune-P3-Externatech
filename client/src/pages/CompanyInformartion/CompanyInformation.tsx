import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "./CompanyInformations.css";

export default function CompanyInformation() {
  const { revalidate } = useRevalidator();
  const location = useLocation();
  const company = useLoaderData() as CompanyData;

  const companyToUpdate = {
    name: company.name,
    logo: company.logo,
    description: company.description,
    email: company.email,
    siret: company.siret,
    address: company.address,
    postalCode: company.postalCode,
    city: company.city,
    size: company.size,
    website: company.website,
  };

  const [updatedCompany, setUpdatedCompany] = useState(companyToUpdate);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setUpdatedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/companies`,
        updatedCompany,
        {
          withCredentials: true,
        },
      );
      console.info("Données mises à jour avec succès !");
      toast.success("Données mises à jour avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      revalidate();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      toast.error("Erreur lors de la modification. Veuillez réessayer.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const renderEditableForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h2 className="title_CI">
          Mes <strong>MODIFICATIONS</strong>
        </h2>

        <section>
          <label htmlFor="company-name-update">Nom de l'entreprise:</label>
          <input
            className="form_CI"
            type="text"
            name="name"
            value={updatedCompany.name}
            onChange={handleInputChange}
          />
          <label htmlFor="company-logo-update">Logo de l'entreprise:</label>
          <input
            className="form_CI"
            type="text"
            name="logo"
            value={updatedCompany.logo}
            onChange={handleInputChange}
          />
          <label htmlFor="company-adress-update">Rue:</label>
          <input
            className="form_CI"
            type="text"
            name="address"
            value={updatedCompany.address}
            onChange={handleInputChange}
          />
          <label htmlFor="company-postalcode-update">Code postal:</label>
          <input
            className="form_CI"
            type="text"
            name="postalCode"
            value={updatedCompany.postalCode}
            onChange={handleInputChange}
          />
          <label htmlFor="company-city-update">Ville:</label>
          <input
            className="form_CI"
            type="text"
            name="city"
            value={updatedCompany.city}
            onChange={handleInputChange}
          />
          <label htmlFor="company-email-update">E-mail:</label>
          <input
            className="form_CI"
            type="email"
            name="email"
            value={updatedCompany.email}
            onChange={handleInputChange}
          />
          <label htmlFor="company-size-update">Taille de l'entreprise:</label>
          <select
            className="form_CI"
            name="size"
            defaultValue={updatedCompany.size}
            onChange={handleInputChange}
          >
            <option value="1-15">1-15</option>
            <option value="16-49">16-49</option>
            <option value="50-99">50-99</option>
            <option value="100-500">100-500</option>
            <option value="500+">500+</option>
          </select>
          <label htmlFor="company-website-update">Site web:</label>
          <input
            className="form_CI"
            type="text"
            name="website"
            value={updatedCompany.website}
            onChange={handleInputChange}
          />
          <label htmlFor="company-siret-update">Siret (14 chiffres):</label>
          <input
            className="form_CI"
            type="text"
            name="siret"
            value={updatedCompany.siret}
            onChange={handleInputChange}
          />
          <label htmlFor="company-description-update">Description:</label>
          <input
            className="form_CI"
            name="description"
            value={updatedCompany.description}
            onChange={handleInputChange}
          />

          <input type="submit" value="Enregistrer" className="colored-box" />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <button
            type="button"
            className="light-box"
            onClick={() => setIsEditing(!isEditing)}
          >
            Retour
          </button>
        </section>
      </form>
    );
  };

  return (
    <main className="container_CI">
      {!isEditing ? (
        <section>
          <h2 className="title_CI">
            Mes <strong>INFORMATIONS</strong>
          </h2>

          <p>Nom de l'entreprise:</p>
          <p className="form_CI">{company.name}</p>
          <p>Logo de l'entreprise:</p>
          <img
            className="form_CI logo"
            src={company.logo}
            alt={`logo de l'entreprise ${company.name}`}
          />
          <p>Rue:</p>
          <p className="form_CI">{company.address}</p>
          <p>Code postal:</p>
          <p className="form_CI">{company.postalCode}</p>
          <p>Ville:</p>
          <p className="form_CI">{company.city}</p>
          {location.pathname.endsWith("information") ? (
            <>
              <p>E-mail:</p>
              <p className="form_CI">{company.email}</p>
            </>
          ) : null}
          <p>Taille de l'entreprise:</p>
          <select className="form_CI" defaultValue={company.size}>
            <option value="1-15">1-15</option>
            <option value="16-49">16-49</option>
            <option value="50-99">50-99</option>
            <option value="100-500">100-500</option>
            <option value="500+">500+</option>
          </select>
          <p>Site web:</p>
          <p className="form_CI">{company.website}</p>
          <p>Siret (14 chiffres):</p>
          <p className="form_CI">{company.siret}</p>
          <p>Description:</p>
          <p className="form_CI">{company.description}</p>
          {location.pathname.endsWith("information") ? (
            <>
              <button
                type="button"
                className="colored-box"
                onClick={() => setIsEditing(true)}
              >
                Modifier mes informations
              </button>
            </>
          ) : null}
        </section>
      ) : (
        renderEditableForm()
      )}
    </main>
  );
}
