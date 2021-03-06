import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {SinglePage} from "../single/single";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  mediaArray: any;

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider) {
  }
  ionViewDidLoad() {
    console.log("ViewDidLoad");
    this.loadmedia();
  }

  doRefresh(refresher) {

    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadmedia();
      refresher.complete();
    }, 1500);
  }

  openSingle(id) {
    this.navCtrl.push(SinglePage, {
      mediaID: id,
    });
  }


  loadmedia() {
    this.mediaProvider.getPostsByTag('geopic').subscribe(data => {
      console.log(data);
      this.mediaArray = data;

      this.mediaArray.map(media => {
        const temp = media.filename.split('.');
        const thumbName = temp[0] + '-tn320.png';
        media.thumbnail = thumbName;
      });

      console.log(data);
      console.log(this.mediaArray);
    });

  }

}
