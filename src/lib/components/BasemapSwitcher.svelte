<script lang="ts">
  import type { BasemapType } from "$lib/types";

  let { styleKey = $bindable<BasemapType>("gsi_standard") } = $props();

  function changeStyle(styleName: BasemapType) {
    styleKey = styleName;
  }
</script>

<div class="basemap-switcher">
  <label>
    <input
      type="radio"
      name="basemap"
      value="gsi_standard"
      checked={styleKey === "gsi_standard"}
      onchange={() => changeStyle("gsi_standard")}
    />
    地理院タイル（標準）
  </label>

  <label>
    <input
      type="radio"
      name="basemap"
      value="gsi_pale"
      checked={styleKey === "gsi_pale"}
      onchange={() => changeStyle("gsi_pale")}
    />
    地理院タイル（淡色）
  </label>

  <label>
    <input
      type="radio"
      name="basemap"
      value="osm"
      checked={styleKey === "osm"}
      onchange={() => changeStyle("osm")}
    />
    OpenStreetMap
  </label>
</div>

<style>
  .basemap-switcher {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  label {
    display: block;
    margin-bottom: 8px;
    cursor: pointer;
  }

  label:last-child {
    margin-bottom: 0;
  }

  input[type="radio"] {
    margin-right: 6px;
    cursor: pointer;
  }
</style>
