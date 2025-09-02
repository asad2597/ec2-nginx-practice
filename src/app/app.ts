import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  items: any[] = [];
  newItem = '';

  constructor(private service: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.service.getItems().subscribe((data) => (this.items = data));
  }

  addItem() {
    if (!this.newItem) return;
    this.service.addItem({ name: this.newItem }).subscribe(() => {
      this.loadItems();
      this.newItem = '';
    });
  }
}
