import { useEffect, useState } from "react";

import React, { useState, useEffect, useMemo } from "react";

// Card memoizzata per evitare render inutili
const PoliticianCard = React.memo(({ politician }) => {
    console.log("Render card:", politician.name);

    return (
        <div>
            <img
                src={politician.image}
                alt={politician.name}

            />
            <h2>{politician.name}</h2>
            <h4>{politician.position}</h4>
            <p>{politician.biography}</p>
        </div>
    );
});

export default function PoliticiansList() {
    const [politicians, setPoliticians] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:3333/politicians")
            .then((res) => {
                if (!res.ok) throw new Error("Errore fetch");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) setPoliticians(data);
                else setPoliticians([]);
            })
            .catch((err) => {
                console.error("Errore nel fetch:", err);
                setPoliticians([]);
            });
    }, []);

    // Lista filtrata memoizzata
    const filteredPoliticians = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return politicians.filter(
            (p) =>
                p.name.toLowerCase().includes(lowerSearch) ||
                p.biography.toLowerCase().includes(lowerSearch)
        );
    }, [politicians, searchTerm]);

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h1>Lista Politici</h1>

            <input
                type="text"
                placeholder="Cerca politici per nome o biografia"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "20px",
                    fontSize: "16px",
                }}
            />

            {filteredPoliticians.length > 0 ? (
                filteredPoliticians.map((politician) => (
                    <PoliticianCard key={politician.id} politician={politician} />
                ))
            ) : (
                <p>Nessun politico trovato.</p>
            )}
        </div>
    );
}
