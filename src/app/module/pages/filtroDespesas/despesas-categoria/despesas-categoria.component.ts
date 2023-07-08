import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasTotaisCategoriaResponse } from 'src/app/model/DespesasTotaisCategoriaResponse';
import { DespesasService } from 'src/app/service/despesas.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-despesas-categoria',
  templateUrl: './despesas-categoria.component.html',
  styleUrls: ['./despesas-categoria.component.css']
})
export class DespesasCategoriaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['categoria', 'valorTotal'];
  dataSource = new MatTableDataSource<DespesasTotaisCategoriaResponse>();
  grafico: any;

  constructor(private _despesaService: DespesasService,
              private _spinnerService: NgxSpinnerService,
              private _utilService: UtilService) { }

  ngOnInit(): void {
    this.filtrarDespesasCategoria();
  }

  
  filtrarDespesasCategoria(){
    this._spinnerService.show();
    this._despesaService.filtrarDespesasCategoriaService().subscribe((despesas: DespesasTotaisCategoriaResponse[]) => {
      this.dataSource = new MatTableDataSource<DespesasTotaisCategoriaResponse>(despesas);
      this.dataSource.paginator = this.paginator;
      this.criarGraficoDespesasMes(despesas);
      this._spinnerService.hide();
    }, error => {
      this._utilService.messageToast("Ocorreu um erro ao tentar filtar as despesas!","Atenção!");
      this._spinnerService.hide();
    });
  }

  criarGraficoDespesasMes(despesasList: DespesasTotaisCategoriaResponse[]){
    const categoria = despesasList.map(despesas => despesas.categoria);
    const valores = despesasList.map(despesas => despesas.valorTotal);
    this.grafico = this._despesaService.criarGraficoPizza(categoria, valores, "Gráfico Despesas Agrupadas Categoria");
  }

  mascaraMonetaria(valor: any){
    return this._utilService.maskMoney(valor);
  }

}
