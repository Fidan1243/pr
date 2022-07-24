import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product.model";
import { catchError, delay, map, Observable, tap, throwError } from "rxjs";
import { CardItems } from "../products/cardItems.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
    url_firebase = "https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";
    constructor(private http: HttpClient) {

    }

    getPrs(categoryId: string): Observable<Product[]> {
        let newUrl = this.url_firebase + "products.json";


        return this.http.get<Product[]>(newUrl)
            .pipe(
                map(response => {
                    const products: Product[] = [];

                    for (const key in response) {
                        if (categoryId) {
                            if (categoryId == response[key].CategoryId) {
                                products.push({ ...response[key], id: key });
                            }
                        }
                        else {
                            products.push({ ...response[key], id: key });
                        }
                    }

                    return products;
                }),
                tap(data => console.log(data)),
                catchError(this.handleError),
                delay(500)
            );
    }


    createProduct(movie: any): Observable<Product> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token'
            })
        };
        return this.http.post<any>(this.url_firebase + "products.json", movie, httpOptions)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError),
                delay(500)
            );
    }

    removeFromList(item: CardItems): Observable<CardItems> {
        return this.http.delete<CardItems>(this.url_firebase + "/list/" + item.id + ".json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }
    removePrById(item: any): Observable<void> {
        console.log(this.url_firebase + "/products/" + item + ".json")
        return this.http.delete<void>(this.url_firebase + "/products/" + item + ".json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }
    getTotal(list:CardItems[],prr:Product[]):number{
        var aa = 0;
        console.log(list);
        console.log(list+"from total")
        for (let index = 0; index < list.length; index++) {
            var ra1 = prr.find(pr=>list[index].ProductId == pr.id);
            console.log(ra1);
            if (ra1) {
                aa+= ra1.UnitPrice * list[index].Quantity;
                console.log("Hii:"+aa);
            }
        }
        
        return aa;
    }
    removeList(): Observable<void> {
        return this.http.delete<void>(this.url_firebase + "/list.json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }
    buyList(list:CardItems[],prr:Product[]): Observable<void> {
        console.log(list+"from total")
        for (let index = 0; index < list.length; index++) {
            var ra1 = prr.find(pr=>list[index].ProductId == pr.id);
            console.log(ra1);
            if (ra1) {
                ra1.InStock-= list[index].Quantity;
                this.updateProduct(ra1).subscribe(data=>console.log(data+"Hello World From BLIST"));
            }
        }
        return this.http.delete<void>(this.url_firebase + "/list.json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }

    getList(): Observable<CardItems[]> {
        return this.http.get<CardItems[]>(this.url_firebase + "/list.json")
            .pipe(
                map(response => {
                    const cl: CardItems[] = [];
                    for (const key in response) {
                        cl.push({ ...response[key], id: key });
                    }
                    return cl;
                }
                ),
                tap(data => console.log(data)),
                catchError(this.handleError)

            )
    }


    updateProduct(item:Product):Observable<any>{
        console.log(item+" in update")
        return this.http.put<any>(this.url_firebase + "products/"+ item.id+".json",item)
            .pipe(
                tap(data => console.log("successfull")),
                catchError(this.handleError)
            );
    }

    addToMyList(item: any): Observable<CardItems> {
        return this.http.post<CardItems>(this.url_firebase + "list.json", item).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        )
    }

    updateList(item:any):Observable<any>{
        console.log(item+" in update")
        return this.http.put<any>(this.url_firebase + "list/"+ item.id+".json",item)
            .pipe(
                tap(data => console.log("successfull")),
                catchError(this.handleError)
            );
    }


    getProductById(prId: string): Observable<Product> {
        return this.http.get<Product>(this.url_firebase + "products/" + prId + ".json")
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //client or network
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }

}