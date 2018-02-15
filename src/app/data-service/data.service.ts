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

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private url: string) { }
  getAll() {
    return this.http
               .get(this.url)
               .map (response => {
                  // use map to return what u want from the Observable
                  // return response.json()
               })
               .catch(this.handleError);
  }

  create(resource) {
     return this.http.post(this.url, JSON.stringify(resource))
     // .map( response => reponse.json())
     .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id , resource )
    .catch(this.handleError);
  }

  delete(id) {
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
