import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
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
  addUserForm!: FormGroup;
  delUserForm!: FormGroup;
  modUserForm!: FormGroup;

  constructor(private toastController: ToastController,private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }
  
ngOnInit() {
  this.addBookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: ['', Validators.required],
  });
  this.delBookForm = this.formBuilder.group({
    id : ['', Validators.required],
  });

  this.addUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['user', Validators.required],  
  });

  this.delUserForm = this.formBuilder.group({
    id: ['', Validators.required],
  });

  this.modUserForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: [''],
    email: ['', [Validators.email]],
    role: ['']
  });
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
onSubmitAddUser() {
  if (this.addUserForm.invalid) return;
  const newUser = this.addUserForm.value;

  this.apiService.addUser(newUser).subscribe({
    next: () => {
      this.toastController.create({
        message: 'Usuario creado correctamente',
        duration: 3000,
      }).then(toast => toast.present());
      this.addUserForm.reset();
    },
    error: err => console.error('Error creando usuario', err)
  });
}

onSubmitDeleteUser() {
  if (this.delUserForm.invalid) return;
  const { id } = this.delUserForm.value;

  this.apiService.deleteUser(id).subscribe({
    next: () => {
      this.toastController.create({
        message: `Usuario ${id} eliminado`,
        duration: 3000,
      }).then(toast => toast.present());
      this.delUserForm.reset();
    },
    error: err => console.error('Error eliminando usuario', err)
  });
}

onSubmitModifyUser() {
  if (this.modUserForm.invalid) return;
  const { id, ...userData } = this.modUserForm.value;

  this.apiService.modifyUser(id, userData).subscribe({
    next: () => {
      this.toastController.create({
        message: 'Usuario modificado correctamente',
        duration: 3000,
      }).then(toast => toast.present());
      this.modUserForm.reset();
    },
    error: err => console.error('Error modificando usuario', err)
  });
}


}
