import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemService {

    constructor(private http: HttpClient, private router: Router) { }

    deleteItems(itemId: string) {
        this.http.delete("http://localhost:8000/items/" + itemId)
            .subscribe(() => {
                console.log('Deleted: ' + itemId);
            });
            this.reloadCurrentRoute();
    }

    //Uses http.get() to request data based on student id 
    getItem(itemId: string) {
        return this.http.get('http://localhost:8000/items/' + itemId);
        this.reloadCurrentRoute();
    }

    // Uses http.get() to load data 
    getItems() {
        return this.http.get('http://localhost:8000/items');
        this.reloadCurrentRoute();
    }
    //Uses http.post() to post data 
    addItems(
        Pizza: string,
        Breads: string,
        Drinks: string,
        Desserts: string,
        Crust: string,
        Pepperoni: string,
        ExtraCheese: string,
        Olives: string

    ) {
        this.http.post('http://localhost:8000/items', {
            Pizza,
            Breads,
            Drinks,
            Desserts,
            Crust,
            Pepperoni,
            ExtraCheese,
            Olives
        })
            .subscribe((responseData) => {
                console.log(responseData);
            });
            this.reloadCurrentRoute();

    }
    UpdateItems(
        itemId: string,
        Pizza: string,
        Breads: string,
        Drinks: string,
        Desserts: string,
        Crust: string,
        Pepperoni: string,
        ExtraCheese: string,
        Olives: string

    ) {

        this.http.put("http://localhost:8000/items/" + itemId,
            {
                Pizza,
                Breads,
                Drinks,
                Desserts,
                Crust,
                Pepperoni,
                ExtraCheese,
                Olives

            })

            .subscribe(() => {

                console.log('Updated: ' + itemId);

            });
            this.reloadCurrentRoute();

    }
    reloadCurrentRoute() {
        this.router.navigate([this.router.url])
    }

}