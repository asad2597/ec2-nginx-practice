import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] // updated to scss for better styling
})
export class App{
  items: any[] = [];

  newName = '';
  newDescription = '';

  constructor(private service: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.service.getItems().subscribe((data) => (this.items = data));
  }

  addItem() {
    if (!this.newName.trim() || !this.newDescription.trim()) return;

    const newItem = {
      name: this.newName,
      description: this.newDescription
    };

    this.service.addItem(newItem).subscribe(() => {
      this.loadItems();
      this.newName = '';
      this.newDescription = '';
    });
  }
}
