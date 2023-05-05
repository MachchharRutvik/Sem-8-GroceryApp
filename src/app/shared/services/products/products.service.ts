import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../Models/category';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productArray:any[] = [
    {
      id: 1,
      imageurl:"tatasault.png",
      category: "Food",
      name: "Tata Sault",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 8,
      price:12,
      money: "USD",
      quantity:1
    },
    {
      id:2,
      imageurl:"bakery.jpg",
      category: "bakery",
      name: "bakery",
      weight: "500 grams",
      sellerName: "Bakery Inc.",
      moneyOfferPrice: 9,
      price:12,
      money: "USD",
      quantity:1
    },
    {
      id:3,
      imageurl:"bakery.jpg",
      category: "bakery",
      name: "bakery2",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 10,
      price:12,
      money: "USD",
      quantity:1
    },
    {
      id:4,
      imageurl:"bakery.jpg",
      category: "bakery",
      name: "bakery3",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 10,
      price:20,
      money: "USD",
      quantity:1
    },
    {
      id:5,
      imageurl:"fruits.jpg",
      category: "fruits",
      name: "Fruits",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 2,
      price:5,
      money: "USD",
      quantity:1
    },
    {
      id:6,
      imageurl:"fruits.jpg",
      category: "fruits",
      name: "Fruits",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:7,
      imageurl:"fruits.jpg",
      category: "fruits",
      name: "Fruits",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:8,
      imageurl:"fruits.jpg",
      category: "fruits",
      name: "Fruits",
      weight: "500 grams",
      sellerName: "Vishvash Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:9,
      imageurl:"Vegetables.jpg",
      category: "vegetables",
      name: "Cabbage",
      weight: "500 grams",
      sellerName: "Abhay Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:10,
      imageurl:"Vegetables.jpg",
      category: "vegetables",
      name: "LadiesFinger",
      weight: "500 grams",
      sellerName: "Ajay Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:11,
      imageurl:"Vegetables.jpg",
      category: "vegetables",
      name: "Potato",
      weight: "500 grams",
      sellerName: "Organic Farms Inc.",
      moneyOfferPrice: 3,
      price:10,
      money: "USD",
      quantity:1
    },
    {
      id:12,
      imageurl:"Vegetables.jpg",
      category: "vegetables",
      name: "Tomato",
      weight: "500 grams",
      sellerName: "Vishnu Farms Inc.",
      moneyOfferPrice: 5,
      price:12,
      money: "USD",
      quantity:1
    },
  ]
  topsells:any=[
    {productId:1,name:'Orange 1kg' , source:'assets/fruits.jpg' , price:'2',rating: 4 },
    {productId:2,name:'Orange 1kg' , source:'assets/fruits.jpg' , price:'4',rating: 3 },
    {productId:3,name:'Orange 1kg' , source:'assets/fruits.jpg' , price:'6',rating: 1 }
   ]
  
   toprated:any=[
    {name:'Orange 1kg' , source:'assets/Vegetables.jpg' , price:'6' },
    {name:'Orange 1kg' , source:'assets/Vegetables.jpg' , price:'5' },
    {name:'Orange 1kg' , source:'assets/Vegetables.jpg' , price:'3' }
   ]
  
   trendingItems:any=[
    {name:'Orange 1kg' , source:'assets/Peach.jpg' , price:'10' },
    {name:'Orange 1kg' , source:'assets/Peach.jpg' , price:'15' },
    {name:'Orange 1kg' , source:'assets/Peach.jpg' , price:'13' }
   ]
  
  recentlyAdded:any=[
    {productId:1,name:'Orange 1kg' , source:'assets/bakery.jpg' , price:'20' },
    {productId:2,name:'Orange 1kg' , source:'assets/bakery.jpg' , price:'1' },
    {productId:3,name:'Orange 1kg' , source:'assets/bakery.jpg' , price:'5' }
  ]

  

  Top_Sells(){
    try {
    return this.topsells
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
  Top_Rated(){
    try {
      return this.toprated
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
  Trending_Items(){
    try {
      return this.trendingItems
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
  Recently_Added(){
    try {
      return this.recentlyAdded
    } catch (error:any) {
      return throwError(() => new Error(error))
    }
  }
    getProducts() {
      try {
        return this.productArray
      } catch (error:any) {
        return throwError(() => new Error(error))
      }
      
  }
  name:any
  constructor(private route:ActivatedRoute,private http:HttpClient) { }
  // ProductShow(){
  // this.route.paramMap.subscribe(params => {
  //   // Read category parameter from URL
  //   const productOnRoute = params.get('product');
  //   console.log(productOnRoute)
  //     this.productArray = this.productArray.filter(productArray => productArray.name.toLowerCase() === productOnRoute);
  //     this.name=productOnRoute
  //     return this.productArray
    
  // });
  
  // }
  baseUrl=environment.baseUrl;
  all_category=environment.category_routes.all_category;
  get_product_by_category_id=environment.products_routes.get_product_by_category_id;
  get_product_by_id=environment.products_routes.get_product_by_id;
  get_all_products=environment.products_routes.get_all_products;
  getAllCategory():Observable<Category>{
    try {
      return this.http.get<Category>(this.baseUrl+this.all_category,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }

  }
  getProductByCategoryId(encryption:any):Observable<any>{
    try {
      return this.http.get<any>(this.baseUrl+this.get_product_by_category_id,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','category_id':encryption})})
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }

  }
  getProductByProductId(encryption:any):Observable<any>{
    try {
      return this.http.get<any>(this.baseUrl+this.get_product_by_id,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','product_id':encryption})})
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }

  }
  getALLProducts():Observable<any>{
    try {
      return this.http.get<any>(this.baseUrl+this.get_all_products,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
    } catch (error:any) {
      return throwError(()=>new Error(error))
    }

  }


  private messageSource = new BehaviorSubject('hii');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  GetImages(){
    let imageArray = [
      {
        title:"Oranges",
         image: "/assets/Fruits/oranges.jpg"
      },
      {
        title:"Banana",
         image: "/assets/Fruits/banana.jpg"
      },
      {
        title:"Apple",
         image: "/assets/Fruits/apple.jpg"
      },
      {
        title:"Kiwi",
         image: "/assets/Fruits/kiwi.jpg"
      },
      {
        title:"Watermelon",
         image: "/assets/Fruits/watermelon.jpg"
      },
      {
        title:"Potato",
         image: "/assets/Vegetables/potato.jpg"
      },
      {
        title:"Tomato",
         image: "/assets/Vegetables/tomato.jpg"
      },
      {
        title:"Onion (Loose)",
         image: "/assets/Vegetables/onion.jpg"
      },
      {
        title:"Saffola Oats",
         image: "/assets/Breakfast/oats.jpg"
      },
      {
        title:"Amul Milk",
         image: "/assets/Dairy/milk.jpg"
      },
      {
        title:"Amul Cheese (200g)",
         image: "/assets/Dairy/cheese.jpg"
      },
      {
        title:"Amul Butter (200g)",
         image: "/assets/Dairy/butter.jpg"
      },
      {
        title:"Amul Cream (1 ltr)",
         image: "/assets/Dairy/cream.jpg"
      },
      {
        title:"Chicken  (500g)",
         image: "/assets/Meat/chicken.jpg"
      },
      {
        title:"Aashirvaad Atta (1 Kg)",
         image: "/assets/Foodgrain/atta.jpg"
      },
      {
        title:"Tata Toor Dal (1 Kg)",
         image: "/assets/Foodgrain/toordal.jpg"
      }
   ];
   
   return imageArray
  }
  GetImages_Category(){
    let imageArray = [
      {
        title:"Breakfast",
         image: "/assets/Category/breakfast.jpg"
      },
      {
        title:"Dairy",
         image: "/assets/Category/dairy.jpg"
      },
      {
        title:"FoodGrains",
         image: "/assets/Category/foodgrains.jpg"
      },
      {
        title:"Fruits",
         image: "/assets/Category/fruits.jpg"
      },
      {
        title:"Meat",
         image: "/assets/Category/meat.jpg"
      },
      {
        title:"Vegetables",
         image: "/assets/Category/vegetables.jpg"
      },
  
 
   ];
   
   return imageArray
  }
}
