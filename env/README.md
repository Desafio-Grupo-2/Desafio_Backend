# Variables de Entorno

Esta carpeta contiene archivos de configuración de variables de entorno.

## Archivos

- `config.env` - Archivo de ejemplo con todas las variables de entorno necesarias
- `env.template` - Template usado por el script `setup:env` para generar el archivo `.env`

## Uso

### Opción 1: Script Automático (Recomendado)
```bash
npm run setup:env
```
Este comando:
- Lee el archivo `env.template`
- Genera un JWT_SECRET aleatorio
- Crea el archivo `.env` en la raíz del proyecto

### Opción 2: Copia Manual
1. Copiar `config.env` a la raíz del proyecto como `.env`
2. Modificar los valores según tu configuración local

## Variables Importantes

- `DB_*` - Configuración de base de datos
- `JWT_*` - Configuración de JWT (se genera automáticamente)
- `PORT` - Puerto del servidor
- `CORS_ORIGIN` - Origen permitido para CORS

## ⚠️ Importante

- **NUNCA** commitear el archivo `.env` al repositorio
- El archivo `env.template` es la fuente de verdad para la estructura
- El script `setup:env` genera automáticamente un JWT_SECRET seguro
