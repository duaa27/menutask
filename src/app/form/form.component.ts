import { Component, OnInit,Input } from '@angular/core';

import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Item } from '../item';
import { MenuService } from '../menu.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

@Input() selecteditemid:number=-1;

  items: Item[] = [];

  constructor(private menuService: MenuService) { }
  itemForm= new FormGroup(
    {

      name  : new FormControl('',Validators.required),
      link:new FormControl('',Validators.required)
    });
    get name()
    {
      return this.itemForm.get('name');
    }
    get link()
    {
      return this.itemForm.get('link');
    }
  ngOnInit(): void {
  }
  onSubmit()  {


 this.menuService.addItem( this.itemForm.value,this.selecteditemid);

 this.itemForm.reset();
}
add(item:Item)
{
  console.log(item);
}

}
