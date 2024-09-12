export interface MenuModel {
  level: number;
  title: string;
  icon: string;
  childrenTitle: string;
  children: MenuModel[] | null;
  RouterLink: string[] | null;
  style: string;
}

export const MenuRoot: MenuModel[] = [
  {level: 1, title: 'Inicio', icon: 'home', childrenTitle: '', style: '', RouterLink: ['/'], children: null},

  {
    level: 1, title: 'Usuarios', icon: 'setting', childrenTitle: 'Usuarios', style: '', RouterLink: null,
    children: [
      {level: 2, title: 'Usuarios', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['usuarios']},
      {level: 2, title: 'Registrar', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['usuarios/crear']},
    ]
  },


  {
    level: 1, title: 'Dependencia', icon: 'bank', childrenTitle: 'Comite', style: '', RouterLink: null,
    children: [
      {level: 2, title: 'Dependencias', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['dependencia']},
      {level: 2, title: 'Registrar', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['dependencia/crear']},
    ]
  },


  {level: 1, title: 'Respaldos', icon: 'setting', childrenTitle: '', style: '', RouterLink: null, children: null},


  {
    level: 1, title: 'Cerrar sesión', icon: 'logout', childrenTitle: '', RouterLink: ['logout'],
    style: 'float: right;', children: null
  }
];


export const MenuAdmin: MenuModel[] = [

  {level: 1, title: 'Inicio', icon: 'home', childrenTitle: '', style: '', RouterLink: ['/'], children: null},


  {
    level: 1, title: 'Dependencia', icon: 'bank', childrenTitle: 'Dependencia', style: '', RouterLink: null, 
    children:[
      {level: 2, title: 'Dependencias', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['dependencia']},
      {level: 2, title: 'Mis Sesiones', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['sesion']},
    ]
  },

  {
    level: 1, title: 'Alta', icon: 'save', childrenTitle: 'Alta', style: '', RouterLink: null,
    children: [
      {level: 2, title: 'Integrantes comités', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['comite']},
      {level: 2, title: 'Habilitados', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['comite/cargo']},
      {level: 2, title: 'Usuarios', icon: '', childrenTitle: 'Usuario', style: '', RouterLink: ['usuarios'],children: null}
    ]
  },
  {level: 1, title: 'Plan Anual', icon: 'file-word', childrenTitle: '', style: '', RouterLink:['plan'],
   children:null
  },
  {
    level: 1, title: 'Archivo', icon: 'file', childrenTitle: 'Archivo', style: '', RouterLink: null,
    children: [
      {level: 2, title: 'Ver formatos', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['formato']},
      {level: 2, title: 'Ver Documentación', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['documentacion']},
      {level: 2, title: 'Ver Difusión', icon:'', childrenTitle:'', children:null, style:'', RouterLink:['difusion']},
      {level: 2, title: 'Material de Apoyo', icon:'', childrenTitle:'', children:null, style:'', RouterLink:['material']},
    ]
  },
  {
    level: 1, title: 'Quejas y Recomendaciones', icon: 'book', childrenTitle: 'Quejas y Recomendaciones', style: '', RouterLink: null,
    children: [
      {level: 2, title: 'Mis quejas', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['queja']},
      {level: 2, title: 'Grafica quejas', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['queja/chart']},
      {level: 2, title: 'Buzones', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['buzon']},
      {level: 2, title: 'Recomendación', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['recomendacion']},
    ]
  },
  {
    level: 1, title: 'reportes', icon: 'snippets', childrenTitle:'Reportes', style:'', RouterLink: null,
    children:[
      {level: 2, title: 'Reportes', icon: 'snippets', childrenTitle: '', children: null, style: '', RouterLink: ['reportes']},
    ]
  },
  {
    level: 1, title: 'Cerrar sesión', icon: 'logout', childrenTitle: '', RouterLink: ['logout'],
    style: 'float: right;', children: null
  }

];


export function MenuDependencia(depId: string, comId: string): MenuModel[] {
  return [
    {level: 1, title: 'Inicio', icon: 'home', childrenTitle: '', style: '', RouterLink: ['/'], children: null},
    {level: 1,title: 'Dependencia',icon: 'bank',childrenTitle: 'Dependencia',style: '',RouterLink: null,
    children:[
      {level: 2, title: 'Mi Dependencia', icon: '', childrenTitle: '', children: null, style: '', RouterLink: [`dependencia/editar/${depId}`]},
      {level: 2, title: 'Mis Sesiones', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['sesion']},
    ]
    },

    {
      level: 1, title: 'Alta', icon: 'save', childrenTitle: 'Alta', style: '', RouterLink: null,
      children: [
        {level: 2, title: 'Integrantes Comité', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['comite']},
      ]
    },

    {
      level: 1, title: 'Plan anual', icon: 'file-word', childrenTitle: 'Plan anual', style: '', RouterLink: null,
      children: [
        {level: 2, title: 'Mis planes', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['plan']},
      ]
    },

    {
      level: 1, title: 'Archivo y difusión', icon: 'file', childrenTitle: 'Archivo', style: '', RouterLink: null,
      children: [
        {level: 2, title: 'Ver formatos', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['formato']},
        {level: 2, title: 'Ver Documentación', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['documentacion']},
        {level: 2, title: 'Ver Difusion', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['difusion']},
        {level: 2, title: 'Material de Apoyo', icon:'', childrenTitle:'', children:null, style:'', RouterLink:['material']},
      ]
    },
    {
      level: 1, title: 'Quejas', icon: 'book', childrenTitle: 'Quejas', style: '', RouterLink: null,
      children: [
        {level: 2, title: 'Mis quejas', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['queja']},
        {level: 2, title: 'Grafica', icon: '', childrenTitle: '', children: null, style: '', RouterLink: ['queja/chart']},
        {level: 2, title: 'Buzón', icon: '', childrenTitle: '', children: null, style: '', RouterLink: [`buzon/editar/${depId}`]},
      ]
    },
    {
      level: 1, title: 'Contacto', icon: 'user', childrenTitle: 'Contacto', style: '', RouterLink: ['contacto'],
      children: null
    },


    {
      level: 1, title: 'Cerrar sesión', icon: 'logout', childrenTitle: '', RouterLink: ['logout'],
      style: 'float: right;', children: null
    }

  ];
}
