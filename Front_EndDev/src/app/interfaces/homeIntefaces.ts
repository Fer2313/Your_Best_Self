export interface Training {
    id_entrenamiento: number;
    id_usuario: number;
    nombre_entrenamiento: string;
    dificultad: number;
    descripcion: string;
    fecha: string;
    imagen: string;
    descanso_entre_series: number;
    descanso_entre_ejercicio:number;
    ejercicios_relacionados: Ejercicio[] | null;
  }
 
 export interface Ejercicio {
    Id_ejercicios: number;
    nombre_ejercicios: string;
    descripcion: string;
    video: string;
    imagen: string;
    categoria: string;
    dificultad: string;
    series: number | null;
    repeticiones: number | null;
    tiempo: number;
    lado: string | null;
  }
  