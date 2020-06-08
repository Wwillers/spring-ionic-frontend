import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl

  items: CategoriaDTO[];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        console.log(error);
      })
  }

}
