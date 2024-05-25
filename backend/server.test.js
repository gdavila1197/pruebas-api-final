const request = require('supertest');
const app = require('./server');

jest.mock('axios');
const axios = require('axios');

describe('API endpoints', () => {
  it('debería obtener los posts', async () => {
    const posts = [{ id: 1, title: 'Post 1' }];
    axios.get.mockResolvedValue({ data: posts });

    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(posts);
  });

  it('debería obtener un post por ID', async () => {
    const post = { id: 1, title: 'Post 1' };
    axios.get.mockResolvedValue({ data: post });

    const res = await request(app).get('/api/posts/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(post);
  });

  it('debería obtener los comentarios', async () => {
    const comments = [{ id: 1, body: 'Comentario 1' }];
    axios.get.mockResolvedValue({ data: comments });

    const res = await request(app).get('/api/comments');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(comments);
  });

  it('debería obtener los comentarios de un post específico', async () => {
    const comments = [{ id: 1, body: 'Comentario 1' }];
    axios.get.mockResolvedValue({ data: comments });

    const res = await request(app).get('/api/posts/1/comments');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(comments);
  });

  it('debería manejar errores correctamente', async () => {
    axios.get.mockRejectedValue(new Error('Error al obtener los datos'));

    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(500);
    expect(res.text).toContain('Error al obtener los datos'); // Usamos toContain en lugar de toEqual
  });
});
