import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal } from "@ionic-native/onesignal";
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../modelos/agendamento';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar' },
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' }
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider,
    private oneSignal : OneSignal,
    private _agendamentoDao: AgendamentoDaoProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

         //Aqui vocë coloca os dados que coletamos no passo 12 e 7
      
          this.oneSignal.startInit("ONESIGNAL_APP_ID", "Chave_do_servidor"); //Procurar no onesignal e no firebase
                
          //Aqui é caso vocë queria que o push apareça mesmo com o APP aberto
                
          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
                
          //Aqui você vai tratar o recebimento do push notification com todos os dados
                
          this.oneSignal.handleNotificationOpened().subscribe(notification => {  
            let dadosAdicionais = notification.notification.payload.additionalData;
            let agendamentoId = dadosAdicionais['agendamento-id'];

            //Recebendo o agendamento recuperado
            this._agendamentoDao.recupera(agendamentoId)
              .subscribe((agendamento: Agendamento) => {
                agendamento.confirmado = true; //Atualizou como confirmado

                this._agendamentoDao.salva(agendamento)
              })

          });
                
          this.oneSignal.endInit();
      });
  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }

  get avatar(){
    return this._usuariosService.obtemAvatar()
  }
  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

