import { AppError } from './../../errors/model/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { BadInput } from '../../errors/model/bad-input';
import { NotFoundError } from '../../errors/model/not-found-error';
// https://sergeome.com/blog/2017/11/26/simply-about-new-httpclient-in-angular/
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private _serv: PostService) {  // try using httpClient

  }

  ngOnInit() {
    this._serv.getPosts()
    .subscribe(response => {
     // console.log(response); // response.json()
     this.posts = response;
    }, (error: Response) => {
      if (error.status === 400) {
        alert('An unexpected error occured.');
      }
       console.log(error);
    });
  }

  createPost(input: HTMLInputElement) {
   const post = { title : input.value};
   this.posts.splice(0, 0, post); // not waiting on server

   input.value = '';

            this._serv.createPost(post)
            .subscribe( (response: any) => {
              post['id'] = response.id;
              // this.posts.splice(0, 0, post); // waiting on server
              console.log(response);
              console.log(this.posts);
            },
          (error: AppError) => {
            this.posts.splice(0, 1); // remove what has been added
            if (error instanceof BadInput) {
               // this.form.setErrors(error.originalError);
            } else {
              throw error; // use the global error handler
            }
            /*  {
              alert('An unexpected error occured.');
              console.log(error);
            } */
          });
  }

  updatePost(post) {
    // this.http.put ==> update the whole object
    /*
     this.http.patch(this.url, JSON.stringify(post))

     */
    // patch ==> update only a part of the object
    const data = JSON.stringify({isRead: true});
             this._serv.updatePost(post.id, data)
             .subscribe(response  => {
               console.log(response);
             });
  }

  deletePost(post) {
             this._serv.deletePost(post.id)
             .subscribe(response  => {
               const index = this.posts.indexOf(post);
               this.posts.splice(index, 1);
               console.log(response);
             },
             (error: AppError) => {
               if (error instanceof NotFoundError) {
                alert('This post has already been deleted.');
               } else  {
                throw error; // use the global error handler
              }
              /*  {
                 alert('An unexpected error occured.');
                 console.log(error);
               } */
             });
  }

}
