import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { FonteRecursosResponse } from 'src/app/model/FonteRecursosResponse';
import { DespesasService } from 'src/app/service/despesas.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-origem-recurso',
  templateUrl: './origem-recurso.component.html',
  styleUrls: ['./origem-recurso.component.css']
})
export class OrigemRecursoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['origem', 'valorTotal'];
  dataSource = new MatTableDataSource<FonteRecursosResponse>();
  grafico: any;

  constructor(private _despesaService: DespesasService,
              private _spinnerService: NgxSpinnerService,
              private _utilService: UtilService) { }

  ngOnInit(): void {
    this.filtrarOrigemRecursos();
  }

  filtrarOrigemRecursos(){
    this._spinnerService.show();
    this._despesaService.filtrarFontesRecursosService().subscribe((despesas: FonteRecursosResponse[]) => {
      this.dataSource = new MatTableDataSource<FonteRecursosResponse>(despesas);
      this.dataSource.paginator = this.paginator;
      this.criarGraficoFonteRecursos(despesas);
      this._spinnerService.hide();
    }, error => {
      this._utilService.messageToast("Ocorreu um erro ao tentar filtar as despesas!","Atenção!");
      this._spinnerService.hide();
    });
  }

  criarGraficoFonteRecursos(despesasList: FonteRecursosResponse[]){
    const categoria = despesasList.map(despesas => despesas.origemRecurso);
    const valores = despesasList.map(despesas => despesas.valorEmpenhado);
    this.grafico = this._despesaService.criarGraficoPizza(categoria, valores, "Gráfico Origem Recursos");
  }

  mascaraMonetaria(valor: any){
    return this._utilService.maskMoney(valor);
  }

}
