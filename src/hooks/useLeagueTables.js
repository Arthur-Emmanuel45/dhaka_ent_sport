import { useEffect, useState } from "react";

const CACHE_KEY = "leagueTablesCache";
const CACHE_TTL = 1000 * 60 * 10; 

const UseLeagueTable = () => {
    const [leagues, setLeagues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                setLeagues(data);
                setLoading(false);
                return;
            }
        }

        fetch("http://localhost:5000/api/leagues")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load leagues");
                return res.json();
            })
        .then(data => {
            setLeagues(data);
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ data, timestamp: Date.now() })
            );
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, []);

    return { leagues, loading, error };
}

export default UseLeagueTable;
