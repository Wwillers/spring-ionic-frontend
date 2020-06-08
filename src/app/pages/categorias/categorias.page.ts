import { CategoriaService } from './../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
  }

}
