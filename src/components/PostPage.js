import React from 'react';
import ArticleCard from './ArticleCard';
import RecentPost from './RecentPost';
import './PostPage.css';


const PageLayout = ({articles}) => {
    return (
        <div className="pageLayout-container">
            <div className="pageLayout-items-container">
                {articles.map(a => <ArticleCard key={a.id} article={a} variant="pageLayout-style" />)}
            </div>

            <div className="main-right">
                <RecentPost></RecentPost>
            </div>
        </div>
    );
}

export default PageLayout;
