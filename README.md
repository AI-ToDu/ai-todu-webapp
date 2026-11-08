# 🚀 AI-ToDu - Sistema Nervioso Logístico B2B

![Angular](https://img.shields.io/badge/Angular_22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

**AI-ToDu** es una plataforma SaaS B2B diseñada para conectar las ventas, los inventarios y los despachos logísticos de pequeños negocios. Este repositorio contiene el **Frontend**, desarrollado con Angular y Angular Material.

### 🌍 [Ver Demo en Vivo (GitHub Pages)](https://ai-todu.github.io/ai-todu-webapp/)

> **AV2 · Sprint 3:** la aplicación se conecta al [backend Java/Spring Boot](https://github.com/AI-ToDu/ai-todu-api) con PostgreSQL, JWT revocables, roles y aislamiento por empresa. El espacio nuevo inicia sin datos: crea una cuenta con información ficticia. Se conserva la Fake API de TB1 como modo opcional de demostración. No se realizan pagos reales ni se emiten documentos fiscales.

---

## 🏗️ Arquitectura del Proyecto

La aplicación organiza sus responsabilidades siguiendo principios de **Domain-Driven Design (DDD)**, con **Angular 22**, Standalone Components, Signals, HttpClient y rutas con carga por área. Los módulos agrupan capacidades de negocio; su grado de separación se documenta en el informe.

* 📦 **Inventory:** catálogo de SKUs, conservación del producto, entradas, salidas e historial de movimientos.
* 🚚 **Logistics:** manifiestos vinculados a ventas, conductor, vehículo, destino, estados y confirmación del receptor.
* 📥 **Procurement:** órdenes de compra y recepción física parcial.
* 🛒 **Sales:** POS, validación de stock, recibo histórico de demostración y devoluciones.
* 🔔 **Notifications:** bandeja de avisos operativos.
* 🔐 **IAM:** registro de empresa, sesión JWT, autorización y provisión de empleados con contraseña inicial.
* 📊 **Reporting:** indicadores derivados de operaciones registradas.
* ⚙️ **Shared:** modelos, adaptador HTTP, componentes comunes e internacionalización.

### Estructura de Directorios (DDD)

```text
src/app/
 ├── inventory/         # Inventario y movimientos
 ├── logistics/         # Despachos y entrega
 ├── procurement/       # Compras y recepción
 ├── sales/             # POS, recibos y devoluciones
 ├── notifications/     # Bandeja operativa
 ├── iam/               # Acceso y equipo
 ├── reporting/         # Resumen operativo
 └── shared/
     ├── application/   # Internacionalización
     ├── domain/        # Modelos compartidos
     ├── infrastructure/# Adaptador HTTP
     └── presentation/  # UI y páginas comunes

public/mock/            # Copia trazable del motor canónico
tools/                  # Servidor demo, sincronización y pruebas
database/               # Modelo relacional de referencia
```

Los módulos funcionales contienen sus vistas en `presentation/`. El motor de demostración y sus reglas se mantienen en el repositorio canónico de la Fake API; el árbol no implica que todos los módulos tengan cuatro capas ya implementadas.

---

## 🛠️ Tecnologías y Prácticas Implementadas

* **Framework:** Angular 22 con Standalone Components, Signals y HttpClient.
* **Interfaz:** Angular Material, diseño responsive, diálogos y controles etiquetados.
* **Internacionalización:** inglés predeterminado (`en_US`) y español latinoamericano (`es_419`).
* **Persistencia AV2:** PostgreSQL a través de la API remota. La demo opcional conserva JSON por HTTP local o IndexedDB.
* **Integración externa:** clima regional de Lima mediante el gateway Open-Meteo del backend; la operación continúa si el proveedor no responde.
* **Reglas operativas:** recepción parcial, rechazo de sobreventa, conservación de productos, anulación y devoluciones con validaciones.
* **Calidad:** pruebas de dominio, permisos/tenant, concurrencia HTTP, persistencia tras reinicio, migración de recibos y cobertura de traducciones.

---

## 🚀 Despliegue Local (Para Desarrolladores)

**Requisito:** Node.js 24 o posterior.

1. Clona la rama de revisión:

   ```sh
   git clone --branch main https://github.com/AI-ToDu/ai-todu-webapp.git
   cd ai-todu-webapp
   ```

2. Instala las dependencias desde el lockfile:

   ```sh
   npm ci
   ```

3. Para trabajar con el backend local, inicia ai-todu-api en el puerto 8080 y ejecuta `npm start`; abre http://localhost:4200. Para ejecutar la demostración HTTP opcional:

   ```sh
   npm run demo
   ```

4. Abre [http://127.0.0.1:8850/?api=http](http://127.0.0.1:8850/?api=http). El comando compila la interfaz y sirve el adaptador HTTP en el mismo puerto.

El estado se conserva en `.demo-data/state.json`, excluido de Git. La recarga y el reinicio del servidor demo conservan sus transacciones aceptadas. La selección HTTP persiste al navegar o recargar dentro de la pestaña.

En la publicación AV2, el transporte predeterminado es https://ai-todu-api-av2.onrender.com/api/v1/. No cambia silenciosamente a datos ficticios si la API falla. Usa `?api=demo` para la demo de navegador y `?api=server` para volver al servidor; las sesiones se almacenan por separado. El servicio gratuito puede necesitar aproximadamente un minuto para iniciar tras inactividad.

### Publicación estática

```sh
npm run build:pages
```

En HTTPS o localhost, un Service Worker intercepta las solicitudes del mismo origen a `/api/v1` y guarda el estado en IndexedDB. La información pertenece a ese navegador/origen, puede eliminarse y no se comparte entre dispositivos. La URL de Pages no es un backend remoto consultable con curl. La primera carga requiere inicializar los recursos y el worker; los fallos se muestran en la interfaz.

---

## 🔐 Cuentas de Demostración

| Rol | Correo | Acceso demo |
| --- | --- | --- |
| Administrador | admin@demo.ai-todu.test | Secciones de la demo e indicadores. |
| Almacén | warehouse@demo.ai-todu.test | Inventario, movimientos, compras y avisos. |
| Ventas | sales@demo.ai-todu.test | Inventario, ventas, devoluciones y avisos. |
| Logística | logistics@demo.ai-todu.test | Inventario, despachos y avisos. |

Las cuatro cuentas usan la contraseña de prueba intencionalmente pública **DemoOnly2026!**. Las identidades, hashes y sesiones son infraestructura de demostración, sin equivalencia con seguridad de producción.

## 🔄 Recorrido Integrado de Ejemplo

Con el estado inicial de demostración:

1. Crear una compra de cuatro unidades de arroz y recibir dos: el stock cambia de **8 a 10** y la orden queda parcialmente recibida.
2. Vender dos unidades: el stock cambia de **10 a 8** y el recibo histórico registra **PEN 290**.
3. Seleccionar la venta, conductor, vehículo y destino; iniciar ruta y confirmar receptor. El despacho no descuenta stock por segunda vez.
4. Consultar el resumen: ventas netas **PEN 290**, contribución bruta **PEN 70** y existencias al costo registrado **PEN 1,510**. La recarga conserva el resultado.
5. Comprobar rechazo de exceso de recepción, sobreventa, producto bloqueado, anulación repetida, recursos ocupados y consulta no autorizada de indicadores.

Son datos sintéticos de prueba, no resultados comerciales reales.

![Recorrido HTTP local con datos ficticios](docs/evidence/overview.jpg)

## ✅ Verificación y Alcance

```sh
npm test
npm run build
npm run build:pages
```

Las pruebas cubren reglas, aislamiento por empresa/rol, concurrencia HTTP real, persistencia, recibos, el diseño SQL de 35 tablas, traducciones e integridad de las fuentes copiadas. La compilación mantiene el presupuesto original del bundle. La investigación con usuarios y una auditoría completa de accesibilidad siguen pendientes.

El [DDL de 35 tablas](database/schema.sql), validado en SQLite, es un destino de migración relacional; la demo usa 35 colecciones JSON. El backend AV2 ejecuta 19 tablas de aplicación/infraestructura, además del historial Flyway, con modelos JPA separados del dominio. El OpenAPI del backend documenta 34 operaciones; public/mock/openapi.json corresponde únicamente a la demo. El modelo de 35 tablas sigue siendo una referencia de alcance futuro. Faltan flujos completos de lotes/ubicaciones/variantes, múltiples paradas e intentos, administración de clientes, recuperación de acceso, suscripciones e integraciones fiscales/de pago.

### Fuente Canónica de la Fake API

[ai-todu-fake-api](https://github.com/AI-ToDu/ai-todu-fake-api/tree/main) mantiene el motor, adaptador HTTP, OpenAPI y base relacional. [mock-provenance.json](mock-provenance.json) fija el commit y los hashes normalizados. Tras modificar y confirmar el motor allí, sincronizar desde este repositorio:

```sh
npm run mock:sync -- ../ai-todu-fake-api
```

Después ejecutar pruebas y compilación. Las copias del motor se actualizan mediante esa sincronización. El [OpenAPI incluido](public/mock/openapi.json) describe el contrato demo implementado.

### Ramas y Publicación

AV2 está integrado en `main` (v0.3.0). Las correcciones posteriores se revisan en ramas `fix/...`. El workflow verifica fix/PR y publica Pages desde `main` al integrar los cambios. GitHub Pages utiliza GitHub Actions desde el 7 de noviembre de 2026; la configuración anterior de `gh-pages` fue sustituida. Las notas de revisión y avances se mantienen fuera del repositorio.

---

## 🔗 Ecosistema del Proyecto

* **[Backend REST](https://github.com/AI-ToDu/ai-todu-api):** dominio Java, PostgreSQL, Transactional Outbox Pattern y contratos. [Swagger UI](https://ai-todu-api-av2.onrender.com/swagger-ui.html).

* **[Landing Page](https://github.com/AI-ToDu/ai-todu-platform/tree/develop):** presentación del producto y acceso a la demo.
* **[Frontend](https://github.com/AI-ToDu/ai-todu-webapp/tree/main):** espacio de trabajo Angular.
* **[Fake REST API](https://github.com/AI-ToDu/ai-todu-fake-api/tree/main):** motor canónico de demostración y contrato OpenAPI.
* **[Informe](https://github.com/AI-ToDu/ai-todu-report/tree/main):** requisitos, arquitectura, diseño de datos y evidencias.

---

## 👥 Equipo de Desarrollo

Proyecto desarrollado por **IA-INNOVATION**:

* **Kevin Junior Salazar Marquina:** arquitectura base, recursos compartidos y enrutamiento del frontend inicial.
* **Fernando André Condezo Pacheco:** módulo de inventario del frontend inicial.
* **Darikson Bill Salazar Quiche:** POS y dashboard del frontend inicial.
* **Luis Carlos Chui Kcomt:** módulo de logística del frontend inicial.
* **Carlos Alberto Bernal Torres:** IAM y documentación del frontend inicial.

Las contribuciones históricas y sus fuentes se registran en el informe. Las mejoras posteriores se acreditan con sus commits y revisiones correspondientes.

---
*Desarrollado por el equipo IA-INNOVATION · AI-ToDu · UPC · 2026.*
