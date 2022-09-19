import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { IonContent } from '@ionic/angular';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) content:IonContent;
  constructor(public db:DbService,public router:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.db.get_home_data();
  }

  ionViewWillEnter(){
    this.content.scrollToTop(400);
    // this.router.params.subscribe((res)=>{this.content.scrollToTop(400);console.log('entered')})
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    location.reload()
  }
  
  ionViewWillLeave(){
    this.db.footer_info = (this.db.website_settings.default_footer && this.db.website_settings.default_footer.items) ? this.db.website_settings.default_footer.items : [];
    this.db.header_info = this.db.website_settings.default_header;
  } 


}
