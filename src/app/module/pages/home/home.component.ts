import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DespesasService } from 'src/app/service/despesas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private despesaService: DespesasService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.filtrarDespesas();
  }

  filtrarDespesas(){
    this.spinnerService.show();
    this.despesaService.filtrarDespesasService().subscribe(despesas => {
        console.log(despesas);
    }, error => {

    });
    this.spinnerService.hide();
  }

}
