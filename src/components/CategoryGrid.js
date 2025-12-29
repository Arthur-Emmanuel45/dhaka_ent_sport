import React from 'react';
import ArticleCard from './ArticleCard';
// import Articles from '../data/articles';
import './CategoryGrid.css';

const CategoryGrid = ({title, articles}) => {

    // articles = Articles().articles;
    return (
        <section className="category-section">
            <hr className="underline-top-header" />
            <h2 className="category-title">{title}</h2>
            <hr className="underline-header" />
            <div className="grid">
                {articles.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
        </section>            
    );
}

export default CategoryGrid;
