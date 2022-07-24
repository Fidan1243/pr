import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers:[CategoryService,ProductService]
})
export class UpdateProductComponent implements OnInit {
  categories:Category[]=[];
  Product:any;
  constructor(private categoryService:CategoryService, private prService:ProductService,private router:Router
    ,private activatedRoute:ActivatedRoute) { 

  }
  
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        
      var value = params["prId"]
      this.prService.getProductById(value).subscribe(data => {
        this.Product = data;   
        console.log(this.Product)     
      }, error => {
        console.log(error);
      });
    });
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  onSubmit(myForm: NgForm) {
console.log(myForm)
var pr= {
  id:this.Product.id,
  ProductName:myForm.value.title,
    UnitPrice:myForm.value.price,
    InStock:myForm.value.stock,
    CategoryId:myForm.value.categoryId
} 
console.log(pr);
this.prService.updateProduct(pr)
.subscribe(data=>this.router.navigate(['admin']));
    //do stuff with formAndTotal
   }
  ClearForm(){

  }

}

