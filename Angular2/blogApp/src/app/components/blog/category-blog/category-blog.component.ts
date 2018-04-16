import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-category-blog',
  templateUrl: './category-blog.component.html',
  styleUrls: ['./category-blog.component.css']
})
export class CategoryBlogComponent implements OnInit {
  messageClass;
  message;
  loadingBlogs = false;
  form;
  commentForm;
  processing = false;
  username;
  newComment = [];
  enabledComments = [];
  blogPosts;
  currentUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }


  // Function to show blogs based on category
  getBlogsBasedOnCategory() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    console.log("category url " + this.currentUrl);
  // Function to GET all blogs from database based on category
    var category = this.currentUrl.categorySelected;
    console.log("category" + category);
    this.blogService.getBlogsBasedOnCategory(category).subscribe(data => {
    this.blogPosts = data.blogs;
    console.log(this.blogPosts);// Assign array to use in HTML
    });
  }



  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    // Function to GET all blogs from database
    this.blogService.getAllBlogs().subscribe(data => {
    this.blogPosts = data.blogs; // Assign array to use in HTML
    });
  }

  // Function to like a blog post
  likeBlog(id) {
    // Service to like a blog post
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after like
    });
  }

  // Function to disliked a blog post
  dislikeBlog(id) {
    // Service to dislike a blog post
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after dislike
    });
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.blogService.postComment(id, comment).subscribe(data => {
      this.getAllBlogs(); // Refresh all blogs to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }


  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }

  ngOnInit() {

    this.getBlogsBasedOnCategory();
  }

}
