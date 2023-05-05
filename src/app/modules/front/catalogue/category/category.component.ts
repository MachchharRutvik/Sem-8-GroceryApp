import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  constructor(
    private router: Router,
    private productservice: ProductsService,
    private _encryptionservice:EncryptionService
  ) {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
  }
  Product_Arr: any;
  Image_Arr=[]
  ngOnInit() {
    this.Image_Arr=this.productservice.GetImages_Category()
    this.GetAllCategory();

    this.Product_Arr = this.productservice.getProducts();
    // console.log(this.Product_Arr)
  }
  showImage(img){
    let src="http://localhost:8080/api/v1/get-image/"
    let image=img
    return src+img
  }
  encryption_data:any
  encryption(id:any) {
    this._encryptionservice.Encryption(id).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          if (encryption_res.data) {
            // console.log('encryption_res', encryption_res);
            this.encryption_data = encryption_res.data;
            this.GetProductByCategory(encryption_res.data,id);
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
              // console.log("first",this.grocery_items[i])
              // console.log("first",this.grocery_items)
         
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
  food: any;
  grocery_items = [];
  GetAllCategory() {
    this.productservice.getAllCategory().subscribe({
      next: (Category_Res: any) => {
        if (Category_Res) {
          if (Category_Res.data) {
            console.log('Category_Res', Category_Res.data);
            this.grocery_items = Category_Res.data;
            for(let i=0;i<this.grocery_items.length;i++){
              
              this.encryption(JSON.stringify(this.grocery_items[i].id))
            }
          }
        }
      },
      error: (Category_error) => {
        console.log('Category_Error', Category_error);
      },
    });
  }
}
