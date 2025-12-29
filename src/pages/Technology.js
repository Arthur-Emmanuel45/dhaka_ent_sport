import React from 'react';
import LeagueTable from '../components/LeagueTable';


// import CategoryGrid from '../components/CategoryGrid';
// import useArticles from '../hooks/useArticles';

const Technology = () => {

    // const { articles, loading, error } = useArticles();
    // if(loading) return <div>Loading...</div>;
    // if(error) return <div>Error loading articles.</div>;
    // const filtered = articles.filter(a => a.category === 'weekly news');

    return (
        <div>
            {/* <CategoryGrid title="TECHNOLOGY" articles={filtered} /> */}
            <h1>League Tables</h1>
            <LeagueTable />
        </div>
    );
}

export default Technology;