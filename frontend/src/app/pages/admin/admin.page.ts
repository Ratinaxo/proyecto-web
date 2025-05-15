import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {
  addBookForm!: FormGroup;
  delBookForm!: FormGroup;

  constructor(private toastController: ToastController,private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }
  
  ngOnInit() {
    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', Validators.required],
    })
    this.delBookForm = this.formBuilder.group({
      id : ['', Validators.required],
    })
  }
  
  onSubmitAdd() {
    if (this.addBookForm.invalid) { return; }
    const newBook = this.addBookForm.value;

    this.apiService.addBook(newBook).subscribe({
      next: () => {
        this.toastController.create({
            message: `Libro creado correctamente`,
            duration: 4000,
          }).then(toast => toast.present());
          this.addBookForm.reset();
        },
      error: err => {
        console.error('Error creando libro', err);
      }
    });
  }

  onSubmitDel() {
    if (this.delBookForm.invalid) { return; }
    const { id } = this.delBookForm.value;

    this.apiService.deleteBook(id).subscribe({
      next: () => {
      this.toastController.create({
        message: `Libro ${id} eliminado correctamente`,
        duration: 4000,
      }).then(toast => toast.present());

      this.delBookForm.get('id')!.reset();
    },
    error: err => {
      console.error('Error borrando libro', err);
      // puedes mostrar un toast de error aquí
      }
    });
  }
  onSubmitModify() {
    if (this.addBookForm.invalid) { return; }
    const newBook = this.addBookForm.value;

    this.apiService.modifyBook(newBook.id, newBook).subscribe({
      next: () => {
        this.toastController.create({
            message: `Libro modificado correctamente`,
            duration: 4000,
          }).then(toast => toast.present());
          this.addBookForm.reset();
        },
      error: err => {
        console.error('Error modificando libro', err);
      }
    });
  }
}
