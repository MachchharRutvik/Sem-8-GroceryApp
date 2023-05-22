import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';
import { PaymentGatewayService } from 'src/app/shared/services/payment/payment-gateway.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private route: Router,
    private _cartService: CartService,
    private _userService: UserService,
    private _encryptionservice: EncryptionService,
    private toastr: ToastrService,
    private _paymentGatewayService:PaymentGatewayService
  ) {
    this.Radio_Address_Form();
  }
  address_user = [];

  cartTotal: number;
  data: any;
  username: any;
  Customer_Id: number;
  User_Details: any;
  GrandTotal_Data:any;
  GrandTotal:any;
  ngOnInit() {
    this.PaymentMethod()
    this.OrderStatus()
    this.PaymentStatus()
  this.GrandTotal_Data = JSON.parse(localStorage.getItem('Cart_Data'));
    this.GrandTotal=this.GrandTotal_Data.total_amount*100
    console.log("GrandTotal",this.GrandTotal)
    window.scrollTo(0, 0);
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    this.username = this.User_Details.username;
    this.Customer_Id = this.User_Details.id;
    console.log('Customer_Id', this.Customer_Id);
    // this.payment_status= this.encryption(JSON.stringify(1))
    // this.order_status=this.encryption(JSON.stringify(2))
    this.Get_User_Details();

    // this.data=this._cartService.Cartdata
    this.data = JSON.parse(localStorage.getItem('Cart_Data'));
    this.cartTotal = this.data.total_amount;
    // console.log("address_user",this.address_user)
    //   this._cartService.cartTotal$.subscribe(total => {
    //     this.cartTotal = total;
    //   });
    console.log('data', this.data);
  }

Payment_Method:any
PaymentMethod(){
  this.Payment_Method=new FormGroup({
    payment_tag:new FormControl('',[Validators.required])
  })
}



  address: any;
  Login_User: any;
  Cancel_Checkout() {
    this.route.navigate(['/front/cart/cart']);
  }
  User_details_Obj: any;
  User_details_Obj_addresses: any = [];
  Get_User_Details() {
    this._userService.Get_User_Details().subscribe({
      next: (User_details_res) => {
        if (User_details_res) {
          console.log('User_Details', User_details_res.data);
          this.User_details_Obj = User_details_res.data;
          this.User_details_Obj_addresses = this.User_details_Obj.addresses;

          console.log('USER_DEtails', this.User_details_Obj);
          console.log('USER_DEtails', this.User_details_Obj_addresses);
          if (this.User_details_Obj.addresses.length == 0) {
            this.toastr.error(this.username + ',' + 'Please Add Address');
            setTimeout(() => {
              this.route.navigate(['/front/user/user-profile/addaddress']);
            }, 2500);
          }
        }
      },
      error: (User_details_error) => {
        console.log('Getuserdetail_error', User_details_error);
      },
    });
  }
  Encyption_Data;
  encryption(id) {
    this._encryptionservice.Encryption(id).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          console.log('encryption_res', encryption_res.data);
          this.Encyption_Data = encryption_res.data;
          return this.Encyption_Data;
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
  }

  payment_status: any
  // payment_status: any 
  order_status: any = 'JbAbzZt-w7vv_SPXXQI4Jw==';
  // order_status: any 
  delivery_address_id: any;
  billing_address_id: any;
  Add_Order_Response_Data: any;
  Encryptdata: any;
  // selected:any

  PaymentStatus(){
      // selected=true
      this._encryptionservice.Encryption("3").subscribe({
        next: (encryption_res) => {
          if (encryption_res) {
            console.log('encryption_res', encryption_res.data);
            this.payment_status = encryption_res.data;
            // return this.Encyption_Data
            console.log('payment_status', this.payment_status);
          }
        },
        error: (encryption_error) => {
          console.log('encryption_error', encryption_error);
        },
      });
      // this.delivery_address_id=this.encryption(addressSelect)
    
  
  }
  OrderStatus(){
      // selected=true
      this._encryptionservice.Encryption("3").subscribe({
        next: (encryption_res) => {
          if (encryption_res) {
            console.log('encryption_res', encryption_res.data);
            this.order_status = encryption_res.data;
            // return this.Encyption_Data
            console.log('order_status', this.order_status);
          }
        },
        error: (encryption_error) => {
          console.log('encryption_error', encryption_error);
        },
      });
      // this.delivery_address_id=this.encryption(addressSelect)
    
  
  }
  selectAdd(addressSelect) {
    // selected=true
    console.log('addressSelect', addressSelect);
    this._encryptionservice.Encryption(addressSelect).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          console.log('encryption_res', encryption_res.data);
          this.delivery_address_id = encryption_res.data;
          this.billing_address_id = encryption_res.data;
          console.log('delivery_address_id', this.delivery_address_id);
          console.log('billing_address_id', this.billing_address_id);
          // return this.Encyption_Data
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
    // this.delivery_address_id=this.encryption(addressSelect)
    console.log('billing_address_id', this.Encryptdata);
  }

  status = '2';

  Address: any;
  Radio_Address_Form() {
    this.Address = new FormGroup({
      address_radio: new FormControl('', [Validators.required]),
    });
  }
  get get_Address_Form() {
    return this.Address.controls;
  }
  cart: any;
  Find_Customer_Cart: any;
  Showcart() {
    const sampleData = {
      id: this.Customer_Id,
      items: [],
    };

    let FindCustomer = this.cart.find((item) => item.id === this.Customer_Id);
    // console.log("FindCustomer",FindCustomer)
    if (!FindCustomer) {
      // console.log("NOt User")

      this._cartService.getItemCount();
      this._cartService.Subtotal();
    }
  }

  
  
  
