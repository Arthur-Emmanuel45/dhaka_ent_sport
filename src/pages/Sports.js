import React from 'react';
import PostPage from '../components/PostPage';
import UseArticles from '../hooks/useArticles';

const Sport = () => {
    const { articles, loading, error } = UseArticles();
    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error loading articles.</div>;
    return (
        <div>
            <h2 className="page-title">SPORT</h2>
            <hr className="post-header-underline" />

            <PostPage articles={articles}/>

        </div>
    );
}

export default Sport;
