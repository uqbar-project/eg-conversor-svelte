
# Conversor en Svelte

[![Build](https://github.com/uqbar-project/eg-conversor-svelte/actions/workflows/build.yml/badge.svg)](https://github.com/uqbar-project/eg-conversor-svelte/actions/workflows/build.yml) [![codecov](https://codecov.io/gh/uqbar-project/eg-conversor-svelte/graph/badge.svg?token=daKfbHaKfG)](https://codecov.io/gh/uqbar-project/eg-conversor-svelte)

Este proyecto representa el clásico ejemplo del conversor de millas a kilómetros, generado con [`sv`](https://github.com/sveltejs/cli), con las siguientes configuraciones:

- Typescript
- ESlint + prettier + vitest
- agregamos plugins de testing library para tests de front
- y manejamos las dependencias con yarn (es mucho más rápido que usar npm)

## Implementación

- El input millas se define como number para evitar valores alfabéticos incorrectos
- También tiene un **binding** contra el estado (la runa `$.state`), llamado _miles_
- Como los kilómetros se definen en función de las millas, utilizamos la runa `$derived`. Esto automáticamente recalcula el valor cuando cambiamos las millas
- De yapa, utilizamos una función que muestra los kilómetros en formato coma decimal
- Como solo tenemos una página, ubicamos dentro de la carpeta `src/routes` el archivo `+page.svelte` que la define como página principal de nuestra SPA (single page application)

Lo bueno es que Svelte necesita de esos pocos conceptos dentro de nuestra página:

```sv
<script lang="ts">
	import { convertMilesToKms } from '$lib'

  const formattedNumber = (value: number) => value.toLocaleString('es');

	let miles = $state(0)
	let kilometers = $derived(formattedNumber(convertMilesToKms(miles)))
  ...
</script>

<div class="form">
  ...
  <div class="row">
    <input type='number' data-testid='millas' bind:value={miles} />
  </div>
  <div class="row">
    <span data-testid="kilometers">{kilometers}</span>
```

### Botón reset

Para resetear el valor de las millas contamos con un botón al que le asociamos una función que cambia el estado de millas:

```sv
<script lang="ts">
  ...
  const reset = () => { miles = 0 }
</script>

<button class="button secondary" data-testid="reset" onclick={reset}>Resetear</button>
```

## Tests

La propiedad `data-testid` nos sirve para encontrar fácilmente los elementos del DOM y probar

- que inicialmente el valor del input millas es 0
- que podemos convertir exitosamente de millas a kilómetros (y también verificamos que la conversión se haga respetando el locale castellano con la coma decimal)
- y por último probamos el botón de Reset

El lector puede ver los tests y su configuración con Testing Library.
