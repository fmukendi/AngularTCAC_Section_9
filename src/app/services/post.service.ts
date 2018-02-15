import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// https://sergeome.com/blog/2017/11/26/simply-about-new-httpclient-in-angular/
@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
     return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(id, data: any) {
    return this.http.patch(this.url + '/' + id , data );
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id);
  }
}
