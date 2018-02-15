import { AppErrorHandler } from './../errors/model/app-error-handler';
import { PostService } from './services/post.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment/moment.module';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { FullCalendarModule } from 'ng-fullcalendar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule , MatButtonModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { PostsComponent } from './posts/posts.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        ButtonsModule.forRoot(),
        ModalModule.forRoot(),
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MomentModule ,
        HttpClientModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        routedComponents,
        PostsComponent
    ],
    providers: [
        PostService ,
        { provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
