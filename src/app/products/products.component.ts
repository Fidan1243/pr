import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductService]
})
export class ProductsComponent implements OnInit {
  Products:Product[]=[];
  constructor( private prService: ProductService
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
  AddCart(prId:string,prName:string){
    console.log("helloooo")
    console.log(prId);
    var st = {
      ProductId:prId,
    ProductName:prName,
    Quantity:2
    };
    this.prService.getList().subscribe(data=>{
      var f = data.find(p=>p.ProductId == prId);
      if(f){
        f.Quantity +=1;
        this.prService.updateList(f).subscribe(data=>this.router.navigate(['products']));
      }
      else{
        this.prService.addToMyList(st).subscribe(data=>this.router.navigate(['products']));

      }
    });
  }
  
  
}
