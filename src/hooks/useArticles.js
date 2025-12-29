import React from 'react';
import { useState, useEffect } from 'react';

const UseArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch('http://localhost:5000/api/articles')
            .then(r => {
                if(!r.ok) throw new Error('Network response not ok');
                return r.json();
            })
        .then(data => { if(mounted){ setArticles(data); setLoading(false); } })
        .catch(err => { if(mounted){ setError(err); setLoading(false); } });
        return () => { mounted = false };
    }, []);


    return { articles, loading, error };
}

export default UseArticles;