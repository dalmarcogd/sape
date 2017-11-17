import { SharedModule } from './../../../../shared/shared.module';
import { CalendarModule } from './../../../../components/calendar/calendar.module';
import { ListModule } from './../../../../components/list/list.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule }      from '@angular/core';
import { EventFormComponent } from "./event.form.component";
import { EventListComponent } from "./event.list.component";
import {routing} from "./event.routing";
import { TabModule } from '../../../../components/tab/tab.module';

@NgModule({
  imports:      [ routing, ListModule, CalendarModule, SharedModule, TabModule ],
  declarations: [ EventListComponent, EventFormComponent],
  bootstrap:    [ EventListComponent ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModule { }
