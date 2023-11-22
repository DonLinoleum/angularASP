import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { IUser } from "../types/user.type";

@Injectable()
export class UserService
{
    private url = "http://192.168.100.250:5105/api/users"
    constructor(private http:HttpClient){}

    public getUsers()
    {
        return this.http.get<IUser[]>(this.url)
    }

    public createUser(user:User)
    {
        const myheaders = new HttpHeaders().set("Content-Type","application/json")
        return this.http.post<IUser>(this.url,JSON.stringify(user),{headers:myheaders})
    }

    public updateUser(user:User)
    {
        const myheaders = new HttpHeaders().set("Content-Type","application/json")
        return this.http.put<IUser>(this.url,JSON.stringify(user),{headers:myheaders})
    }

    public deleteUser(id:number)
    {

        return this.http.delete<IUser>(this.url + "/" + id)
    }
}