import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasService } from 'src/app/service/despesas.service';

@Component({
  selector: 'app-origem-recurso',
  templateUrl: './origem-recurso.component.html',
  styleUrls: ['./origem-recurso.component.css']
})
export class OrigemRecursoComponent implements OnInit {

  constructor(private despesaService: DespesasService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.filtrarOrigemRecursos();
  }

  filtrarOrigemRecursos(){
    this.spinnerService.show();
    this.despesaService.filtrarFontesRecursosService().subscribe(despesas => {
        console.log(despesas);
    }, error => {

    });
    this.spinnerService.hide();
  }

}
