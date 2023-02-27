import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CadastrosService } from '../../services/cadastros.service';
import { RegisterService } from './service/register.service';
import { AddressAPI } from './interface/addressAPI';
import { VehicleAPI } from './interface/vehicleAPI';
import { Person } from '../../model/person';
import { CnpjAPI } from './interface/cnpjAPI';

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
    private registerService: RegisterService,
    private cadastrosService: CadastrosService,
    private location: Location
  ) {
    this.registerForm = this.formBuilder.group({
      personRole: ['CLIENT', [Validators.required]],
      name: [null, [Validators.required]],
      registerNumber: [null, [Validators.required]],
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

    if (cep.length === 8) {
      this.registerService.getAddress(cep).subscribe({
        next: (next) => this.fillAddressForm(next),
        error: (err) => this.resetAddressForm(),
      });
    }
  }

  getDocument() {
    const number: string = this.registerForm.get('registerNumber')?.value;
    const cpf: number = 11;
    const cnpj: number = 14;

    if (number.length === cnpj) {
      this.registerService.getCNPJ(number).subscribe({
        next: (result) => {
          this.fillCNPJ(result);
          this.registerService.getAddress(result.cep).subscribe({
            next: (res) => this.fillAddressForm(res),
            error: (err) => this.resetAddressForm(),
          });
        },
        error: (err) => {
          this.resetBasicData();
          this.resetAddressForm();
        },
      });
    } else if (number.length != cpf) {
      this.resetBasicData();
      this.resetAddressForm();
    }
  }

  getVehicle(index: number) {
    console.log(this.registerForm.getRawValue());
    const board: string = this.registerForm
      .get(`vehicles`)
      ?.get(`${index}`)
      ?.get('board')?.value;

    this.resetVehicleForm(index);

    if (board != null) {
      if (board.length === 7) {
        this.registerService
          .getVehicle(board)
          .subscribe((res) => this.fillVehicleForm(res, index));
      }
    }
  }

  fillAddressForm(data: AddressAPI) {
    this.registerForm.patchValue({
      address: {
        cep: data.cep.toLowerCase(),
        street: data.street.toLowerCase(),
        district: data.neighborhood.toLowerCase(),
        city: data.city.toLowerCase(),
        state: data.state.toUpperCase(),
      },
    });
  }

  fillVehicleForm(data: VehicleAPI, index: number) {
    const vehicle = this.registerForm.get(`vehicles`)?.get(`${index}`);
    return vehicle?.patchValue({
      brand: data.Marca,
      model: data.Modelo,
      year: data.AnoModelo.slice(5),
      color: data.cor,
    });
  }

  fillCNPJ(data: CnpjAPI) {
    this.registerForm.patchValue({
      name: data.nome_fantasia,
      phone: this.phoneValidation(data.ddd_telefone_1),
      email: data.email,
      address: {
        cep: data.cep,
        addressNumber: data.numero,
        complement: data.complemento?.replace(';', ' '),
      },
    });
  }

  phoneValidation(phone: string) {
    if (phone.length == 11 || phone.length == 10) return phone;
    return null;
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

  resetVehicleForm(index: number) {
    const vehicle = this.registerForm.get(`vehicles`)?.get(`${index}`);
    return vehicle?.patchValue({
      brand: '',
      model: '',
      year: '',
      color: '',
    });
  }

  resetBasicData() {
    this.registerForm.patchValue({
      registerNumber: '',
      name: '',
      email: '',
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
