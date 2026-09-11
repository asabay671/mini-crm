import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Client, CreateClientDto, UpdateClientDto } from "../models/client.model";

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$ = this.clientsSubject.asObservable();

  private api = `${environment.apiUrl}/clients`;

  loadClients() {
    this.http
      .get<Client[]>(`${environment.apiUrl}/clients`)
      .subscribe(clients => this.clientsSubject.next(clients));
  }

  create(dto: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(`${environment.apiUrl}/clients`, dto).pipe(
      tap((client) => {
        const current = this.clientsSubject.getValue();
        this.clientsSubject.next([...current, client]);
      }),
    );
  }

  update(id: string | number, dto: UpdateClientDto): Observable<Client> {
    return this.http.patch<Client>(`${environment.apiUrl}/clients/${id}`, dto).pipe(
      tap(updated => {
        const current = this.clientsSubject.getValue();
        const updatedList = current.map(current => current.id === updated.id ? updated : current);
        this.clientsSubject.next(updatedList);
      }),
    );
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/clients/${id}`).pipe(
      tap(() => {
        const current = this.clientsSubject.getValue();
        const filtered = current.filter(current => current.id !== id);
        this.clientsSubject.next(filtered);
      })
    );
  }

  getById(id: string | number): Observable<Client> {
    return this.http.get<Client>(`${environment.apiUrl}/clients/${id}`);
  }
  
  removeClientFromList(id: string) {
    const current = this.clientsSubject.getValue();
    this.clientsSubject.next(current.filter((current) => current.id !== id));
  }

  updateClientInList(updateClient: Client) {
    const current = this.clientsSubject.getValue();
    const updatedList = current.map((current) =>
      current.id === updateClient.id ? updateClient : current,
    );
    this.clientsSubject.next(updatedList);
  }


  addClientToList(client: Client) {
    const current = this.clientsSubject.getValue();
    this.clientsSubject.next([...current, client]);
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api);
  }
}









