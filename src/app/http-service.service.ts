import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private REST_API_SERVER = "http://222.252.23.17:8086/";

  constructor(private http: HttpClient) { }

  public get (path: string) {
    return this.http.get(this.REST_API_SERVER + path);
  }
}
