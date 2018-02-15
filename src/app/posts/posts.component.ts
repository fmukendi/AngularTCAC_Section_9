import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
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
    });
  }

  createPost(input: HTMLInputElement) {
   const post = { title : input.value};
   input.value = '';
            this._serv.createPost(post)
            .subscribe( (response: any) => {
              post['id'] = response.id;
              this.posts.splice(0, 0, post);
              console.log(response);
              console.log(this.posts);
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
             });
  }

}
