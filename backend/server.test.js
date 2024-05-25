const request = require('supertest');
const app = require('./server'); 

jest.mock('axios');
const axios = require('axios');

describe('API Endpoints', () => {
  it('should fetch posts', async () => {
    const posts = [{ id: 1, title: 'Post 1' }];
    axios.get.mockResolvedValue({ data: posts });

    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(posts);
  });

  it('should fetch a single post by ID', async () => {
    const post = { id: 1, title: 'Post 1' };
    axios.get.mockResolvedValue({ data: post });

    const res = await request(app).get('/api/posts/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(post);
  });

  it('should fetch comments', async () => {
    const comments = [{ id: 1, body: 'Comment 1' }];
    axios.get.mockResolvedValue({ data: comments });

    const res = await request(app).get('/api/comments');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(comments);
  });

  it('should fetch comments for a specific post', async () => {
    const comments = [{ id: 1, body: 'Comment 1' }];
    axios.get.mockResolvedValue({ data: comments });

    const res = await request(app).get('/api/posts/1/comments');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(comments);
  });
});
