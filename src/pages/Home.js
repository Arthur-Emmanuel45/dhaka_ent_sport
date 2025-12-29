import React from 'react';
import CategoryGrid from '../components/CategoryGrid';
import './Home.css';
import ArticleCard from '../components/ArticleCard';
import { Link } from 'react-router-dom';
import SlideShow from '../components/SlideShow';
import UseArticles from '../hooks/useArticles';

const Home = () => {

    const { articles, loading, error } = UseArticles();
    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error loading articles.</div>;
    const Warticles = articles.filter(a => a.category === 'weekly news');
    const SportEventArticles = articles.filter(se => se.category === 'sport event');
    const mainEvent = articles.find(me => me.id === "6");

    return (
        <div>
            <SlideShow articles={Warticles}></SlideShow>
            
            <div className='weekly-container'>
                <CategoryGrid title="WEEKLY UPDATE" articles={Warticles} />
                <Link to={"/weekly-Updates"} className="more-update-link">More Updates</Link>
            </div>

            <CategoryGrid title="LATEST" articles={Warticles} />

            <hr className="underline-top-header" />
            <h2>SPORT EVENTS</h2>
            <hr className="underline-header" />

            <div className="event-container">
                <div className="event-side-container left-border">
                    {SportEventArticles.map(sea => <ArticleCard key={sea.id} article={sea} variant="event-side-items"/>)}
                </div>
                <div className="event-middle-container">
                    {mainEvent && (<ArticleCard key={mainEvent.id} article={mainEvent} variant="event-middle-item"/>)}
                </div>
                <div className="event-side-container right-border">
                    {SportEventArticles.map(sea => <ArticleCard key={sea.id} article={sea} variant="event-side-items"/>)}
                </div>
            </div>
        </div>           
    );
}

export default Home;
