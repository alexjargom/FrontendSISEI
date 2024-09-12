import { ActividadPlanModel } from 'src/app/core/models/plan-anual.model';
import { env } from './.env';

export const environment = {
  production: false,
  version: env.npm_package_version + '-dev',
  serverUrl: 'https://localhost:8080',
  apiUrl: '/api/v1'
};

export const routes = {
  cargo: '/cargo',
  comite: '/comite',
  dependencia: '/dependencia',
  dependenciaMin: '/dependencia_min',
  login : '/login',
  profile: '/user/profile',
  usuario: '/usuario',
  formato: '/formato',
  recomendacion: '/recomendacion',
  documentacion : '/documentacion',
  queja: '/queja',
  sesion: '/sesion',
  plan:'/plan',
  actividadPlan:'/actividad',
  verificarActividad:'/verificar_actividad',
  difusion:'/difusion',
  evidencia:'/evidencia',
  Notification:'/notificacion',
  user:'/user',
  conformacion: '/conformacion',
  buzon:'/buzon',
  reporte: '/reporte'
};
