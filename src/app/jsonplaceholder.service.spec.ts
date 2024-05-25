import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonPlaceholderService } from './jsonplaceholder.service';

describe('JsonPlaceholderService', () => {
  let service: JsonPlaceholderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JsonPlaceholderService]
    });
    service = TestBed.inject(JsonPlaceholderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Obtener un array que no este vacío de posts', () => {
    const dummyPosts = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Lorem ipsum' },
      { userId: 1, id: 2, title: 'Post 2', body: 'Lorem ipsum' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne(`${service['baseURL']}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('Obtener un post por id especifico', () => {
    const dummyPost = { userId: 1, id: 1, title: 'Post 1', body: 'Lorem ipsum' };

    service.getPost(1).subscribe(post => {
      expect(post.id).toBe(1);
    });

    const request = httpMock.expectOne(`${service['baseURL']}/posts/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  });

  it('Obtener un array de comentarios de posts', () => {
    const dummyComments = [
      { postId: 1, id: 1, name: 'Comment 1', email: 'test1@example.com', body: 'Lorem ipsum' },
      { postId: 1, id: 2, name: 'Comment 2', email: 'test2@example.com', body: 'Lorem ipsum' }
    ];

    service.getComments().subscribe(comments => {
      expect(comments.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne(`${service['baseURL']}/comments`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyComments);
  });
});
