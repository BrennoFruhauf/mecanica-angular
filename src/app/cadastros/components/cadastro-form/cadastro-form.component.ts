import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastrosService } from '../../services/cadastros.service';
import { AddressAPI } from './interface/addressAPI';
import { AddressService } from './service/address.service';
import { Person } from '../../model/person';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss'],
})
export class CadastroFormComponent {
  registerForm: FormGroup;
  disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private cadastrosService: CadastrosService,
    private location: Location
  ) {
    this.registerForm = this.formBuilder.group({
      type: ['cliente', [Validators.required]],
      name: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.email]],
      address: this.addressForm(),
      // cep: [null],
      // street: [null],
      // addressNumber: [null],
      // complement: [null],
      // district: [null],
      // city: [null],
      // state: [null],
      vehicles: this.formBuilder.array([this.vehicleForm()]),
    });

    this.registerForm.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updateButton();
      });
    });
  }

  getCep() {
    // const cep1: string = this.registerForm.get('cep')?.value;
    const cep: any = this.registerForm.get('address')?.get('cep')?.value;
    console.log(cep);

    if (cep.length > 0) {
      this.resetAddressForm();
      this.addressService
        .getAddress(cep)
        .subscribe((result) => this.fillAddressForm(result));
    }
  }

  fillAddressForm(data: AddressAPI) {
    this.registerForm.patchValue({
      address: {
        cep: data.cep,
        street: data.street,
        district: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    });
  }

  resetAddressForm() {
    this.registerForm.patchValue({
      address: {
        cep: '',
        street: '',
        district: '',
        city: '',
        state: '',
      },
    });
  }

  addressForm() {
    return this.formBuilder.group({
      cep: [null],
      street: [null],
      addressNumber: [null],
      complement: [null],
      district: [null],
      city: [null],
      state: [null],
    });
  }

  get address(): FormGroup {
    return this.registerForm.get('address') as FormGroup;
  }

  vehicleForm(): FormGroup {
    return this.formBuilder.group({
      board: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      color: [null, [Validators.required]],
    });
  }

  get vehicles(): FormArray {
    return this.registerForm.get('vehicles') as FormArray;
  }

  addVehicle() {
    this.vehicles.push(this.vehicleForm());
  }

  onRemove(index: number) {
    this.vehicles.removeAt(index);
  }

  updateButton() {
    this.disabled = !this.registerForm.valid;
  }

  onRegister() {
    this.cadastrosService.save(this.registerForm.value).subscribe({
      next: (n) => this.onSuccess(n),
      error: (e) => this.onError(),
    });
  }

  private onSuccess(object: Person) {
    this.onCancel();
    console.log(object);
  }

  private onError() {}

  onCancel() {
    this.location.back();
  }
}
