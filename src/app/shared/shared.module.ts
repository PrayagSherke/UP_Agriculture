import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from './components/table/table.component';
import { DataPropertyGetterPipe } from '../shared/components/table/data-property-getter-pipe/data-property-getter.pipe';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BilingualService } from '../shared/services/bilingual.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'

// Create a custom TranslateLoader to load translations from the assets folder
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
@NgModule({
  declarations: [FormControlComponent, TableComponent, DataPropertyGetterPipe, HeaderComponent, FooterComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

  ],
  exports: [
    FormControlComponent,
    TableComponent,
    RouterModule,
    AppMaterialModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    
  ],
  providers: [BilingualService],
})
export class SharedModule { }
