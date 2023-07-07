import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasService } from 'src/app/service/despesas.service';

@Component({
  selector: 'app-despesas-categoria',
  templateUrl: './despesas-categoria.component.html',
  styleUrls: ['./despesas-categoria.component.css']
})
export class DespesasCategoriaComponent implements OnInit {

  constructor(private despesaService: DespesasService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.filtrarDespesasCategoria();
  }

  
  filtrarDespesasCategoria(){
    this.spinnerService.show();
    this.despesaService.filtrarDespesasCategoriaService().subscribe(despesas => {
        console.log(despesas);
    }, error => {

    });
    this.spinnerService.hide();
  }

}
