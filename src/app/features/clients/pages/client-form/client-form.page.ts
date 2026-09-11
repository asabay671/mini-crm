import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { CreateClientDto, UpdateClientDto } from '../../models/client.model';
import { phoneValidator } from '../validators/phone.validator';

@Component({
  standalone: true,
  selector: 'app-client-form-page',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-form.page.html',
  styleUrls: ['./client-form.page.scss'],
})
export class ClientFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  id: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    phone: ['', [Validators.required, phoneValidator]],
  });

  get name() {
    return this.form.controls.name;
  }
  get email() {
    return this.form.controls.email;
  }
  get phone() {
    return this.form.controls.phone;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.clientsService.getById(this.id).subscribe((client) => {
        this.form.patchValue(client);
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.id) {
      const dto: UpdateClientDto = this.form.value as UpdateClientDto;

      this.clientsService.update(this.id, dto).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      const dto: CreateClientDto = this.form.value as CreateClientDto;

      this.clientsService.create(dto).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
