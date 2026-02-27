import {  ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ClientsService } from "../../services/clients.service";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "../../models/client.model";
import { combineLatest, map, startWith, debounceTime } from 'rxjs';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";


@Component({
  standalone: true,
  selector: 'app-clients-list-page',
  imports: [CommonModule, MatListModule, MatDividerModule, MatIconModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsListPage implements OnInit {
  private clientsService = inject(ClientsService);
  private router = inject(Router);

  searchControl = new FormControl('');

  clients$ = this.clientsService.clients$;

  filteredClients$ = combineLatest([
    this.clients$,
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    )
  ]).pipe(
    map(([clients, search]) => {
      if (!search) return clients;
      const term = search.toLowerCase();
      return clients.filter(client =>
        client.name?.toLowerCase().includes(term) ||
        client.email?.toLowerCase().includes(term) ||
        client.phone?.toLowerCase().includes(term)
      );
    })
  );


  ngOnInit() {
    this.clientsService.loadClients();
  }

  deleteClient(id: string) {
    this.clientsService.delete(id).subscribe(() => {
      this.clientsService.loadClients();
    })
  }

  createClient() {
    this.router.navigate(['/clients/new']);
  }

  editClient(id: string) {
    this.router.navigate(['/clients', id]);
  }

  trackById(index: number, client: Client) {
    return client.id;
  }
}