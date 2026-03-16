import { useEffect, useState } from "react";
import { API_BASE } from "../components/apiBase";

const CACHE_KEY = "leagueTablesCache";
const CACHE_TTL = 1000 * 60 * 10; 

const useLeagueTable = () => {
    const [leagues, setLeagues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cached = null;
        try {
            cached = JSON.parse(localStorage.getItem(CACHE_KEY));
        } catch {
            localStorage.removeItem(CACHE_KEY);
        }

        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                setLeagues(data);
                setLoading(false);
                return;
            }
        }

        fetch(`${API_BASE}/api/leagues`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load leagues");
                return res.json();
            })
        .then(data => {
            const leaguesObj = {};

            data.competitions.forEach(l => {
                leaguesObj[l.id] = l;
            });

            setLeagues(leaguesObj);

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data: leaguesObj,
                    timestamp: Date.now()
                })
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

export default useLeagueTable;
