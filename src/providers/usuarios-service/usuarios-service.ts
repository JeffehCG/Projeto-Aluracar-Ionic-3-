import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

const CHAVE = "avatar-usuario";

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {
  }

  efetuaLogin(email, senha) {
    return this._http.post<Usuario>('http://192.168.0.8:8080/api/login', { email, senha})
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  //Metodo para salvar imagem tirada pela camera
  salvaAvatar(avatar){
    localStorage.setItem(CHAVE, avatar);
  }

  //Pegando o avatar salvo
  obtemAvatar(){
    return localStorage.getItem(CHAVE)
          ? localStorage.getItem(CHAVE)
          : 'assets/img/avatar-padrao.jpg'; //Se não achar nenhum avatar salvo, usar avatar padrão
  }
}
