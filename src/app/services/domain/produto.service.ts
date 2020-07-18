import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient) {
    }

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }
}