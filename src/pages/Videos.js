import React from 'react';
import './Videos.css';
import ArticleCard from '../components/ArticleCard';
import RecentPost from '../components/RecentPost';
import UseVideos from '../hooks/useVideos';

const Videos = () => {
    const { videos, vloading, verror } = UseVideos();
    if(vloading) return <div>Loading...</div>;
    if(verror) return <div>Error loading articles.</div>;

    const fLWeekGoalVideos = videos.filter(fwg => fwg.smug === 'fweek goals');
    const sLWeekGoalVideos = videos.filter(swg => swg.smug === 'sweek goals');
    const fLMonthGoalVideos = videos.filter(fmg => fmg.smug === 'fmonth goals');
    const sLMonthGoalVideos = videos.filter(smg => smg.smug === 'smonth goals');

    return (
        <div className="article-main-container">
            <div className="main-left">
                <hr className="underline-top-header" />
                <h2>GOALS OF THE WEEK</h2>
                <hr className="underline-header" />
                <div className="flex">
                    {fLWeekGoalVideos.map(a => <ArticleCard key={a.id} article={a} variant="w-goals"/>)}
                </div>
                <div className="flex">
                    {sLWeekGoalVideos.map(a => <ArticleCard key={a.id} article={a} variant="w-goals"/>)}
                </div>

                <hr class="underline-top-header" />
                <h2>GOALS OF THE MONTH</h2>
                <hr class="underline-header" />
                <div className="flex">
                    {fLMonthGoalVideos.map(a => <ArticleCard key={a.id} article={a} variant="w-goals"/>)}
                </div>
                <div className="flex">
                    {sLMonthGoalVideos.map(a => <ArticleCard key={a.id} article={a} variant="w-goals"/>)}
                </div> 
            </div>

            <div className="main-right">
                <RecentPost></RecentPost>
            </div>

        </div>

    );
}

export default Videos;