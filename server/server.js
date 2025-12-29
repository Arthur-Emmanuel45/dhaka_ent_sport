const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve sample images and videos from server/public
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));
app.use('/logos', express.static(path.join(__dirname, 'public', 'logos')));



// Simple in-memory DB loaded from JSON file
const dataPath = path.join(__dirname, 'data', 'articles.json');
const videoPath = path.join(__dirname, 'data', 'videos.json');
const leagueTablesPath = path.join(__dirname, 'data', 'leagueTables.json');
const commentsPath = path.join(__dirname, 'data', 'comment.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const readvideo = () => JSON.parse(fs.readFileSync(videoPath, 'utf-8'));
const readleagueTable = () => JSON.parse(fs.readFileSync(leagueTablesPath, 'utf-8'));
const readComment = () => JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));

const writeComment = (data) => fs.writeFileSync(commentsPath, JSON.stringify(data, null, 2));

// API routes
app.get('/api/articles', (req, res) => {
    res.json(readData());
});

app.get('/api/videos', (req, res) => {
    res.json(readvideo());
});

app.get('/api/leagues', (req, res) => {
    res.json(readleagueTable());
});

app.get('/api/articles/:id', (req, res) => {
    const articles = readData();
    const a = articles.find(x => x.id === req.params.id);
    if (!a) return res.status(404).json({ error: 'Not found' });
    res.json(a);
});

app.get('/api/videos/:id', (req, res) => {
    const Videos = readvideo();
    const video = Videos.find(v => v.id === req.params.id);
    if (!video) return res.status(404).json({ error: 'Not found' });
    res.json(video);
});

app.get('/api/comments/:postId', (req, res) => {
    const comments = readComment();
    const filtered = comments.filter(
        c => c.postId === req.params.postId
    );
    res.json(filtered);
});

app.post('/api/comments', (req, res) => {
    const { postId, parentId, name, message } = req.body;

    if (!postId || !message) {
        return res.status(400).json({ error: 'Invalid comment data' });
    }

    const comments = readComment();

    const newComment = {
        id: Date.now().toString(),
        postId,
        parentId: parentId || null,
        name: name || 'Anonymous',
        message,
        likes: 0,
        dislike: 0,
        date: new Date().toISOString()
    };

    comments.push(newComment);
    writeComment(comments);

    res.status(201).json(newComment);
});

app.delete('/api/comments/:id', (req, res) => {
    let comments = readComment();

    comments = comments.filter(
        c => c.id !== req.params.id && c.parentId !== req.params.id
    );

    writeComment(comments);
    res.json({ success: true });
});

app.patch('/api/comments/:id/reaction', (req, res) => {
    const { type } = req.body;
    const comments = readComment();

    const comment = comments.find(c => c.id === req.params.id);
    if (!comment) return res.status(404).json({ error: 'Not found' });

    if (type === "like") comment.likes++;
    if (type === "dislike") comment.dislikes++;

    writeComment(comments);
    res.json(comment);
});



app.listen(PORT, () => console.log(`DEN backend running on http://localhost:${PORT}`));