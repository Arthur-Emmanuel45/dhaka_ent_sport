import { useState, useEffect } from 'react';

const UseVideos = () => {
    const [videos, setVideos] = useState([]);
    const [vloading, setVLoading] = useState(true);
    const [verror, setVError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setVLoading(true);
        fetch('http://localhost:5000/api/videos')
            .then(r => {
                if(!r.ok) throw new Error('Network response not ok');
                return r.json();
            })
        .then(data => { if(mounted){ setVideos(data); setVLoading(false); } })
        .catch(err => { if(mounted){ setVError(err); setVLoading(false); } });
        return () => { mounted = false };
    }, []);


    return { videos, vloading, verror };
}

export default UseVideos;