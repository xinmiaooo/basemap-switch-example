<script lang="ts">
  import { MapLibre } from "svelte-maplibre-gl";
  import { styles } from "$lib/types";
  import type { BasemapType } from "$lib/types";
  import BasemapSwitcher from "$lib/components/BasemapSwitcher.svelte";
  import BasemapPreview from "$lib/components/BasemapPreview.svelte";

  let mapstyleKey = $state<BasemapType>("gsi_standard");
  let currentStyle = $derived(styles[mapstyleKey]);

  let mainMap: maplibregl.Map | undefined = $state();
</script>

<div class="relative">
  <MapLibre
    class="h-dvh"
    style={currentStyle}
    center={[140, 38.661]}
    zoom={4.5}
    bind:map={mainMap}
  />
  <div class="absolute bottom-12 right-4 z-10">
    <BasemapPreview bind:mainMap bind:mapstyleKey />
  </div>
</div>
