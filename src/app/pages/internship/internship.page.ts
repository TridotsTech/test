import {
  Component,
  OnInit,
} from '@angular/core';

import { DbService } from 'src/app/services/db.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.page.html',
  styleUrls: ['./internship.page.scss'],
})
export class InternshipPage implements OnInit {
  
  content_data:any;
  internship:any = '';

  constructor(public route :ActivatedRoute,public db:DbService) { 
    this.route.params.subscribe(res => {
      // this.internship = res.page_route.split("-").join(" ");
      // if(res.page_route == 'schedule-and-events'){
      //   this.internship = this.internship.split("and").join("&");
      // }
      this.get_about(res.page_route);

      // if(this.internship == 'gallery'){
      //   this.get_about(res.page_route);
      // }else{
      //   this.get_about(res.page_route);
      // }

    })
  }

  ngOnInit() {}

  ionViewWillLeave(){
    this.db.header_info = this.db.website_settings.header_template;
    this.db.footer_info = (this.db.website_settings.footer_template && this.db.website_settings.footer_template.items) ? this.db.website_settings.footer_template.items : [];
  } 


  get_about(page){
    var res={  application_type: this.db.ismobile?"mobile":"web", domain: this.db.domainurl,  route: page }
    this.db.get_mobile_homepage(res).subscribe(data => 
      {
        this.content_data = (data.message.page_content) || (data.message.list_content);
        this.content_data.map(res =>{
          if(res.btn != undefined || res.btn != null){
            res.btn ? res.btn_text = JSON.parse(res.btn):'';
          }
          if(res.btn1 != undefined || res.btn1 != null){
            res.btn1 ? res.btn_text1 = JSON.parse(res.btn1):''; 
          }
        })

         if(data.message && data.message.footer_content){
          // this.db.footer_info = data.message.footer_content.items;
           this.db.footer_info =  data.message.footer_content;
           this.db.footer_info.layout_json =  JSON.parse(this.db.footer_info.layout_json);
           this.db.check_footer_layout();
          //  console.log(this.db.footer_info)
        }else {
         
          if(this.db.website_settings && this.db.website_settings.footer_template){
            this.db.footer_info = this.db.website_settings.footer_template;
            this.db.footer_info.layout_json =  JSON.parse(this.db.footer_info.layout_json);
            this.db.check_footer_layout();
          }else{
            this.db.get_website_settings();
          }
          
        }
           
           
        if(data.message && data.message.header_content){
          this.db.header_info = data.message.header_content;
          // console.log('aklcasscalmc')
        }else{

          if(this.db.website_settings && this.db.website_settings.header_template){
            this.db.header_info = this.db.website_settings.header_template;
          }else{
            this.db.get_website_settings();
          }
        }

      
      }, 
      error => {
        console.log(JSON.stringify(error.json())); 
      });
    }
  }
