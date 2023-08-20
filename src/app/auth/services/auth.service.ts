import { Observable, map, of, tap, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl : string = enviroments.baseUrl
    private user? : User

    constructor(private http: HttpClient) { }

    get currentUser():User | undefined{
        if(!this.user) return undefined
        return structuredClone(this.user)
    }
    
    logIn(email:string, password:string):Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => {this.user = user;}),
                tap(user => localStorage.setItem('token',user.id.toString()))
            );
    }

    onLogout():void{
        this.user = undefined;
        localStorage.clear()
    }
    
    ckeckStatus():Observable<boolean>{
        if(!localStorage.getItem('token')) return of(false)
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.baseUrl}/users/1`)
                    .pipe(
                        tap(user => this.user = user),
                        map(user => !!user),
                        catchError(errpr => of(false))
                    )
    }
}