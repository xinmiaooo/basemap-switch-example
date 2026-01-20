<script lang="ts">
  import { MapLibre } from "svelte-maplibre-gl";
  import { styles } from "$lib/types";
  import type { BasemapType } from "$lib/types";

  let {
    mainMap = $bindable(),
    mapstyleKey: mapstyleKey = $bindable<BasemapType>(),
  }: {
    mainMap: maplibregl.Map | undefined;
    mapstyleKey: BasemapType | undefined;
  } = $props();

  let iconMap1: maplibregl.Map | undefined = $state(); // gsi_standard
  let iconMap2: maplibregl.Map | undefined = $state(); // gsi_pale
  let iconMap3: maplibregl.Map | undefined = $state(); // osm

  // 展開状態を管理
  let isExpanded = $state(false);

  // メインマップの表示範囲を同期
  let center = $state<[number, number]>([140, 38.661]);
  let zoom = $state(1);

  $effect(() => {
    if (!mainMap || (!iconMap1 && !iconMap2 && !iconMap3)) return;

    const syncView = () => {
      center = [mainMap.getCenter().lng, mainMap.getCenter().lat];
      zoom = mainMap.getZoom() - 3.5;
    };

    // 初期同期
    syncView();

    // メインマップの移動イベントをリッスン
    mainMap.on("move", syncView);
    mainMap.on("zoom", syncView);

    return () => {
      mainMap.off("move", syncView);
      mainMap.off("zoom", syncView);
    };
  });

  // プレビューをクリックしたときの処理
  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  // ベースマップを選択したときの処理
  function selectBasemap(key: BasemapType) {
    mapstyleKey = key;
    isExpanded = false;
  }

  // ベースマップの情報
  const basemaps: Array<{ key: BasemapType; label: string }> = [
    { key: "gsi_standard", label: "地理院タイル（標準）" },
    { key: "gsi_pale", label: "地理院タイル（淡色）" },
    { key: "osm", label: "OpenStreetMap" },
  ];
</script>

<div class="preview-container">
  <!-- 現在選択されているベースマップのプレビュー（常に表示） -->
  <button
    type="button"
    class="preview-button"
    onclick={toggleExpand}
    aria-label="ベースマップを選択"
  >
    {#if mapstyleKey === "gsi_standard"}
      <div class="preview-item">
        <MapLibre
          class="w-full h-full rounded-lg"
          {center}
          {zoom}
          style={styles["gsi_standard"]}
          attributionControl={false}
          interactive={false}
          bind:map={iconMap1}
        />
        <span class="preview-label">標準</span>
      </div>
    {:else if mapstyleKey === "gsi_pale"}
      <div class="preview-item">
        <MapLibre
          class="w-full h-full rounded-lg"
          {center}
          {zoom}
          style={styles["gsi_pale"]}
          attributionControl={false}
          interactive={false}
          bind:map={iconMap2}
        />
        <span class="preview-label">淡色</span>
      </div>
    {:else if mapstyleKey === "osm"}
      <div class="preview-item">
        <MapLibre
          class="w-full h-full rounded-lg"
          {center}
          {zoom}
          style={styles["osm"]}
          attributionControl={false}
          interactive={false}
          bind:map={iconMap3}
        />
        <span class="preview-label">OSM</span>
      </div>
    {/if}
  </button>

  <!-- 展開時に表示される他のベースマップ -->
  {#if isExpanded}
    <div class="expanded-previews">
      {#each basemaps as basemap}
        {#if basemap.key !== mapstyleKey}
          <button
            type="button"
            class="preview-button"
            onclick={() => selectBasemap(basemap.key)}
            aria-label={basemap.label}
          >
            <div class="preview-item">
              <MapLibre
                class="w-full h-full rounded-lg"
                {center}
                {zoom}
                style={styles[basemap.key]}
                attributionControl={false}
                interactive={false}
              />
              <span class="preview-label">{basemap.label.replace(
                  "地理院タイル（",
                  ""
                ).replace("）", "").replace("OpenStreetMap", "OSM")}</span>
            </div>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .preview-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .preview-button {
    width: 80px;
    height: 80px;
    padding: 4px;
    border: none;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .preview-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  .preview-button:active {
    transform: translateY(0);
  }

  .preview-item {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .preview-label {
    position: absolute;
    bottom: 2px;
    left: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 2px;
    text-align: center;
    pointer-events: none;
  }

  .expanded-previews {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
