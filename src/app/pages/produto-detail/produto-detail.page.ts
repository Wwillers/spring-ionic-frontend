import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor() { }

  ngOnInit() {
    //mock
    this.item = {
      id: "1",
      nome: "mouse",
      preco: 80.00
    }
  }

}
