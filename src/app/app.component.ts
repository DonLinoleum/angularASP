import { Component,OnInit,TemplateRef,ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User } from './models/user';
import { IUser } from './types/user.type';
import { UserService } from './services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,HttpClientModule,NgTemplateOutlet,NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit 
{
  mainClass = 'main'
  
  @ViewChild("readOnlyTemplate",{static:false})
  readOnlyTemplate: TemplateRef<any> | undefined 

  @ViewChild("editTemplate",{static:false})
  editTemplate: TemplateRef<any> | undefined

  editedUser: User|null = null
  users: IUser[] = []
  isNewRecord: boolean = false
  statusMessage:string = ""

  constructor(private serv:UserService){}


  ngOnInit(){
    this.loadUsers()
  }

   loadUsers()
  {
    this.serv.getUsers().subscribe((data:IUser[])=>{
        this.users = data
    })
  }

   addUser()
  {
    this.editedUser = new User(0,"",0)
    this.users.push(this.editedUser)
    this.isNewRecord = true
  }

   editUser(user:User)
  {
    this.editedUser = new User(user.id,user.name,user.age)
  }

   loadTemplate(user:User){
    if (this.editedUser && this.editedUser.id === user.id)
      return this.editTemplate
    else
      return this.readOnlyTemplate
  }

   saveUser()
  {
    if (this.isNewRecord){
      this.serv.createUser(this.editedUser as User).subscribe(_ =>{
        this.statusMessage = "Данные добавлены"
        this.loadUsers()
      })
    }
    else{
      this.serv.updateUser(this.editedUser as User).subscribe(_=>{
          this.statusMessage = "Данные обновлены"
          this.loadUsers()
      })
    }
    this.editedUser = null
  }

   cancel()
  {
      if (this.isNewRecord){
        this.users.pop()
        this.isNewRecord = false
      }
      this.editedUser = null
  }

   delete(user:User)
  {
      this.serv.deleteUser(user.id).subscribe(_=>{
        this.statusMessage = "Данные удалены"
        this.loadUsers()
      })
  }

}
