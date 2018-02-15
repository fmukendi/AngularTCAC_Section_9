import { DataService } from './../data-service/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChildService extends DataService {

  constructor ( http: HttpClient) {
     super(http, 'http://jsonplaceholder.typicode.com/posts');
  }

}
