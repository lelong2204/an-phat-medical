import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private REST_API_SERVER = "http://222.252.23.17:8086/";
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  constructor(private http: HttpClient) { }

  public get (path: string) {
    return this.http.get(this.REST_API_SERVER + path);
  }

  public post (path: string, body: any) {
    return this.http.post(this.REST_API_SERVER + path, body, {
      headers: this.headers
    });
  }

  public delete (path: string) {
    return this.http.delete(this.REST_API_SERVER + path);
  }
}
