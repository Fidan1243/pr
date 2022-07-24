import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers:[ProductService]
})
export class AdminProductsComponent implements OnInit {
  Products:Product[]=[];
  constructor(private prService: ProductService
    , private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        
      var value = params["categoryId"]
      this.prService.getPrs(value).subscribe(data => {
        this.Products = data;        
      }, error => {
        console.log(error);
      });
    });
  }

  Delete(id:any){
    console.log("hi from delete p1")
    this.prService.removePrById(id).subscribe(data=>this.router.navigate(["/products"]))
  }

}
