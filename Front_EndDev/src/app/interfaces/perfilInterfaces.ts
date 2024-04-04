export interface Usuario {
    id_usuario: number;
    nombre: string;
    edad: number;
    peso: number;
    altura: number;
    sexo: 'masculino' | 'femenino' | 'none';
    email: string;
    contraseña: string | null;
    rol: 'admin' | 'user' | 'none';
    verify: "true" | "false"; 
    pesoIdeal: number;
    imagen_perfil: string | null;
  }
  
  export interface user {
    idUsuario: number;
    imagen: string;
    nombreUsuario: string;
    rol: string;
  }

export interface routesNav {
  profile: boolean;
  security: boolean;
  dashboard: boolean;
  progress: boolean;
}



