import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss'],
})
export class CadastroFormComponent {
  registerForm: FormGroup;
  disabled: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      type: ['cliente', [Validators.required]],
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
      number: [null],
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
    setTimeout(() => {
      console.log(this.registerForm.getRawValue());
    });
  }

  onCancel() {
    console.log(this.registerForm.getRawValue());
  }
}
