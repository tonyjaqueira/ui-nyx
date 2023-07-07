import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasTotaisMesResponse } from 'src/app/model/DespesasTotaisMesResponse';
import { DespesasService } from 'src/app/service/despesas.service';

@Component({
  selector: 'app-despesas-mes',
  templateUrl: './despesas-mes.component.html',
  styleUrls: ['./despesas-mes.component.css']
})
export class DespesasMesComponent implements OnInit, AfterViewInit  {

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'mes', 'valorTotal'];
  dataSource = new MatTableDataSource<DespesasTotaisMesResponse>();

  constructor(private despesaService: DespesasService,
              private spinnerService: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.filtrarDespesasMes();
  }

  filtrarDespesasMes(){
    this.spinnerService.show();
    this.despesaService.filtrarDespesasMesService().subscribe((despesas: DespesasTotaisMesResponse[]) => {
      this.dataSource = new MatTableDataSource<DespesasTotaisMesResponse>(despesas); ;
    }, error => {

    });
    this.spinnerService.hide();
  }

}
