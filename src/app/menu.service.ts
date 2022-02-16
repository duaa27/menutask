import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from './item';
import { MessageService } from './message.service';
import { Subitem } from './subitem';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  items: Item[]=[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,private messageService: MessageService) {

   }

  getItems() {

  this.items  =   JSON.parse(localStorage.getItem('value1')|| '{}');

    return this.items;

  }

  addItem(item: any,itemid:number) {
    if(itemid>=0)
    {
      if(this.items[itemid].subitems==undefined)
      {
      item.id=0;
      }
      else
      {
      item.id=this.items[itemid].subitems.length;
      }

   this.items[itemid].subitems.push(item);


    }
    else {
    if(this.items.length==undefined)
    {
    item.id=0;
    }
    else
    {
    item.id=this.items.length;
    }
if(item.subitems==undefined)
item.subitems=[];
    this.items.push(item);
  }

   localStorage.setItem('value1',JSON.stringify(this.items));

  }




  deleteItem(item: Item,subitem:Subitem|undefined) {

if(subitem==undefined)
{
  this.items = this.items.filter(i => i !== item);

}
else
{
    this.items[item.id].subitems = this.items[item.id].subitems.filter(i => i !== subitem);
}
    localStorage.clear();

    localStorage.setItem('value1',JSON.stringify(this.items));

  }


  updateItem(itemid: number,newitem:any,subitemid:number,selecteditemid:number) {
    if(subitemid>=0)
    {
      newitem.id=itemid;

      this.items[selecteditemid].subitems[subitemid]=newitem;



    }
    else
    {
    newitem.id=itemid;
    newitem.subitems=this.items[itemid].subitems;
    this.items[itemid] = newitem
    }
    localStorage.setItem('value1',JSON.stringify(this.items));
  }



}
