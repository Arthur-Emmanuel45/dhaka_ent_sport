import React, {useState, useEffect } from 'react';
import './CommentSection.css';

const CommentSection = ({postId}) => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [replyTo, setReplyTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

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


    const submitReply = async (parentId) => {
        const res = await fetch("http://localhost:5000/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId,
                parentId,
                message: replyMessage
            })
        });

        const newReply = await res.json();
        setComments(prev => [...prev, newReply]);
        setReplyMessage("");
        setReplyTo(null);
    };

    const deleteComment = async (id) => {
        await fetch(`http://localhost:5000/api/comments/${id}`, {
            method: "DELETE"
        });
        setComments(prev =>
            prev.filter(c => c.id !== id && c.parentId !== id)
        );
    };

    const react = async (id, type) => {
        const res = await fetch(
            `http://localhost:5000/api/comments/${id}/reaction`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type })
            }
        );
        const updated = await res.json();

        setComments(prev =>
            prev.map(c => (c.id === id ? updated : c))
        );
    };


    const renderComments = (list) =>
        list.map(c => (
            <div key={c.id} className="comment-container">
                <p className="comment-message">{c.message}</p>

                <div className="comment-actions">
                    <span>{c.name}</span>

                    <button onClick={() => react(c.id, "like")}>
                        👍 {c.likes}
                    </button>

                    <button onClick={() => react(c.id, "dislike")}>
                        👎 {c.dislikes}
                    </button>

                    <button onClick={() => setReplyTo(c.id)}>Reply</button>

                    <button onClick={() => deleteComment(c.id)}>Delete</button>
                </div>

                {replyTo === c.id && (
                    <div className="reply-box">
                        <textarea
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        />
                        <button onClick={() => submitReply(c.id)}>
                        Post Reply
                        </button>
                    </div>
                )}

                {c.replies?.length > 0 && (
                    <div className="replies">
                        {renderComments(c.replies)}
                    </div>
                )}
            </div>
    ));


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
                    }}>
                        {renderComments(buildTree(comments))}
                    </div>
                )}
               
            </div>
        </div>
  );
}


export default CommentSection;
