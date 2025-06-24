import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/shared/spinner.service';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { Especialista } from '../../models/especialista';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
formLogin: FormGroup;
mostrarSidebar = false;
usuariosFicticios = {
  administradores: [
    { email: 'robertoadmin@yopmail.com', password: '123456', nombre: "Roberto", apellido: "Admin", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//99090909_juan%20admin.jpg" }
  ],
  especialistas: [
    { email: 'mariapsicologa@yopmail.com', password: '123456', nombre: "Maria", apellido: "Psicologa", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//mariapsico.jpg"},
    { email: 'gregoryhouse@yopmail.com', password: '123456', nombre: "Gregory", apellido: "House", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//house.jpg"}
    
  ],
  pacientes: [
    { email: 'pedropaciente@yopmail.com', password: '123456', nombre: "Pedro", apellido: "Paciente", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//11223344_pedro.jpg" },
    { email: 'tylerdurden@yopmail.com', password: '123456', nombre: "Tyler", apellido: "Durden", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//22022052_tyler.jpg" },
    { email: 'bobross@yopmail.com', password: '123456', nombre: "Bob", apellido: "Ross", imagen: "https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/imagenes//43333999_bobross.jpg" }
  ]
};


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
      try {
        this.spinner.show();
        const { email, password } = this.formLogin.value;
        let data = await this.auth.login(email, password);
        this.spinner.hide();
        if (data.user?.user_metadata['displayName'] == TipoUsuario.Especialista)
        {
          let especialista: Especialista | undefined = await this.auth.obtenerEspecialista(data.user.email);
          if (especialista === undefined)
            throw new Error(`El especialista ${email} no se encontró en la base de datos. `);

          if (especialista.aprobado == false)
            this.toast.danger("Un administrador debe aprobar el usuario especialista antes de que pueda ser utilizado.");
          else 
            this.loginExitoso(data.user?.user_metadata)
        }
        else 
            this.loginExitoso(data.user?.user_metadata)
          
      }
      catch(err: any) {
          this.toast.danger(`Error al iniciar sesion: ${err.message}`);
      }
      finally{
        this.spinner.hide();
      }
    } else {
      this.formLogin.markAllAsTouched();
    }
  } 
  loginExitoso(data: any) {
    this.toast.success("Login exitoso!")
    this.auth.guardarUsuarioLogueado(data);
    this.router.navigate(['/home']);
  }
}
