import { Injectable } from '@angular/core';

function _window() : any {
  return window;
}
@Injectable({
  providedIn: 'root'
})

export class PaymentGatewayService {

  get nativeWindow() : any {
    return _window();
 }
  constructor() { }



}
