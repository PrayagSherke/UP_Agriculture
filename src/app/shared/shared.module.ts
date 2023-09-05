import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



// Create a custom TranslateLoader to load translations from the assets folder
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
@NgModule({
  declarations: [
    FormControlComponent, 
    TableComponent, 
    DataPropertyGetterPipe, 
    HeaderComponent, 
    FooterComponent,
    PageHeadingComponent,
    ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

  ],
  schemas:[NO_ERRORS_SCHEMA], 
  exports: [
    FormControlComponent,
    TableComponent,
    RouterModule,
    AppMaterialModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    PageHeadingComponent,
    
  ],
  providers: [BilingualService, DatePipe],
})
export class SharedModule { }
