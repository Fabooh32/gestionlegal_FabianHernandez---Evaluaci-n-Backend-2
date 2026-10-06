# Pagina Juridica

# Verificacion inicial
Version de paquetes
node --version
npm --version

# Instalacion NODE
winget install OpenJS.NodeJS.LTS
--reiniciar para aplicar correctamente--

# Instalacion PNPM
npm.cmd install -g pnpm

# Descargar React+Vite
pnpm.cmd create vite@latest pagina-juridica -- --template react
framawork: REACT
variant: JS + REACT COMPILER
es/ox: OX
pnpm: NO

# Cambiar ruta
cd .\pagina-juridica\
pnpm.cmd dev
--muestra URL--

# Ruta LOCAL (CMD)
cd: (RUTA\CARPETA\PROYECTO)
pnpm dev
--muestra URL--

# Sanitizar entorno de instalacion(En caso de errores)
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm store prune
pnpm install
pnpm dev
