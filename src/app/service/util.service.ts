import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _toastr: ToastrService) { }

  maskMoney(value: number) {
    if(value !== null && value !== undefined){
      return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }else{
      return "R$ 0,00";
    }
  }

  obterNomeMes(numeroMes: number): string {
    const data = new Date();
    data.setMonth(numeroMes - 1);
    const timeFormat: Intl.DateTimeFormatOptions = { month: 'long'}
    return data.toLocaleDateString('pt-BR', timeFormat);
  }

  messageToast(message: string, type: string) {
    this._toastr.info(message, type);
  }

}
