import { BadInput } from '../../errors/model/bad-input';
import { NotFoundError } from '../../errors/model/not-found-error';
import { AppError } from '../../errors/model/app-error';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

// https://sergeome.com/blog/2017/11/26/simply-about-new-httpclient-in-angular/
@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url)
    .catch(this.handleError);
  }

  createPost(post) {
     return this.http.post(this.url, JSON.stringify(post))
     .catch(this.handleError);
  }

  updatePost(id, data: any) {
    return this.http.patch(this.url + '/' + id , data )
    .catch(this.handleError);
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
               .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }
}
