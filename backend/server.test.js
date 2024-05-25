const request = require('supertest');
const express = require('express');
const axios = require('axios');
const app = express();

jest.mock('axios');

app.use(express.json());

app.use('/', require('./server'));

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
});
