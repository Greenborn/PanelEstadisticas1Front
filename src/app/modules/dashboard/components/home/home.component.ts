import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapSideMenuLink } from 'src/app/modules/AppUIUtils/components/bootstrap-sidemenu/model/bootstrap-sidemenu-link';
import { BootstrapSideMenuConfig } from 'src/app/modules/AppUIUtils/components/bootstrap-sidemenu/model/bootstrap.sidemenu.config';
import { AuthService } from 'src/app/modules/autentication/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public activeNav:string = "ngb-nav-0";
  public menuConfig:BootstrapSideMenuConfig = new BootstrapSideMenuConfig();

  constructor(
    private authService:      AuthService,
    private dashboardService: DashboardService
  ) { }

  private ChangeLocationSubj:any = null;
  ngOnInit(): void {
    this.ChangeLocationSubj = this.dashboardService.ChangeLocation.subscribe({  next: ( response: any ) => {
      this.activeNav                            = response.location;
      this.dashboardService.paramsDetalleEquipo = response.params;
    } });

    this.menuConfig.addLink(new BootstrapSideMenuLink({ id:1, icon: 'gear', name:'Equipos', color:'rgb(166, 176, 255)' }));
    this.menuConfig.addLink(new BootstrapSideMenuLink({ id:2, icon: 'clipboard-data', name:'Estadisticas',color:'rgb(166, 176, 255)' }));
    this.menuConfig.addLink(new BootstrapSideMenuLink({ id:3, icon: 'map', name:'Mapa', color:'rgb(166, 176, 255)' }));
    
  }

  ngOnDestroy(){
    this.ChangeLocationSubj.unsubscribe();
  }

  
}
