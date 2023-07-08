import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {
  

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  filtrarDespesas(){
    this._router.navigate(['/home']);
  }

  filtrarDespesasMes(){
    this._router.navigate(['/despesas-mes']);
  }

  filtrarDespesasCategoria(){
    this._router.navigate(['/despesas-categoria']);
  }

  filtrarOrigemRecursos(){
    this._router.navigate(['/origem-recurso']);
  }

}
