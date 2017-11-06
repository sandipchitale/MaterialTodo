import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  private todosUrl = 'api/todos';  // URL to web api

  constructor(private http: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    return this.http.get(this.todosUrl)
      .toPromise()
      .then(
        (response) => response as Todo[]
      )
      .catch(this.handleError);
  }

  create(title: string): Promise<Todo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({title: title}))
      .toPromise()
      .then(res => res as Todo)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
