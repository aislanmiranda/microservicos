import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpUtilService } from './service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private path = 'values';

  constructor(
		private http: Http, 
		private httpUtil: HttpUtilService
	) { }

  getAll(): Observable<any> {
    return this.http
			.get(this.httpUtil.url(this.path), this.httpUtil.headers())
		
  }

  // search(term): Observable<any[]> {
  //   return this.http
  //     .get(
  //       this.httpUtil.url(this.path + '/admin/search/' + term),
  //       this.httpUtil.headers()
  //     )
  //     .map(this.httpUtil.extrairDados)
  //     .catch(this.httpUtil.processarErros);
  // }

  // delete(id): Observable<any[]> {
  //   return this.http
  //     .delete(this.httpUtil.url(this.path + '/' + id), this.httpUtil.headers())
  //     .map(this.httpUtil.extrairDados)
  //     .catch(this.httpUtil.processarErros);
  // }

  // save(vm) {

  //   const produto = {
  //     "CodigoBarras": vm.codigoBarras,
  //     "Nome": vm.nome,
  //     "Preco": vm.preco
  //   };

  //   return this.http
  //     .post(this.httpUtil.url(this.path), produto, this.httpUtil.headers())
  //     .map(this.httpUtil.extrairDados)
  //     .catch(this.httpUtil.processarErros);
  // }

  // update(vm) {

  //   const produto = {
  //     "CodigoBarras": vm.codigoBarras,
  //     "Nome": vm.nome,
  //     "Preco": vm.preco
  //   };

  //   return this.http
  //     .put(
  //       this.httpUtil.url(this.path),
  //       produto,
  //       this.httpUtil.headers()
  //     )
  //     .map(this.httpUtil.extrairDados)
  //     .catch(this.httpUtil.processarErros);
  // }
}