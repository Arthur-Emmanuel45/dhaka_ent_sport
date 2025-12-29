import React, {useState, useEffect } from 'react';
import './CommentSection.css';

const CommentSection = ({postId}) => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const buildTree = (comments, parentId = null) =>
    comments
    .filter(c => c.parentId === parentId)
    .map(c => ({
        ...c,
        replies: buildTree(comments, c.id)
    }));

    useEffect(() => {
        fetch(`http://localhost:5000/api/comments/${postId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
                setLoading(false);
            });
    }, [postId]);

    const handleSubmit = async () => {
        if (!message) return;

        const res = await fetch("http://localhost:5000/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, name, message })
        });

        const newComment = await res.json();
        setComments(prev => [...prev , newComment]);

        setName("");
        setMessage("");
    };

    return (
        <div id="comment">
            <div id="comment_item">
                <h2>
                    Leave a Comments (<span className="comment-count">{comments.length}</span>)
                </h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="details">
                        <input
                            type="text"
                            placeholder="Name"
                            className="comment_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <textarea
                        className="message"
                        placeholder="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <button type="button" className="submit" onClick={handleSubmit}>
                        Post Comment
                    </button>
                </form>

                {loading ? (
                    <p>Loading Comments...</p>
                ): (
                    <div
                    className="comment-post"
                    style={{
                    backgroundColor: comments.length ? "#bdbdbd" : "transparent",
                    }}
                >
                        {comments.map((c) => (
                        <div className="comment-container" key={c.id}>
                            <p className="comment-message">{c.message}</p>
                            <span className="comment-detile">{c.name}</span>
                            <span className="comment-detile">
                                {new Date(c.date).toLocaleString()}
                            </span>
                        </div>
                        ))}
                    </div>
                )}
               
            </div>
        </div>
  );
}


export default CommentSection;
