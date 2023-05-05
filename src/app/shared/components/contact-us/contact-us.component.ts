import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
constructor(private route:Router,private toastr:ToastrService){}
  Contact_us=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    message:new FormControl('',[Validators.required])
  })
  get Contact_us_data(){
    return this.Contact_us.controls
  }
  Contact_us_click(){
    this.Contact_us.markAllAsTouched();
    this.toastr.success("Our Team Will Contact Soon")
    this.route.navigate(['/home'])
    console.log(this.Contact_us.value)
  }

}
