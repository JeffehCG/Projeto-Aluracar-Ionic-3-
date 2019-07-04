import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera) {
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

  tiraFoto(){// Tirando foto pelo smatphone
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI, //Acessando a imagem atraves da uri
      saveToPhotoAlbum: true, //Salvando a foto no album do dispositivo
      correctOrientation: true //Imagem não ficar invertida\
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri) ;//Normalizando para qualquer plataforma
      this._usuariosService.salvaAvatar(fotoUri);
    })
    .catch(err => console.log(err))
  }

  get avatar(){
    return this._usuariosService.obtemAvatar();
  }

}
