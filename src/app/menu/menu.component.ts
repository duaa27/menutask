import { Component, OnInit } from '@angular/core';


import { Item } from '../item';
import { MenuService } from '../menu.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subitem } from '../subitem';
import { numbers } from '@material/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   view:boolean=false;
   editview:boolean=false;
   subview:boolean=false;
   editsubview:boolean=false;
   menuopen:boolean=false;
   selecteditemid:number=-1;


   selecteditem:Item={id:-1,name:"",link:"",subitems:[]};
   selectedsubitem:Subitem={id:-1,name:"",link:"",itemId:-1};

   items: Item[] = [];




  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

    this.getItems();
  }

  getItems(): void {
    this.items= this.menuService.getItems();
  console.log(this.items);
  }


  deleteitem(item: Item): void {

    this.menuService.deleteItem(item,undefined);
    this.getItems();
  }
  deletesubitem(item:Item,subitem: Subitem): void {

    this.menuService.deleteItem(item,subitem);
    this.getItems();
  }
   viewform()
  {
    if(this.view==false)
    this.view=true;
else
this.view=false

  }
  ismenuopen()
  {
    if(this.menuopen==false)
    this.menuopen=true;
else
this.menuopen=false
  }
  addselecteditem(selecteditemid:number)
  {
    if(this.subview==false)
    this.subview=true;
else
this.subview=false
   return this.selecteditemid=selecteditemid;

  }
  editselecteditem(selecteditem:Item)
  {
    if(this.editview==false)
    this.editview=true;
    else
this.editview=false
   return this.selecteditem=selecteditem;

  }
  viewsubform()
  {
    if(this.subview==false)
    this.subview=true;
else
this.subview=false
  }
editselectedsubitem(selectedsubitem:Subitem)
{
  if(this.editsubview==false)
  this.editsubview=true;
  else
this.editsubview=false
 return this.selectedsubitem=selectedsubitem;

}

 drop(event: any) {
   if (isDragDrop(event)) {
   moveItemInArray(this.items, event.previousIndex, event.currentIndex);


   localStorage.setItem('value1',JSON.stringify(this.items));

    }
   function isDragDrop(object: any): object is CdkDragDrop<string[]> {
      return 'previousIndex' in object;
    }

}
dropsubitem(event: any,item:Item) {
  if (isDragDrop(event)) {
  moveItemInArray(this.items[item.id].subitems, event.previousIndex, event.currentIndex);

  localStorage.setItem('value1',JSON.stringify(this.items));

   }
  function isDragDrop(object: any): object is CdkDragDrop<string[]> {
     return 'previousIndex' in object;
   }

}
}
