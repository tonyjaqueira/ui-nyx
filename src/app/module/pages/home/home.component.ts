import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesaGeralResponse } from 'src/app/model/DespesaGeralResponse';
import { DespesasService } from 'src/app/service/despesas.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['ano_movimentacao', 'mes_movimentacao', 'orgao_nome', 'unidade_nome', 'categoria_economica_nome', 'grupo_despesa_nome', 'valor_pago'];
  dataSource = new MatTableDataSource<DespesaGeralResponse>();
  grafico: any;


  constructor(private _despesaService: DespesasService,
              private _spinnerService: NgxSpinnerService,
              private _utilService: UtilService) { }

  ngOnInit(): void {
    this.filtrarDespesas();
  }

  filtrarDespesas(){
    this._spinnerService.show();
    this._despesaService.filtrarDespesasService().subscribe((despesas: DespesaGeralResponse[]) => {
      this.dataSource = new MatTableDataSource<DespesaGeralResponse>(despesas);
      this.dataSource.paginator = this.paginator;
      this._spinnerService.hide();
    }, error => {
      this._utilService.messageToast("Ocorreu um erro ao tentar filtar as despesas!","Atenção!");
      this._spinnerService.hide();
    });
    this._spinnerService.hide();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obterNomeMes(numeroMes: number): string {
    return this._utilService.obterNomeMes(numeroMes);
   }

  mascaraMonetaria(valor: any){
    return this._utilService.maskMoney(valor);
  }

}

