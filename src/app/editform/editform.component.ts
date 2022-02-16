import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MenuService } from '../menu.service';
import { Item } from '../item';
import { Subitem } from '../subitem';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {

  @Input() selecteditem:Item={id:-1,name:"",link:"",subitems:[]};
  @Input() selectedsubitem:Subitem={id:-1,name:"",link:"",itemId:-1};


selectedvalue:any;
newitem:any;

  constructor(private menuService: MenuService) { }
  edititemForm= new FormGroup(
    {

      name  : new FormControl('',Validators.required),
      link:new FormControl('',Validators.required)
    });
    get name()
    {
      return this.edititemForm.get('name');
    }
    get link()
    {
      return this.edititemForm.get('link');
    }
  ngOnInit(): void {
    if(this.selectedsubitem.id<0)
    {
      this.selectedvalue=this.selecteditem;
    }
    else{
      this.selectedvalue=this.selectedsubitem;
    }
  }
  updateitem()
  {

    if(this.selectedsubitem.id<0)
    {

      this.newitem=this.selecteditem;
    }
    else{
      this.newitem=this.selectedsubitem;
    }

    this.menuService.updateItem(this.newitem.id,this.edititemForm.value,this.selectedsubitem.id,this.selectedsubitem.itemId)
  }

}
