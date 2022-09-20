import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  content_data:any;
  constructor(public db:DbService) { }

  ngOnInit() {
    this.get_about();
  }


  get_about(){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: "Landing-page" }
    this.db.get_mobile_homepage(res).subscribe(data => 
      {
        this.content_data = (data.message.page_content) || (data.message.list_content);
        this.db.check_header_footer(this.content_data,data);
      }, 
      error => {
        console.log(JSON.stringify(error.json())); 
      });
  }

}
