import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CreateUsers from "./pages/CreateUsers";
import Empresa from "./pages/Empresa";
import Login from "./pages/Login";
import ListUsers from "./pages/ListUsers";
import UpdateUsers from "./pages/UpdateUsers";
import RestorePass from "./pages/RestorePass";
import CreateAutos from "./pages/CreateAutos";
import CreatePiezas from "./pages/CreatePiezas";
import PiezasPage from "./pages/PiezasPage";
import AutosPage from "./pages/AutosPage";
import EstadoAutos from "./pages/EstadoAutos";
import SignUpClient from "./pages/SignUpClient";
import SignInClient from "./pages/SignInClient";
import EncuestaPage from "./pages/EncuestaPage";
import Clientes from "./pages/Clientes";
import Empleados from "./pages/Empleados";
import UpdateTypes from "./pages/UpdateTypes";
import Maquinaria from "./pages/Maquinaria";
import CreateReportes from "./pages/CreateReportes";
import Proveedores from "./pages/Proveedores";
import Historial from "./pages/Historial";
import Vender from "./pages/Vender";
import Tickets from "./pages/ListTickets";
import Archive from "./pages/Archive";

export const Routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Inicio",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/crearUsuarios",
    name: "Crear",
    component: CreateUsers,
    permission: "superAdmin",
  },
  {
    path: "/listarUsuarios",
    name: "Listar",
    component: ListUsers,
    permission: "superAdmin",
  },
  {
    path: "/actualizarUsuarios",
    name: "Actualizar",
    component: UpdateUsers,
    permission: "superAdmin",
  },
  {
    path: "/empresa",
    name: "Empresa",
    component: Empresa,
    permission: "superAdmin",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/seccionPiezas",
    name: "Piezas",
    component: PiezasPage,
  },
  {
    path: "/restablecerContra",
    name: "Restablecer",
    component: RestorePass,
  },
  {
    path: "/agregarPiezas",
    name: "CrearP",
    component: CreatePiezas,
  },
  {
    path: "/seccionAutos",
    name: "Autos",
    component: AutosPage,
  },
  {
    path: "/estadoAutos",
    name: "Estado",
    component: EstadoAutos,
  },
  {
    path: "/agregarAutos",
    name: "Agregar Autos",
    component: CreateAutos,
  },
  {
    path: "/RegistroClientes",
    name: "Registro CLientes",
    component: SignUpClient,
  },
  {
    path: "/InicioSesionClientes",
    name: "Inicio Sesion CLientes",
    component: SignInClient,
  },
  {
    path: "/EncuestaPage",
    name: "Encuestas",
    component: EncuestaPage,
    permission: "superAdmin",
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clientes,
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    component: Proveedores,
  },
  {
    path: "/empleados",
    name: "Empleados",
    component: Empleados,
    permission: "superAdmin",
  },
  {
    path: "/actualizarTipos",
    name: "ActualizarT",
    component: UpdateTypes,
  },
  {
    path: "/maquinaria",
    name: "Maquinaria",
    component: Maquinaria,
  },
  {
    path: "/historial",
    name: "Historial",
    component: Historial,
  },
  {
    path: "/vender",
    name: "Vender",
    component: Vender,
  },
  {
    path: "/crearreportes",
    name: "Reportes",
    component: CreateReportes,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
    permission: "superAdmin",
  },
  {
    path: "/archive",
    name: "historial de datos",
    component: Archive,
  },
];

export const dashboardRoutes = [
  {
    pathName: "/",
    name: "Inicio",
    icon: "fas fa-tachometer-alt",
  },
  {
    pathName: "/listarUsuarios",
    name: "Usuarios",
    icon: "fas fa-users",
    permission: "superAdmin",
  },
  {
    pathName: "/seccionAutos",
    name: "Autos",
    icon: "fas fa-car",
  },
  {
    pathName: "/seccionPiezas",
    name: "Piezas",
    icon: "fas fa-puzzle-piece",
  },
  {
    pathName: "/actualizarTipos",
    name: "Tipos",
    icon: "fas fa-wrench",
  },
  {
    pathName: "/clientes",
    name: "Clientes",
    icon: "fas fa-user-tie",
    component: Clientes,
  },
  {
    pathName: "/proveedores",
    name: "Proveedores",
    icon: "fas fa-address-card",
    component: Proveedores,
  },
  {
    pathName: "/empleados",
    name: "Empleados",
    icon: "fas fa-people-carry",
    permission: "superAdmin",
    component: Clientes,
  },
  {
    pathName: "/restablecerContra",
    name: "Modificar contraseña",
    icon: "fas fa-edit",
    permission: "superAdmin",
  },
  {
    pathName: "/maquinaria",
    name: "Maquinaria",
    icon: "fas fa-cogs",
  },
  {
    pathName: "/vender",
    name: "Vender automovil",
    icon: "fas fa-check-circle",
  },
  {
    pathName: "/tickets",
    name: "Tickets",
    icon: "fas fa-clipboard-list",
    permission: "superAdmin",
  },
  {
    pathName: "/encuestapage",
    name: "Gestionar encuestas",
    icon: "fas fa-chart-bar",
    permission: "superAdmin",
  },
  {
    pathName: "/archive",
    name: "Crear archivos",
    icon: "fas fa-file-alt",
    permission: "superAdmin",
  },
  {
    pathName: "/crearreportes",
    name: "Crear reporte",
    icon: "fas fa-question",
    permission: "none",
  },
];
