import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  filtrarDespesas(){
    this.router.navigate(['/home']);
  }

  filtrarDespesasMes(){
    this.router.navigate(['/despesas-mes']);
  }

  filtrarDespesasCategoria(){
    this.router.navigate(['/despesas-categoria']);
  }

  filtrarOrigemRecursos(){
    this.router.navigate(['/origem-recurso']);
  }

}
