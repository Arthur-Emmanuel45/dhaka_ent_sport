import React from 'react';
import './ArticleCard.css';
import { Link } from 'react-router-dom';
import { API_BASE } from './apiBase';
import { hover } from '@testing-library/user-event/dist/hover';
import { Autoplay } from 'swiper/modules';

const ArticleCard = ({article, variant = "default"}) => {

    
    return (
        <article className={`card ${variant}`}>
            <Link to={`/article/${article.id}`} className="card-link">
                <div className="card-container" >
                    <video className="page-video" controls>
                        <source src={`${API_BASE}${article.video}`} type="video/mp4" />
                    </video>
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
