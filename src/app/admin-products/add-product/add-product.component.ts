import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers:[CategoryService,ProductService]
})
export class AddProductComponent implements OnInit {
  categories:Category[]=[];
  
  constructor(private categoryService:CategoryService, private productServ:ProductService,private router:Router) { 

  }
  
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  onSubmit(myForm: NgForm) {
console.log(myForm)
var pr= {
  ProductName:myForm.value.title,
    UnitPrice:myForm.value.price,
    InStock:myForm.value.stock,
    CategoryId:myForm.value.categoryId
} 
console.log(pr);
this.productServ.createProduct(pr)
.subscribe(data=>this.router.navigate(['products']));
    //do stuff with formAndTotal
   }
  ClearForm(){

  }

}
