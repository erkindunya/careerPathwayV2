import { Items, ItemAddResult, ItemUpdateResult } from 'sp-pnp-js/lib/pnp';
import * as $ from 'jquery';
import 'bootstrap';
import * as toastr from 'toastr';

export enum SharePointPopupFieldType {
  Text,
  Select,
}

export interface SharePointPopupFieldOption {
  title: string;
  value?: string;
}

export interface SharePointPopupField {
  title: string;
  placeholder?: string;
  type: SharePointPopupFieldType;
  column: string;
  options?: SharePointPopupFieldOption[];
  required?: boolean;
}

export class SharePointPopup {
  private $modal: JQuery<HTMLElement>;
  private createEvent: (result: ItemAddResult) => void;
  private updateEvent: (result: ItemUpdateResult) => void;
  private recordId: number;
  /**
   * Create a popup to perform simple actions on a sharepoint list
   */
  constructor(private formId: string,
              private collection: Items,
              private fields: SharePointPopupField[] = null) {
    this.$modal = this.createForm(fields);
    $('body').append(this.$modal);
    this.bindEvents();
  }

  show(recordId: number = null) {
    this.$modal.modal();
    this.recordId = recordId;
    console.log(recordId);
    if (recordId === null) {
      $(`#${this.formId}__buttons_createButton`).show();
      $(`#${this.formId}__buttons_editButton`).hide();
    } else {
      $(`#${this.formId}__buttons_createButton`).hide();
      $(`#${this.formId}__buttons_editButton`).show();
      this.collection.getById(this.recordId).get().then((result) => {
        console.log(result);
        console.log(this.fields);
        this.fields.forEach((field) => {
          $(`#${this.formId}_${field.column}`).val(result[field.column]);
        });
      }).catch((error) => {
        toastr.error('There was a problem getting the item.');
      });

    }
  }

  public onCreated(callback: (result: ItemAddResult) => void) {
    this.createEvent = callback;
  }

  public onUpdated(callback: (result: ItemUpdateResult) => void) {
    this.updateEvent = callback;
  }

  private bindEvents() {
    $(`#${this.formId}__buttons_createButton`).click((event) => {
      event.preventDefault();
      this.clearFields();
      if (!this.isValid()) return;
      toastr.info(`Submitting...`);
      const createObject = {};
      this.fields.forEach((field) => {
        createObject[field.column] = $(`#${this.formId}_${field.column}`).val();
      });
      this.collection.add(createObject).then((result: ItemAddResult) => {
        toastr.clear();
        toastr.success(`Data submitted.`);
        this.$modal.modal('hide');
        if (this.createEvent) {
          console.log('Calling success event.');
          this.createEvent(result);
        }
      }).catch((error) => {
        toastr.error('There was a problem submitting the form.');
      });
    });

    $(`#${this.formId}__buttons_editButton`).click((event) => {
      event.preventDefault();
      this.clearFields();
      if (!this.isValid()) return;
      toastr.info(`Submitting...`);
      const editObject = {};
      editObject['ID'] = this.recordId;
      this.fields.forEach((field) => {
        editObject[field.column] = $(`#${this.formId}_${field.column}`).val();
      });
      this.collection.getById(this.recordId).update(editObject).then((result: ItemUpdateResult) => {
        toastr.clear();
        toastr.success(`Data submitted.`);
        this.$modal.modal('hide');
        if (this.updateEvent) {
          console.log('Calling success event.');
          this.updateEvent(result);
        }
      }).catch((error) => {
        toastr.error('There was a problem submitting the form.');
      });
    });

    $(`#${this.formId}__buttons_cancelButton`).click((event) => {
      event.preventDefault();
      this.$modal.modal('hide');
    });
  }

  private clearFields() {
    $(`#${this.formId}`).find(':input').each(function () {
      switch ($(this).prop('type')) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'tel':
        case 'email':
          $(this).val('');
          break;
        case 'checkbox':
        case 'radio':
          $(this).prop('checked', false);
          break;
      }
    });
  }

  private isValid(): boolean {
    let isValid = true;
    this.fields.forEach((field) => {
      if (field.required && $(`#${this.formId}_${field.column}`).val() === '') {
        isValid = false;
        toastr.error(`${field.title} is required.`);
      }
    });
    return isValid;
  }

  private createForm(fields: SharePointPopupField[]): JQuery<HTMLElement> {
    const $modal = $(`<div id="${this.formId}" class="modal fade" tabindex="-1" role="dialog" ` +
                          `aria-labelledby="mySmallModalLabel" aria-hidden="true"></div>`);
    const $modalDialog = $('<div class="modal-dialog"></div>');
    const $modalContent = $('<div class="modal-content"></div>');
    const $modalBody = $('<div class="modal-body"></div>');
    const $row = $('<div class="row"></div>');
    const $columns = $('<div class="col-sm-12"></div>');
    fields.forEach((field) => {
      $columns.append(this.createField(field));
    });
    $columns.append(this.createButtons());

    $row.append($columns);
    $modalBody.append($row);
    $modalContent.append($modalBody);
    $modalDialog.append($modalContent);
    $modal.append($modalDialog);
    return $modal;
  }

  private createButtons(): JQuery<HTMLElement> {
    const $createButton = $(`<button type="button" ` +
                                    `id="${this.formId}__buttons_createButton" ` +
                                    `class="btn btn-success" ` +
                                    `>Create</button>`);

    const $editButton = $(`<button type="button" ` +
                                    `id="${this.formId}__buttons_editButton" ` +
                                    `class="btn btn-success" ` +
                                    `>Save Changes</button>`);
                                          
    const $cancelButton = $(`<button type="button" ` +
                                    `id="${this.formId}__buttons_cancelButton" ` +
                                    `class="btn btn-danger" ` +
                                    `>Cancel</button>`);

    return $('<div class="button-group"></div>').append($createButton)
                                                .append($editButton)
                                                .append($cancelButton);
  }

  private createField(field: SharePointPopupField): JQuery<HTMLElement> {
    const $formGroup = $('<div class="form-group"></div>');
    const $label = $(`<label for="${this.formId}_${field.column}">${field.title}</label>`);
    let $input: JQuery<HTMLElement>;
    switch (field.type) {
      case SharePointPopupFieldType.Text:
        $input = $(`<input type="text" class="form-control" ` +
                   `id="${this.formId}_${field.column}" placeholder="${field.placeholder}"` +
                   `${field.required ? 'required' : ''}>`);
        break;
      case SharePointPopupFieldType.Select:
        $input = $(`<select class="form-control" id="${this.formId}_${field.column}"></select>`);
        field.options.forEach((option) => {
          $input.append(`<option value="${option.value || option.title}">${option.title}</option>`);
        });
        break;
      default:
        $input = $(`<input type="text" class="form-control" ` + 
                   `id="${this.formId}_${field.column}" placeholder="${field.placeholder}">`);
    }
    return $formGroup.append($label).append($input);
  }

}
