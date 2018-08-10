import { Component , OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component(
  {
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']

})

export class PostListComponent implements OnInit , OnDestroy {

  private postsSub: Subscription;
  userIsAuthenticated = false ;
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  userId: string;
  pageSizeOptions = [1, 2 , 5 , 10];  
  authListenerSub: Subscription;



constructor( public postsService: PostsService, private authService: AuthService) {

}

ngOnInit() {
  this.isLoading = true;
  this.postsService.getPosts(this.postPerPage , this.currentPage);
  this.userId = this.authService.getUserId();
  this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[] , postCount: number}) => {
    this.isLoading = false;
    this.totalPosts = postData.postCount;
    this.posts = postData.posts;
 
  });
  this.userIsAuthenticated = this.authService.getIsAuth();

  this.authListenerSub =  this.authService.getAuthStatusListener().subscribe(isAuthenticated =>     {

    this.userIsAuthenticated = isAuthenticated;
    this.userId = this.authService.getUserId();
       console.log("userId"+this.userId,"  ",this.posts);
  }) ;
}

OnDelete(postId: string) {
   this.isLoading = true;
  this.postsService.deletePost(postId).subscribe(() =>   {
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  }) ;
}

onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
this.currentPage =  pageData.pageIndex + 1;
this.postPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postPerPage , this.currentPage);
}

ngOnDestroy() {
  this.postsSub.unsubscribe();
  this.authListenerSub.unsubscribe();
}

}
