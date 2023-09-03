import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser, User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  register(user: RegisterUser) {
    return this.httpClient.post<User>(environment.api+ "/user/register", {...user})
  };

  login(email: string, password: string) {
    return this.httpClient.post<LoginUser>(environment.api + "/user/login", {
      email,
      password
    });
  };

  update(user: FormData) {
    return this.httpClient.put<User>(environment.api + "/user", user);
  };
}
