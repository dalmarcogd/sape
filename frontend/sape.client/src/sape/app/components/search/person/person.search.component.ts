import { Output } from '@angular/core';
import {PersonDTO} from '../../../model/person/person.dto';
import {PersonCrudService} from '../../../service/crud/person/person.crud.service';
import {ServiceLocator} from '../../../service/locator/service.locator';
import { Component, Inject, ViewChild, AfterViewInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'person-search',
  template: `
    <div class="ui {{loading? 'loading disabled' : ''}} search selection dropdown">
        <input name="tags" type="person">
        <i class="dropdown icon"></i>
        <div class="default text">Selecione a pessoa...</div>
        <div class="menu">
            <div *ngFor="let person of results" class="item" (click)="onSelect(person)">
                {{format(person.code, person.name)}}
            </div>
        </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PersonSearchComponent), multi: true
  }]
})
export class PersonSearchComponent implements AfterViewInit, ControlValueAccessor {

  private loading: boolean = false;
  private value: number = null;
  private results: PersonDTO[] = [];
  private propagateChange: Function = (date: Date) => { };
  private component: any;
  @Output() 
  private afterSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private objectOwner: Object;

  ngAfterViewInit() {
    this.component = $('.ui.dropdown').dropdown({});
  }

  private onSelect(value: PersonDTO) : void {
      this.value = value.id;
      this.propagateChange(value.id);
      this.afterSelect.emit([value, this.objectOwner]);
  }

  writeValue(value: number) {
    if(!this.component) { return; }
    
    this.value = value;

    this.component.dropdown('clear');

    let params: Map<string, any> = new Map<string, any>();
    this.personCrudService().readByParams(params).then((values: Array<PersonDTO> | PersonDTO) => {
        if (values instanceof Array) {
            this.results = values;
        } else if (values instanceof Object) {
            this.results = [values];
        }
        this.results.forEach((person: any) => {
            if (person.id == this.value) {
                this.component.dropdown('refresh');
                setTimeout(() => {
                    this.component.dropdown('set selected', this.format(person.code, person.name));
                }, 1);
            }
        });
    });
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  } 

  registerOnTouched(fn: any) { }

  private personCrudService() : PersonCrudService {
    return ServiceLocator.get(PersonCrudService);
  }

  private format(code: any, name: any) { return code + " - " + name};
}