rzp1;
options:any;
Payment_id:any;
Pay(){
  
  if(this.payment_Method_Value){
    if (this.billing_address_id) {
    if(this.payment_Method_Value=='onlinepayment'){
  const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage(this.username + ' Confirm to Checkout?');
    confirmBox.setButtonLabels('CHECKOUT', 'CANCEL');

    // Choose layout color type
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply open the popup and listen which button is clicked
    confirmBox.openConfirmBox$().subscribe((resp: any) => {
      // IConfirmBoxPublicResponse
      console.log('Clicked button response: ', resp);

      if (resp.success) {

      // Razorpay Payment Gateway
      this.options = {

    // "key": "rzp_test_XMtH9sEv4gUKNn", // Enter the Key ID generated from the Dashboard
    "key": "rzp_test_2ef2ySCDRH1WtY", // Enter the Key ID generated from the Dashboard
    "amount": Math.ceil(this.GrandTotal), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "FreshCart", //your business name
    "description": "Test Transaction",
    "image": "https://img.icons8.com/bubbles/50/null/add-shopping-cart.png",
    // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (response:any)=>{
      if(response!= null && response.razorpay_payment_id!=null ){
        this.paymentCapture(response);
    }else{
      this.toastr.error("Payment Failed")
    }
  },
//     function (response){
//       if(response){


//         console.log("response payment",response)
//         this.Payment_id=response
//         if(response.razorpay_payment_id){
//   console.log("Payment_id",this.Payment_id)
//   alert(response.razorpay_payment_id);
  
// }
// if(response.razorpay_order_id){

//         alert(response.razorpay_order_id);
// }
// if(response.razorpay_signature){

//   alert(response.razorpay_signature)
// }
      // }
      // },
    "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#006400"
    }
  };
  // rzp1.on('payment.failed', function (response){
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    // });
    // document.getElementById('rzp-button1').onclick = function(e){
      //     rzp1.open();
      //     e.preventDefault();
      // }
      
      // Razorpay Payment Gateway 
      this.rzp1 = new this._paymentGatewayService.nativeWindow.Razorpay(this.options);
      this.rzp1.open();
    }
})
}else{
  const confirmBox = new ConfirmBoxInitializer();
  confirmBox.setTitle('Are you sure?');
  confirmBox.setMessage(this.username + ' Confirm to Checkout?');
  confirmBox.setButtonLabels('CHECKOUT', 'CANCEL');

  // Choose layout color type
  confirmBox.setConfig({
    layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
  });

  // Simply open the popup and listen which button is clicked
  confirmBox.openConfirmBox$().subscribe((resp: any) => {
    // IConfirmBoxPublicResponse
    console.log('Clicked button response: ', resp);

    if (resp.success) {
  this.Place_Order()
    }
  })
}
}else{
  this.toastr.error('Please Select Address');
  }
}else{
  this.toastr.error('Please Select Payment Method');
}
}

paymentCapture(response) {
if(response){
  this.Payment_id = response.razorpay_payment_id;
  this.Place_Order()
  console.log("payment id "+this.Payment_id);
}

  //TODO
}
get getPaymentMethod(){
  return this.Payment_Method.controls
}
payment_Method_Value:any
Payment_Method_Fun(){
console.log(this.Payment_Method.value.payment_tag)
this.payment_Method_Value=this.Payment_Method.value.payment_tag
}
  Place_Order() {
    // const confirmBox = new ConfirmBoxInitializer();
    // confirmBox.setTitle('Are you sure?');
    // confirmBox.setMessage(this.username + ' Confirm to Checkout?');
    // confirmBox.setButtonLabels('CHECKOUT', 'CANCEL');

    // // Choose layout color type
    // confirmBox.setConfig({
    //   layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
    // });

    // // Simply open the popup and listen which button is clicked
    // confirmBox.openConfirmBox$().subscribe((resp: any) => {
    //   // IConfirmBoxPublicResponse
    //   console.log('Clicked button response: ', resp);

    //   if (resp.success) {
        // this.payment_status=this.encryption(this.status)
        if(this.payment_Method_Value){

          if (this.billing_address_id) {
            console.log('order_status', this.order_status);
          console.log('delivery_address_id', this.delivery_address_id);
          console.log('billing_address_id', this.billing_address_id);
          console.log('Add_Order_Response_Data', this.Add_Order_Response_Data);
          console.log('payment_status', this.payment_status);
          console.log('order_status', this.order_status);
          console.log('delivery_address_id', this.delivery_address_id);
          console.log('billing_address_id', this.billing_address_id);
          // console.log("Add_Order_Response_Data",this.Add_Order_Response_Data)
          this.Login_User = JSON.parse(sessionStorage.getItem('Login_User'));
          if (this.Login_User) {
            this._cartService
              .Add_Order(
                this.data,
                this.delivery_address_id,
                this.billing_address_id,
                this.payment_status,
                this.order_status
              )
              .subscribe({
                next: (Add_Order_res) => {
                  if (Add_Order_res) {
                    console.log('Add_address_res', Add_Order_res);
                    this.Add_Order_Response_Data = Add_Order_res.data.id;
                    console.log(
                      'Add_Order_Response_Data',
                      this.Add_Order_Response_Data
                    );

                    this._encryptionservice
                      .Encryption(JSON.stringify(this.Add_Order_Response_Data))
                      .subscribe({
                        next: (encryption_res) => {
                          if (encryption_res) {
                            console.log('encryption_res', encryption_res.data);
                            this.Add_Order_Response_Data = encryption_res.data;

                            this._cartService
                              .Get_Order_Detail_By_Id(
                                this.Add_Order_Response_Data
                              )
                              .subscribe({
                                next: (Get_OrderById_res) => {
                                  if (Get_OrderById_res) {
                                    this._cartService.Delete_User_Cart_LocalStorage(
                                      this.User_Details.username
                                    );
                                    console.log(
                                      'Get_OrderById_res',
                                      Get_OrderById_res
                                    );

                                    this.route.navigate([
                                      '/front/cart/success',
                                    ]);
                                  }
                                },
                                error: (Get_Order_error) => {
                                  console.log(
                                    'Get_Order_error',
                                    Get_Order_error
                                  );
                                  this.toastr.error(
                                    Get_Order_error.error.message
                                  );
                                },
                              });
                          }
                        },
                        error: (encryption_error) => {
                          console.log('encryption_error', encryption_error);
                          this.toastr.error(encryption_error.error.message);
                        },
                      });
                  }
                },
                error: (Add_Order_error) => {
                  console.log('Add_Order_error', Add_Order_error);
                  this.toastr.error(Add_Order_error.error.message);
                },
              });
          }
        } else {
          this.toastr.error('Please Select Address');
        }
          }else{
            this.toastr.error('Please Select Payment Method');
          }
    //   }
    // });
  }
  Without_ConfirmBox_Place_Order() {
    
        // this.payment_status=this.encryption(this.status)
        if(this.payment_Method_Value){

          if (this.billing_address_id) {
            console.log('order_status', this.order_status);
          console.log('delivery_address_id', this.delivery_address_id);
          console.log('billing_address_id', this.billing_address_id);
          console.log('Add_Order_Response_Data', this.Add_Order_Response_Data);
          console.log('payment_status', this.payment_status);
          console.log('order_status', this.order_status);
          console.log('delivery_address_id', this.delivery_address_id);
          console.log('billing_address_id', this.billing_address_id);
          // console.log("Add_Order_Response_Data",this.Add_Order_Response_Data)
          this.Login_User = JSON.parse(sessionStorage.getItem('Login_User'));
          if (this.Login_User) {
            this._cartService
              .Add_Order(
                this.data,
                this.delivery_address_id,
                this.billing_address_id,
                this.payment_status,
                this.order_status
              )
              .subscribe({
                next: (Add_Order_res) => {
                  if (Add_Order_res) {
                    console.log('Add_address_res', Add_Order_res);
                    this.Add_Order_Response_Data = Add_Order_res.data.id;
                    console.log(
                      'Add_Order_Response_Data',
                      this.Add_Order_Response_Data
                    );

                    this._encryptionservice
                      .Encryption(JSON.stringify(this.Add_Order_Response_Data))
                      .subscribe({
                        next: (encryption_res) => {
                          if (encryption_res) {
                            console.log('encryption_res', encryption_res.data);
                            this.Add_Order_Response_Data = encryption_res.data;

                            this._cartService
                              .Get_Order_Detail_By_Id(
                                this.Add_Order_Response_Data
                              )
                              .subscribe({
                                next: (Get_OrderById_res) => {
                                  if (Get_OrderById_res) {
                                    this._cartService.Delete_User_Cart_LocalStorage(
                                      this.User_Details.username
                                    );
                                    console.log(
                                      'Get_OrderById_res',
                                      Get_OrderById_res
                                    );

                                    this.route.navigate([
                                      '/front/cart/success',
                                    ]);
                                  }
                                },
                                error: (Get_Order_error) => {
                                  console.log(
                                    'Get_Order_error',
                                    Get_Order_error
                                  );
                                  this.toastr.error(
                                    Get_Order_error.error.message
                                  );
                                },
                              });
                          }
                        },
                        error: (encryption_error) => {
                          console.log('encryption_error', encryption_error);
                          this.toastr.error(encryption_error.error.message);
                        },
                      });
                  }
                },
                error: (Add_Order_error) => {
                  console.log('Add_Order_error', Add_Order_error);
                  this.toastr.error(Add_Order_error.error.message);
                },
              });
          }
        } else {
          this.toastr.error('Please Select Address');
        }
          }else{
            this.toastr.error('Please Select Payment Method');
          }
    
  }
}
