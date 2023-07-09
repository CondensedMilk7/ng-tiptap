import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTiptapModule } from 'ngx-tiptap';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzGridModule} from "ng-zorro-antd/grid";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {CustomStylesDirective} from "./custom-styles.directive";
import { ColorPickerModule } from 'ngx-color-picker';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LinkmodalComponent } from './linkmodal/linkmodal.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CustomStylesDirective, LinkmodalComponent, ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxTiptapModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
    NzCardModule,
    NzSpaceModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    ColorPickerModule,
    NzCollapseModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
