import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    username = '';
    email = '';
    aboutUser = '';
    displayImage;
    profile;
    messageClass;
    message;
    constructor(
      private authService: AuthService,
      private blogService: BlogService
    ) { }

    ngOnInit() {
      // Once component loads, get user's data to display on profile
        this.authService.getProfile().subscribe(profile => {
        this.profile = profile;
        this.username = profile.user.username; // Set username
        this.email = profile.user.email;
        this.aboutUser = profile.user.aboutUser;
        this.displayImage = profile.user.displayImage;
        console.log("Inside ProfileComponent Init - aboutUser -- " + this.aboutUser);
        this.getDisplayImage();
      });
    }

    saveAboutUser(aboutUser){
      this.profile.user.aboutUser = aboutUser;
      console.log('Checking profile   ' + this.profile.user.aboutUser + "   " + this.profile.user.username);;
      this.blogService.saveAboutUser(aboutUser).subscribe(data => {
       console.log("Response in component");
       if (!data.success) {
         this.messageClass = 'alert alert-danger'; // Return error class
         this.message = data.message; // Return error message
         
       } else {
         this.messageClass = 'alert alert-success'; // Return success class
         this.message = data.message; // Return success message
       }
      });
    }

    /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and 
   * makes an Http request with the image file.
   */
    handleInputChange (event) {
    
      this.displayImage = event.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();

    this.profile.user.displayImage = this.displayImage;
    this.authService.saveProfilePicture(this.profile.user.username, this.displayImage).subscribe(data => {
       if(!data.success){
       console.log("Something is wrong here");
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
       this.message = data.message;
       } else {
       console.log("Success in component");
       this.messageClass = 'alert alert-success';
       this.message = data.message;
       }
    });
  }

    getDisplayImage(){
    if(this.profile.user.displayImage!='undefined'){
      this.authService.getProfilePicture(this.profile.user.username).subscribe(data => {
       if(!data.success){
       console.log("Something is wrong here");
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
       this.message = data.message;
       } else {
       console.log("Success in component");
       this.displayImage = data;
       this.messageClass = 'alert alert-success';
       this.message = data.message;
       }
    });   
    }
   }
}
