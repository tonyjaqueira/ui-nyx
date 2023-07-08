import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasTotaisMesResponse } from 'src/app/model/DespesasTotaisMesResponse';
import { DespesasService } from 'src/app/service/despesas.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-despesas-mes',
  templateUrl: './despesas-mes.component.html',
  styleUrls: ['./despesas-mes.component.css']
})
export class DespesasMesComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['mes', 'valorTotal'];
  dataSource = new MatTableDataSource<DespesasTotaisMesResponse>();
  grafico: any;

  constructor(private _despesaService: DespesasService,
              private _spinnerService: NgxSpinnerService,
              private _utilService: UtilService) {}

  ngOnInit(): void {
    this.filtrarDespesasMes();
  }

  filtrarDespesasMes(){
    this._spinnerService.show();
    this._despesaService.filtrarDespesasMesService().subscribe((despesas: DespesasTotaisMesResponse[]) => {
      this.dataSource = new MatTableDataSource<DespesasTotaisMesResponse>(despesas);
      this.dataSource.paginator = this.paginator;
      this.criarGraficoDespesasMes(despesas);
      this._spinnerService.hide();
    }, error => {
        this._utilService.messageToast("Ocorreu um erro ao tentar filtar as despesas!","Atenção!");
        this._spinnerService.hide();
    });
  }

  criarGraficoDespesasMes(despesasList: DespesasTotaisMesResponse[]){
    const meses = despesasList.map(despesas => this.obterNomeMes(despesas.mes));
    const valores = despesasList.map(despesas => despesas.valorTotal);
    this.grafico = this._despesaService.criarGraficoBarra(meses, valores, "Gráfico Despesas Mensais");
  }

  obterNomeMes(numeroMes: number): string {
   return this._utilService.obterNomeMes(numeroMes);
  }

  mascaraMonetaria(valor: any){
    return this._utilService.maskMoney(valor);
  }

}
