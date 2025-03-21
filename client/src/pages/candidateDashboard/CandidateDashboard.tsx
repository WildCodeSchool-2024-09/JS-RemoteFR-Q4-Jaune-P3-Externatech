// import "./candidateDashboard.css";

// import { useLoaderData } from "react-router-dom";
// import OfferCard from "../../components/Offer-card/OfferCard";
// import "./candidateDashboard.css";

// export default function CandidateDashboard() {

//   const { applies, offersRegistered } = useLoaderData();
//   console.info("condidature : ", applies);
//   console.info("offres enregistrées : ", offersRegistered);
//   return (
//     <>
//       <header className="headerCandidat">
//         <h1>Bienvenue </h1>
//       </header>
//       <main className="candidatDashboard">
//         <div className="apply">
//           <h2>Mes candidatures</h2>
//           <p className="offersCount">{applies.length}</p>
//         </div>
//         <div className="gradientBar" />
//         {applies.map((apply) => (
//           <OfferCard key={apply.id} offer={apply} />
//         ))}

//         <div className="apply">
//           <h2>Mes Offres enregistrées</h2>
//           <p className="offersCount">{offersRegistered.length}</p>
//         </div>
//         <div className="gradientBar" />
//         {offersRegistered.map((offer) => (
//           <OfferCard key={offer.id} offer={offer} />
//         ))}
//       </main>
//     </>
//   );
// }
