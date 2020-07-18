import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl

  items: CategoriaDTO[];

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {})
  }

  showProducts(categoria_id: string) {
    this.router.navigate(['produtos'], {queryParams: {categorias: categoria_id}});
  }

}
