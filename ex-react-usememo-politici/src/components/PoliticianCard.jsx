import { useEffect, useState } from "react";

export default function PoliticiansList() {
    const [politicians, setPoliticians] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/politicians")
            .then((res) => res.json())
            .then((data) => setPoliticians(data))
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    return (
        <div>
            {politicians.map((politician) => (
                <div key={politician.id}>
                    <img src={politician.image} alt={politician.name} />
                    <h2>{politician.name}</h2>
                    <h4>{politician.position}</h4>
                    <p>{politician.biography}</p>
                </div>
            ))}
        </div>
    );
}
