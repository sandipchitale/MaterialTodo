import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  private todosUrl = 'api/todos';  // URL to web api

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  create(title: string): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, {title: title, completed: false} as Todo);
  }

  delete(id: number): Observable<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
