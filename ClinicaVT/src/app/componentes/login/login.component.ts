import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
formLogin: FormGroup;
mostrarSidebar = false;
usuariosFicticios = [
  {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456',
    imagen: 'assets/usuarios/juan.png'
  },
  {
    nombre: 'María López',
    email: 'maria@example.com',
    password: 'abcdef',
    imagen: 'assets/usuarios/maria.png'
  }
];

constructor(private fb: FormBuilder, private auth: AuthService, private toast: NgToastService, private router: Router) {
  this.formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}



autocompletarUsuario(usuario: any) {
  this.formLogin.patchValue({
    email: usuario.email,
    password: usuario.password
  });
  this.mostrarSidebar = false;
}
async onLogin() {
  if (this.formLogin.valid) {
    const { email, password } = this.formLogin.value;
    let { data, error } = await this.auth.login(email, password);

    if (error) {
      this.toast.danger(`Error al iniciar sesion: ${error.message}`);
    }
    else {
      this.toast.success("Login exitoso!")
      this.router.navigate(['/home']);
    }
  } else {
    this.formLogin.markAllAsTouched();
  }
}
}
