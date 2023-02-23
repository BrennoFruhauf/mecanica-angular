import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastrosService } from '../../services/cadastros.service';
import { AddressAPI } from './interface/addressAPI';
import { AddressService } from './service/address.service';
import { Person } from '../../model/person';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from './service/vehicle.service';
import { VehicleAPI } from './interface/vehicleAPI';

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
    private vehicleService: VehicleService,
    private cadastrosService: CadastrosService,
    private location: Location
  ) {
    this.registerForm = this.formBuilder.group({
      personRole: ['CLIENT', [Validators.required]],
      name: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.email]],
      address: this.addressForm(),
      vehicles: this.formBuilder.array([this.vehicleForm()]),
    });

    this.registerForm.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.updateButton();
      });
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

  vehicleForm(): FormGroup {
    return this.formBuilder.group({
      board: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required]],
      color: [null, [Validators.required]],
    });
  }

  get address(): FormGroup {
    return this.registerForm.get('address') as FormGroup;
  }

  get vehicles(): FormArray {
    return this.registerForm.get('vehicles') as FormArray;
  }

  getCep() {
    const cep: string = this.registerForm.get('address')?.get('cep')?.value;
    if (cep != null) {
      if (cep.length === 8) {
        this.addressService
          .getAddress(cep)
          .subscribe((result) => this.fillAddressForm(result));
      }
    }
  }

  getVehicle(index: number) {
    const board: string = this.registerForm
      .get(`vehicles`)
      ?.get(`${index}`)
      ?.get('board')?.value;

    if (board != null) {
      if (board.length === 7) {
        this.vehicleService
          .getVehicle(board)
          .subscribe((res) => this.fillVehicleForm(res, index));
      }
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

  fillVehicleForm(data: VehicleAPI, index: number) {
    const vehicle = this.registerForm.get(`vehicles`)?.get(`${index}`);
    return vehicle?.patchValue({
      brand: data.Marca,
      model: data.Modelo,
      year: data.AnoModelo,
      color: data.cor,
    });
  }

  resetAddressForm() {
    this.registerForm.patchValue({
      address: {
        cep: '',
        street: '',
        addressNumber: '',
        complement: '',
        district: '',
        city: '',
        state: '',
      },
    });
  }

  addVehicle() {
    this.vehicles.push(this.vehicleForm());
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

  onCancel() {
    this.location.back();
  }

  onRemove(index: number) {
    this.vehicles.removeAt(index);
  }

  private onSuccess(object: Person) {
    this.onCancel();
    console.log(object);
  }

  private onError() {}
}
