import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _cartservice: CartService,
    private productservice: ProductsService,
    private toastr: ToastrService,
    private route: Router,
 
  ) {
    this.route.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
  }
  filteredItems: any = [];
  Customer_Id: number;
  User_Details: any;
  Image_Arr=[]
  categories_Path: any;
  ngOnInit() {
  this.Image_Arr=this.productservice.GetImages()
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if (this.User_Details) {
      this.Customer_Id = this.User_Details.id;
      // console.log('Customer_Id', this.Customer_Id);
    }
    this.GetProducts();
    // this.filteredItems=this.productservice.getProducts()
  }
  productArray: any[] = [];
  ProductAddobj: any;
  clickedItem: any = [];
  ShowcartArr: any = [];
  existing_Product: any;
  Find_Customer_Cart: any;
  Find_Customer_Cart_Arr: any = [];
  showImage(img){
    let src="http://localhost:8080/api/v1/get-image/"
    let image=img
    return src+img
  }
  GetProducts() {
    this.productservice.getALLProducts().subscribe({
      next: (get_all_products_res) => {
        if (get_all_products_res) {
          if (get_all_products_res.data) {
            this.filteredItems = get_all_products_res.data;
            console.log('get_all_products_res', get_all_products_res.data);
            for(let i=0;i<this.filteredItems.length;i++){
              for(let j=0;j<this.Image_Arr.length;j++){
  
                if(this.filteredItems[i].title==this.Image_Arr[j].title){
                  this.filteredItems[i].avatar_image=this.Image_Arr[j].image
                  // console.log('Product_Res', Product_Res.data);
                }
              }
            }
            // console.log("allProducts",this.filteredItems)
          }
        }
      },
      error: (get_all_products_error) => {
        console.log('get_all_products_error', get_all_products_error);
      },
    });
  }
  quantity = 1;
  product_quantity = {
    category:"all",
    quantity: this.quantity,
  };
  Add_cart(i, product) {
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    // console.log("ShowCartArr",this.ShowcartArr)
    // console.log("Product",product)
  if(this.User_Details){

    // console.log("Existing Product",this.existing_Product)
    
    // console.log("Existing Product",this.existing_Product)

      // console.log("Filtered Item Arr",this.filteredItems[i])
      this.ProductAddobj = this.filteredItems[i];
      this.ProductAddobj = Object.assign(
        this.filteredItems[i],
        this.product_quantity
      );

      // for(let i=0;i<this.filteredItems.length;i++){
      //   this.ProductAddobj=this.filteredItems[i]
      //   console.log("OBJ",this.ProductAddobj)
      // }
      console.log('Cart Add Product', this.filteredItems[i]);

      this._cartservice.cartmsg = this.filteredItems[i].name;

      // this.rout.navigate(['/front/cart'])

      this._cartservice.cart.push(this.ProductAddobj);
      // emit updated cart data to subscribers
      this._cartservice.cartSubject.next(this._cartservice.cart);
      this._cartservice.ADD_Cart_User_Wise(this.User_Details.username,this.ProductAddobj,product.id)

            this._cartservice.getItemCount();
            this._cartservice.Subtotal();
          }else{
            this.ProductAddobj = this.filteredItems[i];
      this.ProductAddobj = Object.assign(
        this.filteredItems[i],
        this.product_quantity
      );
      if(!this.User_Details){
            this._cartservice.Guest_User(this.ProductAddobj)
            this._cartservice.getItemCount();
            this._cartservice.Subtotal();
          }
        }
  }
}
