import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CardItems } from '../cardItems.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers:[ProductService]
})
export class CartListComponent implements OnInit {
  cardItems:CardItems[] =[];
  total:any;
  Pr:Product[]=[];
  constructor(private prServ:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.prServ.getList().subscribe(dataa=>{
      this.cardItems=dataa;
      this.prServ.getPrs("").subscribe(data=>{
        this.Pr=data;
        this.total = this.prServ.getTotal(this.cardItems,this.Pr);
      });
    });
  }
  ClearCard(){
    this.prServ.removeList().subscribe(data=>this.router.navigate(['products']));
  }
  BuyAll(){
    this.prServ.buyList(this.cardItems,this.Pr).subscribe(data=>this.router.navigate(['products']));
  }

}
