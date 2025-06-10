// Entry point: App.tsx
import { useState } from "react";
import OutfitForm from "./components/OutfitForm";
import OutfitSuggestion from "./components/OutfitSuggestion";

export default function App() {
  const [outfitData, setOutfitData] = useState(null);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Outfit Suggestion App</h1>
      <OutfitForm onSubmit={setOutfitData} />
      {outfitData && <OutfitSuggestion data={outfitData} />}
    </main>
  );
}

// File: components/OutfitForm.tsx
import { useState } from "react";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const occasions = ["Casual", "Work", "Formal", "Sport"];
const genders = ["Male", "Female"];

export default function OutfitForm({ onSubmit }) {
  const [gender, setGender] = useState("Male");
  const [season, setSeason] = useState("Summer");
  const [occasion, setOccasion] = useState("Casual");
  const [preferredItem, setPreferredItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ gender, season, occasion, preferredItem });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Season</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)} className="w-full p-2 border rounded">
          {seasons.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Occasion</label>
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full p-2 border rounded">
          {occasions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Preferred Item (e.g. "blue jeans")</label>
        <input
          type="text"
          value={preferredItem}
          onChange={(e) => setPreferredItem(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Suggest Outfit</button>
    </form>
  );
}

// File: components/OutfitSuggestion.tsx
import { useEffect, useState } from "react";

export default function OutfitSuggestion({ data }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const query = `${data.gender} ${data.season} ${data.occasion} outfit with ${data.preferredItem}`;
    const unsplashUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(query)}`;
    setImageUrl(unsplashUrl);
  }, [data]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Suggested Outfit</h2>
      <p className="mb-4">Based on your selection: {data.gender}, {data.season}, {data.occasion}, starting from "{data.preferredItem}"</p>
      {imageUrl && <img src={imageUrl} alt="Suggested Outfit" className="rounded shadow max-w-full" />}
    </div>
  );
}

// File: index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// File: index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: sans-serif;
  background-color: #f9fafb;
}
