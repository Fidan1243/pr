import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Product } from "../models/product.model";
import { Category } from "./category.model";


@Injectable()
export class CategoryService {
    url = "http://localhost:3000/categories";
    url_firebase = "https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";
    constructor(private http: HttpClient) {

    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url_firebase + "categories.json")
            .pipe(
                map(response => {
                    const categories: Category[] = [];
                    for (const key in response) {
                        categories.push({ ...response[key], id: key });
                    }
                    return categories;
                })
            );
    }
    deleteCategory(categoryId:Category,movies:Product[]){
        console.log(categoryId)
        return this.http.delete<void>(`${this.url}categories/${categoryId.id}.json`).pipe(
            tap(response=>{
                movies.forEach(element => {
                    if(element.CategoryId == categoryId.id){
                        this.http.delete<void>(`${this.url}products/${element.id}.json`)
                    }
                });
            }));
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.url_firebase + "categories.json", category);
    }
}