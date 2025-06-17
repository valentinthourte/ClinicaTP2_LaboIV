import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/shared/spinner.service';

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
    nombre: 'Prueba 1',
    email: 'xexesaj143@finfave.com',
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

constructor(private fb: FormBuilder, private auth: AuthService, private toast: NgToastService, private router: Router, private spinner: SpinnerService) {
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
      this.spinner.show();
      const { email, password } = this.formLogin.value;
      let { data, error } = await this.auth.login(email, password);
      this.spinner.hide();
      if (error) {
        this.toast.danger(`Error al iniciar sesion: ${error.message}`);
      }
      else {
        this.toast.success("Login exitoso!")
        this.auth.guardarUsuarioLogueado(data);
        this.router.navigate(['/home']);
      }
    } else {
      this.formLogin.markAllAsTouched();
    }
  } 
}
