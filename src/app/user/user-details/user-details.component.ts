import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/user";
import { Bills } from "src/app/_models/bills";


@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  user: User;

  bills: Bills;
  today = new Date().getDate()

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
      console.log(this.user)
    });
    // this.loadUser();
    this.generateBills();

    // this.galleryOptions = [
    //   {
    //       width: '500px',
    //       height: '500px',
    //       thumbnailsColumns: 4,
    //       imagePercent: 100,
    //       imageAnimation: NgxGalleryAnimation.Slide
    //   },
    // ];
    // this.galleryImages = [];
  }

  getImages(){
    const fileUrl = [];
    // for (const photo of this.user.filePath) {
    //   fileUrl.push({
    //     small: photo.url,
    //     medium: photo.url,
    //     big: photo.url,
    //     fileName: photo.fileName
    //   });

    // }
    // return fileUrl;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params["id"]).subscribe(
  //     result => {
  //       this.user = result["message"];
  //       console.log(this.user);
  //       this.alertify.success("user found");
  //     },
  //     error => {
  //       this.alertify.error("no user with this id found");
  //       console.log(error);
  //     }
  //   );
  // }
  generateBills() {
    this.userService.getBills().subscribe(
      (bills: Bills) => {
        this.bills = bills["message"];
        this.alertify.success("bills generated successfully");
        console.log(this.bills);
      },
      error => {
        this.alertify.error("no generated for the month");
        console.log(error);
      }
    );
  }
}
