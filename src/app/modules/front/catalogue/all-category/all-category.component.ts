import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
})
export class AllCategoryComponent {
  constructor(
    private router: Router,
    private productservice: ProductsService,
    private spinner: NgxSpinnerService,
    private _encryptionservice:EncryptionService
  ) {}
  Product_Arr: any;
  Image_Arr=[]
  ngOnInit() {
    this.Image_Arr=this.productservice.GetImages_Category()
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
    this.GetAllCategory();

    this.Product_Arr = this.productservice.getProducts();
    console.log(this.Product_Arr);
  }
  showImage(img){
    let src="http://localhost:8080/api/v1/get-image/"
    let image=img
    return src+img
  }
  food: any;
  loading = true;
  encryption_data:any

  encryption(id:any) {
    this._encryptionservice.Encryption(id).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          if (encryption_res.data) {
            console.log('encryption_res', encryption_res);
            this.encryption_data = encryption_res.data;
  
            this.GetProductByCategory(this.encryption_data,id);
          }
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
  }

  GetProductByCategory(encryption:any,id:any) {
    this.productservice.getProductByCategoryId(encryption).subscribe({
      next: (Product_Res: any) => {
        if (Product_Res) {
          if (Product_Res.data) {
            console.log('Product_Res', Product_Res.data);
            // Product_Res.data;
            for(let i=0;i<this.grocery_items.length;i++){
             if(this.grocery_items[i].id==id)
             this.grocery_items[i]={...this.grocery_items[i],'items':Product_Res.data.length}
              console.log("first",this.grocery_items[i])
              console.log("first",this.grocery_items)
         
                for(let j=0;j<this.Image_Arr.length;j++){
    
                  if(this.grocery_items[i].title==this.Image_Arr[j].title){
                    this.grocery_items[i].avatar_image=this.Image_Arr[j].image
                    // console.log('Product_Res', Product_Res.data);
                  }
                }
              
            }
          }
        }
      },
      error: (Product_error) => {
        console.log('Product_error', Product_error);
      },
    });
  }
  GetAllCategory() {
    this.productservice.getAllCategory().subscribe({
      next: (Category_Res: any) => {
        if (Category_Res) {
          if (Category_Res.data) {
            this.grocery_items = Category_Res.data;
            
              console.log('Category_Res', Category_Res.data);
              for(let i=0;i<this.grocery_items.length;i++){
              
                this.encryption(JSON.stringify(this.grocery_items[i].id))
              }
            
            
          }
          this.spinner.show();
          
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            }, 1500);
          }
        
        
      },
      error: (Category_error) => {
        console.log('Category_Error', Category_error);
      },
    });
  }
  grocery_items = [];
}
