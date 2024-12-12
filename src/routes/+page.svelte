<script lang="ts">
  import './styles.css'
  import { convertMilesToKms } from '$lib'

  const formattedNumber = (value: number) => value.toLocaleString('es')

  let miles = $state(0)
  let kilometers = $derived(formattedNumber(convertMilesToKms(miles)))

  const reset = () => {
    miles = 0
  }
</script>

<div class="form">
  <h1>Conversor millas a kms</h1>
  <div class="row">
    <label for="millas" class="label">Millas</label>
    <input type="number" data-testid="millas" bind:value={miles} />
  </div>
  <div class="row">
    <label for="kilometros" class="label">Kilómetros</label>
    <span data-testid="kilometers">{kilometers}</span>
  </div>
  <div class="row">
    <button class="button secondary" data-testid="reset" onclick={reset}>Resetear</button>
  </div>
</div>
