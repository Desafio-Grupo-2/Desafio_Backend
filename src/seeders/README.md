# 🌱 Seeders - Euskal Autobusak S.L.

Este directorio contiene los seeders para poblar la base de datos con datos creíbles de una empresa de autobuses del País Vasco.

## 🏢 Empresa Creada

**Euskal Autobusak S.L.**
- **CIF**: A12345678
- **Ubicación**: Vitoria-Gasteiz, Álava
- **Sector**: Transporte Escolar y Universitario
- **Especialización**: Rutas escolares y universitarias en el País Vasco

## 📊 Datos Generados

### 👥 Usuarios (5)
- **1 Jefe de flota** (administrador)
- **4 Conductores** (conductores)

### 🚌 Vehículos (6)
- **2 Autobuses de gasolina** (Mercedes Sprinter, Iveco Daily)
- **2 Autobuses híbridos** (Volvo B5LH, Mercedes Citaro Hybrid)
- **2 Autobuses eléctricos** (BYD K9, Irizar ie bus)

### 🛣️ Rutas (6)
- **2 Rutas escolares**: Vitoria-Gasteiz y San Sebastián
- **2 Rutas universitarias**: Intercampus UPV, Deusto, Mondragón
- **2 Rutas eléctricas**: Rutas cortas para vehículos eléctricos

### 🧾 Tickets (8)
- **4 Tickets de gasolina**: Para autobuses convencionales
- **3 Tickets híbridos**: Menor consumo de combustible
- **2 Tickets eléctricos**: Carga eléctrica

## 🚀 Cómo Ejecutar

### Ejecutar todos los seeders:
```bash
npm run seed
```

### Revertir todos los seeders:
```bash
npm run seed:rollback
```

### Ejecutar seeders individuales:
```bash
# Empresa
node src/seeders/01-empresa-seeder.js

# Usuarios
node src/seeders/02-usuarios-seeder.js

# Vehículos
node src/seeders/03-vehiculos-seeder.js

# Rutas
node src/seeders/04-rutas-seeder.js

# Tickets
node src/seeders/05-tickets-seeder.js
```

## 🔐 Credenciales de Acceso

### Jefe de Flota (Administrador)
- **Usuario**: `jefe.flota`
- **Contraseña**: `Admin123!`
- **Email**: `jefe.flota@euskalautobusak.com`

### Conductores
- **Usuario**: `conductor1` a `conductor5`
- **Contraseña**: `Conductor123!`
- **Emails**: `conductor1@euskalautobusak.com`, etc.

## 🗺️ Rutas Incluidas

### Rutas Escolares
1. **Vitoria Centro → Colegios**
   - Plaza Virgen Blanca → San Prudencio → San Viator → Mendizabala
   - **Distancia**: 12 km
   - **Tiempo**: 45 minutos

2. **San Sebastián Centro → Colegios**
   - Plaza Gipuzkoa → San Patricio → La Salle → Usandizaga
   - **Distancia**: 15 km
   - **Tiempo**: 45 minutos

### Rutas Universitarias
1. **Intercampus UPV**
   - Campus Álava → UPV Vitoria → Campus Leioa → Campus San Sebastián
   - **Distancia**: 28 km
   - **Tiempo**: 1h 15min

2. **Intercampus Bilbao**
   - Campus Leioa → Deusto → Mondragón → Campus San Sebastián
   - **Distancia**: 38 km
   - **Tiempo**: 1h 20min

### Rutas Eléctricas
1. **Vitoria Centro → Universidad**
   - Plaza Virgen Blanca → Campus Álava → UPV
   - **Distancia**: 8 km
   - **Tiempo**: 30 minutos

2. **San Sebastián Centro → Universidad**
   - Plaza Gipuzkoa → Campus San Sebastián → Deusto
   - **Distancia**: 10 km
   - **Tiempo**: 30 minutos

## 💰 Gastos de Combustible

- **Gasolina/Híbrido**: ~€248.00
- **Electricidad**: ~€43.00
- **Total**: ~€291.00

## 🏷️ Etiquetas Ambientales

- **ECO**: Autobuses de gasolina y híbridos
- **CERO**: Autobuses eléctricos

## 📍 Ubicaciones del País Vasco

- **Vitoria-Gasteiz**: Capital de Álava
- **San Sebastián**: Capital de Gipuzkoa
- **Bilbao**: Capital de Vizcaya
- **Leioa**: Campus universitario
- **Mondragón**: Universidad cooperativa

## 🔄 Orden de Ejecución

Los seeders deben ejecutarse en este orden debido a las dependencias:

1. **Empresa** → Crea la empresa base
2. **Usuarios** → Crea empleados (depende de empresa)
3. **Vehículos** → Crea autobuses (depende de empresa y usuarios)
4. **Rutas** → Crea rutas (depende de empresa y vehículos)
5. **Tickets** → Crea gastos (depende de empresa y rutas)

## ⚠️ Notas Importantes

- Los seeders incluyen datos realistas del País Vasco
- Las rutas están basadas en ubicaciones reales
- Los precios de combustible son actuales (2024)
- Las matrículas siguen el formato español
- Los nombres son típicos del País Vasco
