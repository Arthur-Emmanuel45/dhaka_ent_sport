import React from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import UseArticles from '../hooks/useArticles';
import UseVideos from '../hooks/useVideos';
import CommentSection from '../components/CommentSection';
import RecentPost from '../components/RecentPost';
import { API_BASE } from '../components/apiBase';

const Article = () => {
    const { id } = useParams();

    const { videos } = UseVideos();
    const { articles } = UseArticles();
 
    const video = videos.find(va => va.id === id);
    const article = articles.find(a => a.id === id);

    if(article) {
        return (
            <div className="article-main-container">
                <article className="article-page">
                    <h1 className="article-title">{article.title}</h1>
                    <div className="article-meta">{article.date} • {article.category}</div>
                    <div className="article-container">
                        <img className="article-image" src={`${API_BASE}${article.image}`} alt="article-image"/>
                    </div>
                    <div className="article-content">{article.content}</div>
                    <CommentSection />
                </article>
                <div className="main-right">
                    <RecentPost></RecentPost>
                </div> 
            </div>
        );
   }
    else if(video) {
        return (
            <div className="article-main-container">
                <article className="article-page">
                    <h1 className="article-title">{video.title}</h1>
                    <div className="article-meta">{video.date} • {video.category}</div>
                    <div className="article-container">
                        <video className="article-video" controls autoPlay>
                            <source src={`${API_BASE}${video.video}`} type="video/mp4" />
                        </video>
                    </div>
                    <div className="article-content">{video.content}</div>
                    <CommentSection postId={id} />
                </article>
                <div className="main-right">
                    <RecentPost></RecentPost>
                </div>            
            </div>
           
        );
    }else return <div>Article not found</div>

}

export default Article;
