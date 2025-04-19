import { useState, useEffect } from "react";

const deepSkyObjects = [
  {
    name: "M31",
    ngc: "NGC 224",
    type: "Galaxie spirale",
    constellation: "Andromède",
    filter: "Dual Band",
    exposure: "180s",
    info: "La galaxie d'Andromède est la plus proche de la Voie lactée.",
    direction: "nord-est",
    months: ["août", "septembre", "octobre"],
    hours: ["22h", "2h"]
  },
  {
    name: "M42",
    ngc: "NGC 1976",
    type: "Nébuleuse diffuse",
    constellation: "Orion",
    filter: "Band",
    exposure: "120s",
    info: "Nébuleuse d'Orion, région active de formation d'étoiles.",
    direction: "sud-est",
    months: ["décembre", "janvier", "février"],
    hours: ["21h", "3h"]
  }
];

export default function App() {
  const [observations, setObservations] = useState({});
  const [direction, setDirection] = useState("");
  const [visibleNow, setVisibleNow] = useState([]);

  useEffect(() => {
    const now = new Date();
    const month = now.toLocaleString("fr-FR", { month: "long" });
    const hour = now.getHours();

    const visible = deepSkyObjects.filter(obj =>
      obj.months.includes(month.toLowerCase()) &&
      hour >= parseInt(obj.hours[0]) &&
      hour <= parseInt(obj.hours[1])
    );
    setVisibleNow(visible.map(v => v.name));
  }, []);

  const handleCheck = (name) => {
    setObservations({
      ...observations,
      [name]: {
        ...observations[name],
        observed: !observations[name]?.observed
      }
    });
  };

  const filteredObjects = direction
    ? deepSkyObjects.filter(obj => obj.direction === direction)
    : deepSkyObjects;

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🌌 Observations du ciel profond</h1>

      <label>
        Direction visible :
        <select value={direction} onChange={e => setDirection(e.target.value)}>
          <option value="">Toutes</option>
          <option value="nord">Nord</option>
          <option value="nord-est">Nord-Est</option>
          <option value="est">Est</option>
          <option value="sud-est">Sud-Est</option>
          <option value="sud">Sud</option>
          <option value="sud-ouest">Sud-Ouest</option>
          <option value="ouest">Ouest</option>
          <option value="nord-ouest">Nord-Ouest</option>
        </select>
      </label>

      {filteredObjects.map(obj => (
        <div key={obj.name} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem", borderRadius: "8px" }}>
          <h2>{obj.name} ({obj.ngc})</h2>
          <p><strong>Type :</strong> {obj.type}</p>
          <p><strong>Constellation :</strong> {obj.constellation}</p>
          <p><strong>Filtre :</strong> {obj.filter}</p>
          <p><strong>Direction :</strong> {obj.direction}</p>
          <p><strong>Observation idéale :</strong> {obj.months.join(", ")} entre {obj.hours[0]} et {obj.hours[1]}</p>
          <p><strong>Temps de pose :</strong> {obj.exposure}</p>
          <p>{obj.info}</p>

          {visibleNow.includes(obj.name) && <p style={{ color: "green" }}>✅ Actuellement visible depuis votre position</p>}

          <label>
            <input
              type="checkbox"
              checked={observations[obj.name]?.observed || false}
              onChange={() => handleCheck(obj.name)}
            />
            Déjà observé ?
          </label>

          {observations[obj.name]?.observed && (
            <div style={{ marginTop: "1rem" }}>
              <input type="date" placeholder="Date d'observation" /><br />
              <input type="text" placeholder="Temps d'observation (min)" /><br />
              <input type="text" placeholder="Nombre d'images" /><br />
              <input type="text" placeholder="Phase de la lune" /><br />
              <input type="text" placeholder="Lien vers la photo ou description" /><br />
              <label>
                <input type="checkbox" /> À refaire ?
              </label>
            </div>
          )}

          <p>
            🔭 <a href={`https://stellarium-web.org/skysource/${obj.ngc}`} target="_blank" rel="noreferrer">
              Voir dans Stellarium Web
            </a>
          </p>
        </div>
      ))}

      <div style={{ marginTop: "2rem" }}>
        <h3>✨ Événements du jour</h3>
        <ul>
          <li>Aurores possibles : activité solaire modérée</li>
          <li>Éclipses : Aucune aujourd'hui</li>
          <li>Comètes : C/2023 A3 visible à l'Est à 5h</li>
        </ul>
      </div>
    </div>
  );
}
Cmd + S
