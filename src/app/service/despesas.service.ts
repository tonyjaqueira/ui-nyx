import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesasTotaisMesResponse } from '../model/DespesasTotaisMesResponse';
import { DespesasTotaisCategoriaResponse } from '../model/DespesasTotaisCategoriaResponse';
import { FonteRecursosResponse } from '../model/FonteRecursosResponse';
import { DespesaGeralResponse } from '../model/DespesaGeralResponse';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  localUrl!: string;

  constructor(private http: HttpClient) {
    this.localUrl = `${environment.apiUrl}/api/nyx`;
   }

   filtrarDespesasMesService(): Observable<DespesasTotaisMesResponse[]>{
      return this.http.get<DespesasTotaisMesResponse[]>(`${this.localUrl}/despesas-mes`);
   }

   filtrarDespesasCategoriaService(): Observable<DespesasTotaisCategoriaResponse[]>{
    return this.http.get<DespesasTotaisCategoriaResponse[]>(`${this.localUrl}/despesas-categoria`);
   }

   filtrarFontesRecursosService(): Observable<FonteRecursosResponse[]>{
    return this.http.get<FonteRecursosResponse[]>(`${this.localUrl}/fonte-recursos`);
   }

   filtrarDespesasService(): Observable<DespesaGeralResponse[]>{
    return this.http.get<DespesaGeralResponse[]>(`${this.localUrl}/filtrar-gastos`);
   }

}
