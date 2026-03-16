import React, {useRef} from 'react';
import './ArticleCard.css';
import { Link } from 'react-router-dom';
import { API_BASE } from './apiBase';


const ArticleCard = ({article, variant = "default"}) => {
    const videoHoverRef = useRef(null);

    let hoverTimeout;

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            videoHoverRef.current?.play().catch(() => {});
        }, 150);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        videoHoverRef.current?.pause();
        videoHoverRef.current.currentTime = 0;
    };

    return (
        <article className={`card ${variant}`}>
            <Link to={`/article/${article.id}`} className="card-link">
                <div className="card-container">
                    <div className="card-video-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <video ref={videoHoverRef} className="page-video" muted playsInline>
                            <source src={`${API_BASE}${article.video}`} type="video/mp4" />
                        </video>
                    </div>
                    
                    <img className="post-image" src={`${API_BASE}${article.image}`} alt="post-image"/>
                    <div className="card-body">
                        <h3 className="card-title">{article.title}</h3>
                        <p className="card-excerpt">{article.excerpt}</p>
                    <div className="card-meta">{article.date} • {article.category}</div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default ArticleCard;
