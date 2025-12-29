import React from 'react';
import ArticleCard from './ArticleCard';
import './RecentPost.css';
import UseVideos from '../hooks/useVideos';
import UseArticles from '../hooks/useArticles';

const RecentPost = () => {
    const { videos} = UseVideos();


    const { articles } = UseArticles();


    const recentVideos = videos.filter(a => a.smug === 'fweek goals');
    const recentArticle = articles.filter(a => a.category === 'weekly news');



    return (
        <div>
            <div className="recent-post-container">
                <p className="recent-post-header">RECENT POST</p>
                {recentArticle.map(a => <ArticleCard key={a.id} article={a} variant="recent-post-style" />)}
            </div>

            <div className="recent-post-container">
                <p className="recent-post-header">VIDOES</p>
                {recentVideos.map(a => <ArticleCard key={a.id} article={a} variant="recent-Vpost-style" />)}
            </div>
        </div>
    );
}

export default RecentPost;
