import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MpService {
  readonly URL_API = 'http://localhost:3000/api/mp';
  constructor(private http: HttpClient) { }

  getUserCards(id) {
    return this.http.get(this.URL_API + `/usercards/${id}`);
  }

  getUserSuscription(id) {
    return this.http.get(this.URL_API + `/usersuscription/${id}`);
  }

  cancelUserSuscription(id, status, currentUserLog) {
    return this.http.put(this.URL_API + `/usercancelsuscription/`, {"id": id, "status": status, "current": currentUserLog});
  }

}
