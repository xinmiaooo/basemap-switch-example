import type { StyleSpecification } from "maplibre-gl";

export type BasemapStyles = {
    osm: StyleSpecification;
    gsi_standard: StyleSpecification;
    gsi_pale: StyleSpecification;
};

export type BasemapType = keyof BasemapStyles;

export const styles: BasemapStyles = {
    gsi_standard: {
        version: 8,
        sources: {
            "gsi-standard": {
                type: "raster",
                tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "地理院タイル（標準）",
            },
        },
        layers: [
            {
                id: "gsi-standard-layer",
                type: "raster",
                source: "gsi-standard",
            },
        ],
    },
    gsi_pale: {
        version: 8,
        sources: {
            "gsi-pale": {
                type: "raster",
                tiles: ["https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "地理院タイル（淡色）",
            },
        },
        layers: [
            {
                id: "gsi-pale-layer",
                type: "raster",
                source: "gsi-pale",
            },
        ],
    },
    osm: {
        version: 8,
        sources: {
            osm: {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors",
            },
        },
        layers: [
            {
                id: "osm-layer",
                type: "raster",
                source: "osm",
            },
        ],
    },
};