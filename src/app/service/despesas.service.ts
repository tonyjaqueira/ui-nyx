import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesasTotaisMesResponse } from '../model/DespesasTotaisMesResponse';
import { DespesasTotaisCategoriaResponse } from '../model/DespesasTotaisCategoriaResponse';
import { FonteRecursosResponse } from '../model/FonteRecursosResponse';
import { DespesaGeralResponse } from '../model/DespesaGeralResponse';
import Chart from 'chart.js/auto';

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


   criarGraficoBarra(labesl: any[], valores: any[], titulo: any){
    return new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: labesl,
	       datasets: [{
    label: titulo,
    data: valores,
    backgroundColor: [
      'red',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',	
      'purple',
      'brown',
      'gray',
      'salmon',
      'acquamarine',
      'beige',
    ]
  }],
      },
      options: {
        aspectRatio:1.1
      }

    });
  }

  
  criarGraficoPizza(labesl: any[], valores: any[], titulo: any){
    return new Chart("MyChart", {
      type: 'pie',

      data: {
        labels: labesl,
	       datasets: [{
    label: titulo,
    data: valores,
    backgroundColor: [
      'red',
      'yellow',
      'pink',
      'green',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:1.0
      }

    });
  }

}
