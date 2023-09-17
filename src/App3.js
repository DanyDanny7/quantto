import React from 'react';
import { useEffect } from 'react';

const App = () => {

  const up = 3;
  const down = 3;
  // const up = 2;
  // const down = 2;

  const color = {
    "N": "#01adef",
    "N-CD": "#a000ce",
    "N-GANA": "#a000ce",
    "PCN": "#1835af",
    "ARENA": "#1600f7",
    "FMLN": "#cd242d",
    "N-PCN": "#a000ce",
    "GANA": "#df6f08",
    "N-CD-GANA": "#a000ce",
    "N-PCN-GANA": "#a000ce",
    "ARENA-PCN": "#1600f7",
    "PDC": "#026f2c",
    "VAMOS": "#ffffff",
  }

  const municipios = [
    {
      municipio: "ahuachapan-centro", x: 10.1, y: 36.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "ahuachapan-norte", x: 15.0, y: 34.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "ahuachapan-sur", x: 4.9, y: 50.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-PCN", count: 4 },
      ]
    }, {
      municipio: "cabanas-este", x: 60.9, y: 41.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "cabanas-oeste", x: 51.9, y: 43.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "chalatenango-centro", x: 38.7, y: 21.7, child: [{ partido: "ARENA", count: 4 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "chalatenango-norte", x: 38.5, y: 9.2, child: [{ partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      { partido: "N-GANA", count: 2 },
      ]
    }, {
      municipio: "chalatenango-sur", x: 50.0, y: 30.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "cuscatlan-norte", x: 40.9, y: 35.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "cuscatlan-sur", x: 46.2, y: 49.6, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 4 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-libertad-centro", x: 29.7, y: 44.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "la-libertad-costa", x: 26.5, y: 66.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "la-libertad-este", x: 35.0, y: 65.7, child: [{ partido: "ARENA", count: 6 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-libertad-norte", x: 33.8, y: 39.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "N-GANA", count: 2 },
      ]
    }, {
      municipio: "la-libertad-oeste", x: 26.1, y: 54.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "la-libertad-sur", x: 32.0, y: 62.5, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "la-paz-centro", x: 45.7, y: 75.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 4 },
      { partido: "N-GANA", count: 2 },
      ]
    }, {
      municipio: "la-paz-este", x: 51.3, y: 78.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "la-paz-oeste", x: 42.1, y: 67.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-union-norte", x: 91.9, y: 59.2, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-union-sur", x: 88.8, y: 83.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "morazan-norte", x: 82.4, y: 41.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "morazan-sur", x: 81.5, y: 57.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "san-miguel-centro", x: 80.0, y: 77.9, child: [{ partido: "FMLN", count: 4 },
      { partido: "N", count: 2 },
      { partido: "N-GANA", count: 7 },
      { partido: "PDC", count: 1 },
      ]
    }, {
      municipio: "san-miguel-norte", x: 72.1, y: 51.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "san-miguel-oeste", x: 72.8, y: 77.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-salvador-centro", x: 37.4, y: 54.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 3 },
      { partido: "N-CD", count: 1 },
      { partido: "N-GANA", count: 6 },
      ]
    }, {
      municipio: "san-salvador-este", x: 41.2, y: 53.6, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 10 },
      { partido: "N-GANA", count: 2 },
      ]
    }, {
      municipio: "san-salvador-norte", x: 37.1, y: 35.5, child: [{ partido: "FMLN", count: 2 },
      { partido: "N", count: 4 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "san-salvador-oeste", x: 37.0, y: 46.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "san-salvador-sur", x: 38.0, y: 65.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-vicente-norte", x: 58.2, y: 55.8, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "san-vicente-sur", x: 55.6, y: 67.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "santa-ana-centro", x: 22.6, y: 34.0, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 10 },
      ]
    }, {
      municipio: "santa-ana-este", x: 25.8, y: 41.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "santa-ana-norte", x: 28.0, y: 11.9, child: [{ partido: "N", count: 2 },
      { partido: "PCN", count: 2 },
      { partido: "PDC", count: 6 },
      ]
    }, {
      municipio: "santa-ana-oeste", x: 18.7, y: 27.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "sonsonate-centro", x: 15.8, y: 61.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "sonsonate-este", x: 21.3, y: 54.0, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "sonsonate-norte", x: 15.9, y: 47.4, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "sonsonate-oeste", x: 11.7, y: 60.4, child: [{ partido: "GANA", count: 4 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "usulutan-este", x: 69.7, y: 88.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan-norte", x: 66.9, y: 67.5, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan-oeste", x: 60.6, y: 85.1, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    },
  ]


  const distritos = [
    {
      municipio: "ahuachapan_ahuachapan", x: 10.9, y: 36.2, child: [{ partido: "ARENA", count: 1 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 11 },
      { partido: "PCN", count: 4 },
      ]
    }, {
      municipio: "ahuachapan_apaneca", x: 13.1, y: 46.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "ahuachapan_atiquizaya", x: 15.7, y: 36.2, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 10 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "ahuachapan_concepcion-de-ataco", x: 10.8, y: 44.5, child: [{ partido: "ARENA", count: 7 },
      { partido: "FMLN", count: 2 },
      { partido: "N-CD", count: 3 },
      ]
    }, {
      municipio: "ahuachapan_el-refugio", x: 17.2, y: 34.9, child: [{ partido: "N-CD", count: 8 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "ahuachapan_guaymango", x: 11.1, y: 53.6, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 7 },
      { partido: "N-PCN", count: 4 },
      ]
    }, {
      municipio: "ahuachapan_jujutla", x: 6.8, y: 54.3, child: [{ partido: "ARENA", count: 8 },
      { partido: "N-CD", count: 5 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "ahuachapan_san-fco-menendez", x: 2.7, y: 49.6, child: [{ partido: "GANA", count: 5 },
      { partido: "N-PCN", count: 9 },
      ]
    }, {
      municipio: "ahuachapan_san-lorenzo", x: 13.8, y: 32.1, child: [{ partido: "CD", count: 2 },
      { partido: "N-GANA", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "ahuachapan_san-pedro-puxtla", x: 13.2, y: 50.6, child: [{ partido: "ARENA", count: 5 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "ahuachapan_tacuba", x: 6.7, y: 40.6, child: [{ partido: "FMLN", count: 1 },
      { partido: "N", count: 3 },
      { partido: "PCN", count: 10 },
      ]
    }, {
      municipio: "ahuachapan_turin", x: 14.5, y: 36.6, child: [{ partido: "N", count: 4 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "cabanas_cinquera", x: 47.7, y: 42.1, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "cabanas_dolores", x: 64.9, y: 47.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cabanas_guacotecti", x: 60.2, y: 43.8, child: [{ partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "cabanas_ilobasco", x: 53.3, y: 44.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "cabanas_jutiapa", x: 51.3, y: 40.6, child: [{ partido: "ARENA", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "cabanas_san-isidro", x: 58.0, y: 47.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 8 },
      ]
    }, {
      municipio: "cabanas_sensuntepeque", x: 62.6, y: 42.6, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 8 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "cabanas_tejutepeque", x: 49.4, y: 44.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "cabanas_victoria", x: 61.0, y: 35.8, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "chalatenango_agua-caliente", x: 36.4, y: 17.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "chalatenango_arcatao", x: 56.4, y: 28.3, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "chalatenango_azacualpa", x: 46.9, y: 34.3, child: [{ partido: "FMLN", count: 5 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "chalatenango_cancasque", x: 52.4, y: 35.5, child: [{ partido: "FMLN", count: 5 },
      { partido: "N-CD", count: 3 },
      ]
    }, {
      municipio: "chalatenango_chalatenango", x: 48.2, y: 29.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA-PCN", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "chalatenango_citala", x: 35.3, y: 5.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "chalatenango_comalapa", x: 47.9, y: 21.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "chalatenango_concepcion-quezaltepeque", x: 47.8, y: 24.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "chalatenango_dulce-nombre-de-maria", x: 46.4, y: 16.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "chalatenango_el-carrizal", x: 49.7, y: 19.4, child: [{ partido: "FMLN", count: 5 },
      { partido: "N-CD", count: 3 },
      ]
    }, {
      municipio: "chalatenango_el-paraiso", x: 42.6, y: 26.8, child: [{ partido: "GANA", count: 3 },
      { partido: "N", count: 7 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "chalatenango_la-laguna", x: 49.9, y: 23.0, child: [{ partido: "ARENA-PCN", count: 5 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "chalatenango_la-palma", x: 38.8, y: 10.9, child: [{ partido: "FMLN", count: 5 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "chalatenango_la-reina", x: 39.9, y: 16.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-GANA", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "chalatenango_las-flores", x: 52.7, y: 28.9, child: [{ partido: "FMLN", count: 7 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "chalatenango_las-vueltas", x: 51.2, y: 26.6, child: [{ partido: "FMLN", count: 6 },
      { partido: "N-GANA", count: 2 },
      ]
    }, {
      municipio: "chalatenango_nombre-de-jesus", x: 57.3, y: 32.3, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "chalatenango_nueva-concepcion", x: 33.7, y: 24.3, child: [{ partido: "ARENA", count: 7 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 3 },
      { partido: "N-CD", count: 3 },
      ]
    }, {
      municipio: "chalatenango_nueva-trinidad", x: 54.3, y: 27.4, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "chalatenango_ojos-de-agua", x: 51.6, y: 23.2, child: [{ partido: "GANA", count: 7 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "chalatenango_potonico", x: 50.3, y: 36.4, child: [{ partido: "ARENA", count: 5 },
      { partido: "N-GANA", count: 3 },
      ]
    }, {
      municipio: "chalatenango_san-antonio-de-la-cruz", x: 55.2, y: 33.0, child: [{ partido: "ARENA", count: 5 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "chalatenango_san-antonio-los-ranchos", x: 50.2, y: 32.8, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 3 },
      ]
    }, {
      municipio: "chalatenango_san-fernando", x: 44.0, y: 10.0, child: [{ partido: "FMLN", count: 5 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "chalatenango_san-francisco-lempa", x: 46.2, y: 35.7, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "chalatenango_san-francisco-morazan", x: 43.9, y: 17.0, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "chalatenango_san-ignacio", x: 39.2, y: 7.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N-GANA", count: 6 },
      ]
    }, {
      municipio: "chalatenango_san-isidro-labrador", x: 53.1, y: 32.8, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "chalatenango_san-luis-del-carmen", x: 47.8, y: 36.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "N-CD", count: 1 },
      { partido: "PCN", count: 4 },
      ]
    }, {
      municipio: "chalatenango_san-miguel-de-mercedes", x: 48.9, y: 33.4, child: [{ partido: "N", count: 1 },
      { partido: "PCN", count: 7 },
      ]
    }, {
      municipio: "chalatenango_san-rafael", x: 44.5, y: 24.0, child: [{ partido: "ARENA", count: 3 },
      { partido: "N-PCN-GANA", count: 5 },
      ]
    }, {
      municipio: "chalatenango_santa-rita", x: 45.3, y: 26.6, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-GANA", count: 4 },
      ]
    }, {
      municipio: "chalatenango_tejutla", x: 41.3, y: 21.5, child: [{ partido: "ARENA-PCN", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 6 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_candelaria", x: 46.7, y: 58.3, child: [{ partido: "ARENA", count: 7 },
      { partido: "N", count: 3 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_cojutepeque", x: 48.2, y: 55.5, child: [{ partido: "ARENA", count: 1 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 9 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_el-carmen", x: 49.9, y: 54.3, child: [{ partido: "ARENA", count: 5 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "cuscatlan_el-rosario", x: 50.1, y: 51.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 5 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "cuscatlan_monte-san-juan", x: 48.4, y: 51.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 3 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "cuscatlan_oratorio-de-concepcion", x: 43.8, y: 47.2, child: [{ partido: "GANA", count: 1 },
      { partido: "N", count: 5 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_san-bartolome-perulapia", x: 44.0, y: 50.0, child: [{ partido: "ARENA", count: 5 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_san-cristobal", x: 50.1, y: 57.5, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_san-jose-guayabal", x: 41.4, y: 43.6, child: [{ partido: "ARENA", count: 6 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "cuscatlan_san-pedro-perulapan", x: 45.5, y: 52.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 9 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_san-rafael-cedros", x: 51.1, y: 53.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 7 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "cuscatlan_san-ramon", x: 49.0, y: 57.9, child: [{ partido: "ARENA", count: 1 },
      { partido: "GANA", count: 5 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_santa-cruz-analquito", x: 48.0, y: 60.2, child: [{ partido: "GANA", count: 1 },
      { partido: "N-CD", count: 5 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_santa-cruz-michapa", x: 47.3, y: 53.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 8 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "cuscatlan_suchitoto", x: 43.0, y: 38.1, child: [{ partido: "FMLN", count: 6 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "cuscatlan_tenancingo", x: 47.2, y: 47.4, child: [{ partido: "FMLN", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "la-libertad_antiguo-cuscatlan", x: 35.9, y: 59.4, child: [{ partido: "ARENA", count: 11 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "la-libertad_chiltiupan", x: 27.1, y: 68.3, child: [{ partido: "ARENA", count: 4 },
      { partido: "FMLN", count: 1 },
      { partido: "N-CD", count: 7 },
      ]
    }, {
      municipio: "la-libertad_ciudad-arce", x: 28.6, y: 48.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 12 },
      ]
    }, {
      municipio: "la-libertad_colon", x: 31.2, y: 55.5, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 13 },
      ]
    }, {
      municipio: "la-libertad_comasagua", x: 30.8, y: 62.6, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "la-libertad_huizucar", x: 36.1, y: 65.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 3 },
      { partido: "N-CD", count: 7 },
      ]
    }, {
      municipio: "la-libertad_jayaque", x: 27.6, y: 59.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "la-libertad_jicalapa", x: 25.3, y: 68.7, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-CD", count: 4 },
      ]
    }, {
      municipio: "la-libertad_la-libertad", x: 33.3, y: 71.5, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "la-libertad_nuevo-cuscatlan", x: 35.2, y: 61.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD-GANA", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-libertad_quezaltepeque", x: 34.0, y: 46.8, child: [{ partido: "ARENA", count: 4 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 11 },
      ]
    }, {
      municipio: "la-libertad_sacacoyo", x: 28.4, y: 52.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 7 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "la-libertad_san-jose-villanueva", x: 35.0, y: 67.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 3 },
      { partido: "PCN", count: 7 },
      ]
    }, {
      municipio: "la-libertad_san-juan-opico", x: 30.0, y: 41.7, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 11 },
      ]
    }, {
      municipio: "la-libertad_san-matias", x: 33.5, y: 40.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "la-libertad_san-pablo-tacachico", x: 32.3, y: 33.4, child: [{ partido: "ARENA", count: 5 },
      { partido: "FMLN", count: 1 },
      { partido: "N-GANA", count: 8 },
      ]
    }, {
      municipio: "la-libertad_santa-tecla", x: 33.3, y: 59.1, child: [{ partido: "ARENA", count: 6 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 10 },
      { partido: "VAMOS", count: 1 },
      ]
    }, {
      municipio: "la-libertad_talnique", x: 29.1, y: 54.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-GANA", count: 8 },
      ]
    }, {
      municipio: "la-libertad_tamanique", x: 29.4, y: 70.0, child: [{ partido: "FMLN", count: 1 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "la-libertad_teotepeque", x: 22.7, y: 68.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "la-libertad_tepecoyo", x: 25.7, y: 57.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 9 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "la-libertad_zaragoza", x: 34.0, y: 66.4, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 8 },
      { partido: "VAMOS", count: 2 },
      ]
    }, {
      municipio: "la-paz_cuyultitan", x: 42.3, y: 69.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "la-paz_el-rosario", x: 45.9, y: 75.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 7 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "la-paz_jerusalen", x: 49.9, y: 60.4, child: [{ partido: "GANA", count: 6 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-paz_mercedes-la-ceiba", x: 49.9, y: 61.1, child: [{ partido: "GANA", count: 7 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "la-paz_olocuilta", x: 40.7, y: 72.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 8 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "la-paz_paraiso-de-osorio", x: 47.8, y: 62.1, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "la-paz_san-antonio-masahuat", x: 45.2, y: 66.8, child: [{ partido: "FMLN", count: 6 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-paz_san-emigdio", x: 46.7, y: 60.9, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-paz_san-francisco-chinameca", x: 42.9, y: 63.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-PCN-GANA", count: 8 },
      ]
    }, {
      municipio: "la-paz_san-juan-nonualco", x: 49.4, y: 76.6, child: [{ partido: "ARENA", count: 3 },
      { partido: "N-CD", count: 9 },
      ]
    }, {
      municipio: "la-paz_san-juan-talpa", x: 42.5, y: 72.6, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-paz_san-juan-tepezontes", x: 46.4, y: 64.5, child: [{ partido: "ARENA", count: 5 },
      { partido: "N-CD", count: 1 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-paz_san-luis-la-herradura", x: 49.6, y: 85.3, child: [{ partido: "GANA", count: 8 },
      { partido: "N-CD", count: 3 },
      { partido: "PCN", count: 3 },
      ]
    }, {
      municipio: "la-paz_san-luis-talpa", x: 41.9, y: 77.4, child: [{ partido: "GANA", count: 9 },
      { partido: "N-CD", count: 5 },
      ]
    }, {
      municipio: "la-paz_san-miguel-tepezontes", x: 45.1, y: 62.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "la-paz_san-pedro-masahuat", x: 45.1, y: 80.6, child: [{ partido: "ARENA", count: 4 },
      { partido: "N-GANA", count: 10 },
      ]
    }, {
      municipio: "la-paz_san-pedro-nonualco", x: 46.7, y: 82.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "la-paz_san-rafael-obrajuelo", x: 49.6, y: 72.1, child: [{ partido: "GANA", count: 5 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "la-paz_santa-maria-ostuma", x: 49.3, y: 62.6, child: [{ partido: "ARENA", count: 4 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "la-paz_santiago-nonualco", x: 48.0, y: 70.8, child: [{ partido: "GANA", count: 3 },
      { partido: "N-CD", count: 11 },
      ]
    }, {
      municipio: "la-paz_tapalhuaca", x: 43.4, y: 67.9, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "la-paz_zacatecoluca", x: 51.9, y: 78.1, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 4 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "la-union_anamoros", x: 90.3, y: 55.1, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "la-union_bolivar", x: 88.5, y: 67.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 5 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "la-union_concepcion-de-oriente", x: 96.6, y: 50.0, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 8 },
      ]
    }, {
      municipio: "la-union_conchagua", x: 91.0, y: 89.2, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 8 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "la-union_el-carmen", x: 86.5, y: 85.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "la-union_el-sauce", x: 94.7, y: 59.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 6 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "la-union_intipuca", x: 85.0, y: 95.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "la-union_la-union", x: 87.9, y: 91.9, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "la-union_lislique", x: 90.1, y: 46.4, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "la-union_meanguera-del-golfo", x: 96.1, y: 92.6, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "la-union_nueva-esparta", x: 92.4, y: 45.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 10 },
      ]
    }, {
      municipio: "la-union_pasaquina", x: 93.5, y: 68.5, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "la-union_poloros", x: 94.8, y: 48.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 7 },
      ]
    }, {
      municipio: "la-union_san-alejo", x: 89.9, y: 77.0, child: [{ partido: "ARENA", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 3 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "la-union_san-jose", x: 90.6, y: 68.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 5 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "la-union_sta-rosa-de-lima", x: 90.7, y: 61.3, child: [{ partido: "ARENA", count: 8 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 3 },
      ]
    }, {
      municipio: "la-union_yayantique", x: 85.6, y: 75.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 6 },
      ]
    }, {
      municipio: "la-union_yucuaiquin", x: 86.6, y: 70.0, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 6 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "morazan_arambala", x: 81.6, y: 38.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "morazan_cacaopera", x: 84.3, y: 48.9, child: [{ partido: "ARENA", count: 7 },
      { partido: "FMLN", count: 4 },
      { partido: "N", count: 1 },
      ]
    }, {
      municipio: "morazan_chilanga", x: 80.8, y: 54.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 7 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_corinto", x: 87.8, y: 47.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "morazan_delicias-de-concepcion", x: 81.7, y: 49.6, child: [{ partido: "ARENA", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_el-divisadero", x: 83.7, y: 66.0, child: [{ partido: "FMLN", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_el-rosario", x: 78.2, y: 43.8, child: [{ partido: "ARENA", count: 1 },
      { partido: "GANA", count: 4 },
      { partido: "N-CD", count: 1 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "morazan_gualococti", x: 78.7, y: 48.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 5 },
      { partido: "GANA", count: 1 },
      ]
    }, {
      municipio: "morazan_guatajiagua", x: 77.7, y: 58.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "morazan_joateca", x: 84.1, y: 41.1, child: [{ partido: "ARENA", count: 1 },
      { partido: "GANA", count: 5 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_jocoaitique", x: 80.2, y: 40.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 5 },
      ]
    }, {
      municipio: "morazan_jocoro", x: 86.3, y: 62.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 3 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "morazan_lolotiquillo", x: 83.6, y: 54.5, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 6 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_meanguera", x: 81.4, y: 44.5, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "morazan_osicala", x: 80.2, y: 47.7, child: [{ partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "morazan_perquin", x: 81.8, y: 35.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 5 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "morazan_san-carlos", x: 82.2, y: 62.1, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 5 },
      ]
    }, {
      municipio: "morazan_san-fco-gotera", x: 83.3, y: 58.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "morazan_san-fernando", x: 78.3, y: 35.8, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 1 },
      ]
    }, {
      municipio: "morazan_san-isidro", x: 77.1, y: 44.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "N", count: 1 },
      { partido: "VAMOS", count: 5 },
      ]
    }, {
      municipio: "morazan_san-simon", x: 77.0, y: 48.1, child: [{ partido: "ARENA", count: 6 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_sensembra", x: 80.2, y: 57.9, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "morazan_sociedad", x: 87.0, y: 56.8, child: [{ partido: "ARENA", count: 7 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "morazan_torola", x: 77.3, y: 40.8, child: [{ partido: "FMLN", count: 3 },
      { partido: "GANA", count: 5 },
      ]
    }, {
      municipio: "morazan_yamabal", x: 78.7, y: 54.0, child: [{ partido: "ARENA", count: 5 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 1 },
      ]
    }, {
      municipio: "morazan_yoloaiquin", x: 81.7, y: 52.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "san-miguel_carolina", x: 74.0, y: 44.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-miguel_chapeltique", x: 75.3, y: 61.5, child: [{ partido: "GANA", count: 2 },
      { partido: "N", count: 1 },
      { partido: "PCN", count: 2 },
      { partido: "PDC", count: 7 },
      ]
    }, {
      municipio: "san-miguel_chinameca", x: 73.0, y: 73.8, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 10 },
      ]
    }, {
      municipio: "san-miguel_chirilagua", x: 81.0, y: 90.0, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 8 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "san-miguel_ciudad-barrios", x: 75.1, y: 51.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 9 },
      { partido: "PDC-CD", count: 1 },
      ]
    }, {
      municipio: "san-miguel_comacaran", x: 84.7, y: 69.8, child: [{ partido: "FMLN", count: 5 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "san-miguel_el-transito", x: 75.5, y: 83.0, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "san-miguel_lolotique", x: 72.9, y: 65.5, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "san-miguel_moncagua", x: 75.7, y: 67.4, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 11 },
      ]
    }, {
      municipio: "san-miguel_nueva-guadalupe", x: 73.6, y: 69.8, child: [{ partido: "GANA", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-miguel_nuevo-eden-de-san-juan", x: 67.4, y: 49.6, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 5 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "san-miguel_quelepa", x: 77.4, y: 70.9, child: [{ partido: "FMLN", count: 3 },
      { partido: "N-CD", count: 5 },
      ]
    }, {
      municipio: "san-miguel_san-antonio", x: 75.7, y: 44.2, child: [{ partido: "FMLN", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-miguel_san-gerardo", x: 69.9, y: 49.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "PDC", count: 8 },
      ]
    }, {
      municipio: "san-miguel_san-jorge", x: 73.2, y: 78.3, child: [{ partido: "ARENA", count: 6 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "san-miguel_san-luis-de-la-reina", x: 72.3, y: 46.6, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-miguel_san-miguel", x: 79.7, y: 77.0, child: [{ partido: "FMLN", count: 6 },
      { partido: "N-GANA", count: 10 },
      { partido: "PCN", count: 1 },
      { partido: "PDC", count: 1 },
      ]
    }, {
      municipio: "san-miguel_san-rafael-oriente", x: 74.7, y: 79.6, child: [{ partido: "FMLN", count: 7 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "san-miguel_sesori", x: 71.1, y: 55.5, child: [{ partido: "ARENA", count: 3 },
      { partido: "N", count: 7 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "san-miguel_uluazapa", x: 84.2, y: 73.4, child: [{ partido: "FMLN", count: 1 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 1 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "san-salvador_aguilares", x: 37.6, y: 37.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      { partido: "PCN", count: 1 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "san-salvador_apopa", x: 38.0, y: 49.8, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 14 },
      ]
    }, {
      municipio: "san-salvador_ayutuxtepeque", x: 38.2, y: 52.6, child: [{ partido: "ARENA", count: 8 },
      { partido: "FMLN", count: 1 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "san-salvador_ciudad-delgado", x: 39.5, y: 52.8, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 13 },
      ]
    }, {
      municipio: "san-salvador_cuscatancingo", x: 39.0, y: 54.7, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 12 },
      ]
    }, {
      municipio: "san-salvador_el-paisnal", x: 36.8, y: 33.4, child: [{ partido: "FMLN", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "san-salvador_guazapa", x: 39.1, y: 41.5, child: [{ partido: "GANA", count: 1 },
      { partido: "N-CD", count: 8 },
      { partido: "PCN", count: 5 },
      ]
    }, {
      municipio: "san-salvador_ilopango", x: 41.8, y: 57.4, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 13 },
      ]
    }, {
      municipio: "san-salvador_mejicanos", x: 36.8, y: 53.8, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 6 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 10 },
      ]
    }, {
      municipio: "san-salvador_nejapa", x: 36.8, y: 46.8, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 9 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "san-salvador_panchimalco", x: 38.6, y: 65.7, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 5 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "san-salvador_rosario-de-mora", x: 37.6, y: 69.1, child: [{ partido: "ARENA-DS", count: 2 },
      { partido: "FMLN", count: 3 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "san-salvador_san-marcos", x: 38.8, y: 60.0, child: [{ partido: "FMLN", count: 6 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "san-salvador_san-martin", x: 43.7, y: 54.0, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "N-GANA", count: 12 },
      ]
    }, {
      municipio: "san-salvador_san-salvador", x: 37.1, y: 57.0, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-GANA", count: 11 },
      { partido: "NT", count: 1 },
      ]
    }, {
      municipio: "san-salvador_santiago-texacuangos", x: 42.0, y: 60.8, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 10 },
      ]
    }, {
      municipio: "san-salvador_santo-tomas", x: 40.2, y: 62.1, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "san-salvador_soyapango", x: 40.2, y: 57.0, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 13 },
      ]
    }, {
      municipio: "san-salvador_tonacatepeque", x: 41.1, y: 50.9, child: [{ partido: "ARENA", count: 1 },
      { partido: "CD", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 12 },
      ]
    }, {
      municipio: "san-vicente_apastepeque", x: 58.6, y: 59.8, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N-CD", count: 7 },
      ]
    }, {
      municipio: "san-vicente_guadalupe", x: 51.3, y: 63.4, child: [{ partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "san-vicente_san-cayetano-istepeque", x: 53.7, y: 60.4, child: [{ partido: "ARENA", count: 6 },
      { partido: "N-CD", count: 4 },
      ]
    }, {
      municipio: "san-vicente_san-esteban-catarina", x: 56.3, y: 53.8, child: [{ partido: "FMLN", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "san-vicente_san-ildefonso", x: 64.3, y: 57.5, child: [{ partido: "ARENA", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "san-vicente_san-lorenzo", x: 53.5, y: 58.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "san-vicente_san-sebastian", x: 53.5, y: 53.4, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "san-vicente_san-vicente", x: 56.7, y: 65.3, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "san-vicente_santa-clara", x: 59.8, y: 53.8, child: [{ partido: "ARENA", count: 6 },
      { partido: "FMLN", count: 2 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "san-vicente_santo-domingo", x: 51.9, y: 56.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 6 },
      { partido: "N-CD", count: 2 },
      ]
    }, {
      municipio: "san-vicente_tecoluca", x: 55.6, y: 73.2, child: [{ partido: "ARENA", count: 4 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "san-vicente_tepetitan", x: 52.7, y: 60.9, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 5 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "san-vicente_verapaz", x: 51.4, y: 59.6, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "GANA", count: 5 },
      { partido: "N-CD", count: 1 },
      ]
    }, {
      municipio: "santa-ana_candelaria-de-la-frontera", x: 19.9, y: 24.7, child: [{ partido: "ARENA", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "santa-ana_chalchuapa", x: 17.5, y: 29.1, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 11 },
      ]
    }, {
      municipio: "santa-ana_coatepeque", x: 26.5, y: 38.3, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 8 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "santa-ana_el-congo", x: 25.4, y: 47.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 4 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "santa-ana_el-porvenir", x: 19.8, y: 30.6, child: [{ partido: "N", count: 4 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "santa-ana_masahuat", x: 28.9, y: 21.3, child: [{ partido: "GANA", count: 5 },
      { partido: "PCN", count: 3 },
      ]
    }, {
      municipio: "santa-ana_metapan", x: 29.4, y: 9.6, child: [{ partido: "N", count: 3 },
      { partido: "PCN", count: 3 },
      { partido: "PDC", count: 10 },
      ]
    }, {
      municipio: "santa-ana_san-antonio-pajonal", x: 23.6, y: 19.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 6 },
      ]
    }, {
      municipio: "santa-ana_san-sebastian-salitrillo", x: 20.2, y: 35.8, child: [{ partido: "ARENA", count: 5 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "santa-ana_santa-ana", x: 22.6, y: 34.7, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 13 },
      ]
    }, {
      municipio: "santa-ana_santa-rosa-guachipilin", x: 31.6, y: 19.2, child: [{ partido: "ARENA", count: 6 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "santa-ana_santiago-de-la-frontera", x: 20.4, y: 20.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 6 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "santa-ana_texistepeque", x: 26.2, y: 24.5, child: [{ partido: "CD", count: 3 },
      { partido: "PCN", count: 7 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "sonsonate_acajutla", x: 11.1, y: 61.9, child: [{ partido: "GANA", count: 6 },
      { partido: "N-CD", count: 9 },
      { partido: "PDC", count: 1 },
      ]
    }, {
      municipio: "sonsonate_armenia", x: 24.9, y: 51.7, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 10 },
      ]
    }, {
      municipio: "sonsonate_caluco", x: 20.0, y: 56.6, child: [{ partido: "ARENA", count: 2 },
      { partido: "N-CD", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "sonsonate_cuisnahuat", x: 20.0, y: 63.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "sonsonate_izalco", x: 21.0, y: 50.6, child: [{ partido: "ARENA", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 11 },
      ]
    }, {
      municipio: "sonsonate_juayua", x: 16.5, y: 44.2, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "sonsonate_nahuizalco", x: 16.2, y: 50.4, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 3 },
      { partido: "N", count: 11 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "sonsonate_nahulingo", x: 16.6, y: 59.1, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N-CD", count: 7 },
      ]
    }, {
      municipio: "sonsonate_salcoatitan", x: 14.9, y: 46.0, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 1 },
      ]
    }, {
      municipio: "sonsonate_san-antonio-del-monte", x: 15.1, y: 55.8, child: [{ partido: "GANA", count: 4 },
      { partido: "N", count: 8 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "sonsonate_san-julian", x: 23.0, y: 55.8, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "sonsonate_santa-catarina-masahuat", x: 14.6, y: 50.4, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      { partido: "PDC", count: 2 },
      ]
    }, {
      municipio: "sonsonate_santa-isabel-ishuatan", x: 21.7, y: 65.3, child: [{ partido: "ARENA", count: 3 },
      { partido: "GANA", count: 7 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "sonsonate_santo-domingo-de-guzman", x: 13.3, y: 55.7, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 6 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "sonsonate_sonsonate", x: 15.3, y: 67.0, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 12 },
      ]
    }, {
      municipio: "sonsonate_sonzacate", x: 17.0, y: 54.2, child: [{ partido: "FMLN", count: 5 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 8 },
      ]
    }, {
      municipio: "usulutan_alegria", x: 66.7, y: 71.1, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 3 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "usulutan_berlin", x: 63.2, y: 69.6, child: [{ partido: "FMLN", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "usulutan_california", x: 68.1, y: 77.4, child: [{ partido: "FMLN", count: 5 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "usulutan_concepcion-batres", x: 72.6, y: 88.3, child: [{ partido: "ARENA", count: 7 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "usulutan_el-triunfo", x: 70.5, y: 63.0, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_ereguayquin", x: 71.1, y: 84.2, child: [{ partido: "FMLN", count: 6 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "usulutan_estanzuelas", x: 66.0, y: 62.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_jiquilisco", x: 59.6, y: 85.1, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 8 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "usulutan_jucuapa", x: 70.4, y: 71.5, child: [{ partido: "FMLN", count: 3 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "usulutan_jucuaran", x: 77.1, y: 94.3, child: [{ partido: "FMLN", count: 3 },
      { partido: "N", count: 7 },
      { partido: "PCN", count: 2 },
      ]
    }, {
      municipio: "usulutan_mercedes-umana", x: 66.5, y: 67.4, child: [{ partido: "FMLN", count: 4 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "usulutan_nueva-granada", x: 68.8, y: 61.3, child: [{ partido: "ARENA", count: 2 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_ozatlan", x: 66.1, y: 81.5, child: [{ partido: "ARENA", count: 7 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 3 },
      ]
    }, {
      municipio: "usulutan_puerto-el-triunfo", x: 64.9, y: 91.9, child: [{ partido: "ARENA", count: 2 },
      { partido: "CD", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_san-agustin", x: 62.1, y: 77.4, child: [{ partido: "FMLN", count: 6 },
      { partido: "N", count: 4 },
      ]
    }, {
      municipio: "usulutan_san-buenaventura", x: 70.7, y: 66.8, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 1 },
      { partido: "N", count: 5 },
      ]
    }, {
      municipio: "usulutan_san-dionisio", x: 70.1, y: 96.0, child: [{ partido: "ARENA", count: 4 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_san-francisco-javier", x: 63.5, y: 79.8, child: [{ partido: "FMLN", count: 8 },
      { partido: "N", count: 2 },
      ]
    }, {
      municipio: "usulutan_santa-elena", x: 70.0, y: 79.8, child: [{ partido: "ARENA", count: 3 },
      { partido: "FMLN", count: 2 },
      { partido: "N", count: 7 },
      ]
    }, {
      municipio: "usulutan_santa-maria", x: 70.2, y: 84.2, child: [{ partido: "ARENA", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 2 },
      { partido: "PCN", count: 6 },
      ]
    }, {
      municipio: "usulutan_santiago-de-maria", x: 64.8, y: 63.0, child: [{ partido: "GANA", count: 3 },
      { partido: "N", count: 9 },
      ]
    }, {
      municipio: "usulutan_tecapan", x: 66.4, y: 77.2, child: [{ partido: "FMLN", count: 2 },
      { partido: "GANA", count: 2 },
      { partido: "N", count: 6 },
      ]
    }, {
      municipio: "usulutan_usulutan", x: 69.8, y: 90.9, child: [{ partido: "ARENA", count: 1 },
      { partido: "FMLN", count: 1 },
      { partido: "GANA", count: 3 },
      { partido: "N", count: 11 },
      ]
    },
  ]
  const getRandomArbitrary = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  const getChild = (child, i, x, y) => {
    const arr = []
    for (let j = 0; j < child.length; j++) {
      arr.push(...Array.from({ length: child[j].count }, () => ({
        id: `${i}-${j}`,
        partido: child[j].partido,
        x: getRandomArbitrary(x - down, x + up),
        y: getRandomArbitrary(y - down, y + up),
        color: color[child[j].partido]
      })))
    }
    return arr
  }

  const prelist = municipios.map(({ municipio, x, y, child }, i) => ({
    municipio,
    x,
    y,
    child: getChild(child, i, x, y)
  }))

  useEffect(() => {
    const container = document.getElementById("mapa_dots")
    const element = prelist
    const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 360 360" style="height:40px; enable-background:new 0 0 360 360;" xml:space="preserve"><style type="text/css">	.st0{fill:#535555;}	.st1{fill:#3C3E3E;}	.st2{fill:#BCBBBB;}	.st3{fill:#878686;}</style><g>	<g>		<path class="st0" d="M84.49,263.61v40.94c0,19.18,42.76,34.74,95.51,34.74c52.75,0,95.51-15.56,95.51-34.74v-40.94H84.49z"/>		<path class="st1" d="M180,335.28c-52.75,0-95.51-15.55-95.51-34.74v4c0,19.18,42.76,34.74,95.51,34.74			c52.75,0,95.51-15.56,95.51-34.74v-4C275.51,319.73,232.75,335.28,180,335.28z"/>		<path class="st2" d="M240.63,327.17c8.53-2.56,15.82-5.63,21.5-9.11v-47.28l-21.5,13.5V327.17z"/>		<path class="st3" d="M275.51,266.35c0,19.18-42.76,34.74-95.51,34.74c-52.75,0-95.51-15.55-95.51-34.74			c0-19.19,42.76-34.74,95.51-34.74C232.75,231.6,275.51,247.16,275.51,266.35z"/>		<path class="st2" d="M180,298.74c-51.67,0-93.75-14.92-95.45-33.57c-0.04,0.39-0.06,0.78-0.06,1.17			c0,19.18,42.76,34.74,95.51,34.74c52.75,0,95.51-15.55,95.51-34.74c0-0.39-0.02-0.78-0.06-1.17			C273.76,283.82,231.67,298.74,180,298.74z"/>		<path class="st1" d="M257.14,262.01c0,14.63-34.26,26.5-76.51,26.5c-42.25,0-76.51-11.87-76.51-26.5			c0-14.64,34.26-26.51,76.51-26.51C222.88,235.5,257.14,247.37,257.14,262.01z"/>	</g>	<g>		<path class="st0" d="M243.25,238.94c-15.34-22.67-30.67-68.01-38.01-84.01l-20.3-0.45c0.01-0.13,0.01-0.22,0.01-0.22l-4.95,0.11			l-4.95-0.11c0,0,0.01,0.08,0.01,0.22l-20.3,0.45c-7.33,16-22.67,61.34-38,84.01c-15.32,22.66-16,43.97,63.15,44.01l0,0			c0.03,0,0.06,0,0.09,0c0.03,0,0.06,0,0.09,0l0,0C259.24,282.91,258.57,261.59,243.25,238.94z"/>		<path class="st1" d="M207.96,177.89c-2.99-9.21-5.68-17.36-7.11-22.1l-17.93-0.28c0-0.08,0.01-0.14,0.01-0.14l-3.06,0.07			l-3.06-0.07c0,0,0,0.05,0.01,0.14l-18.02,0.28c-1.91,6.82-7.04,20.95-10.83,37.26C156.53,174.06,191.16,155.64,207.96,177.89z"/>		<path class="st3" d="M203.63,204.5c-2.23-12.79,3.95-24,10.23-2c15.14,53.01,26.77,45.01,23.27,49.01			C233.63,255.51,212.88,257.51,203.63,204.5z"/>	</g>	<g>		<g>			<path class="st0" d="M120.27,122.51v20.6c0,12,26.75,21.73,59.73,21.73c32.99,0,59.73-9.73,59.73-21.73v-21.6L120.27,122.51z"/>			<path class="st3" d="M180,162.33c-32.99,0-59.73-9.73-59.73-21.73v2.5c0,12,26.75,21.73,59.73,21.73				c32.99,0,59.73-9.73,59.73-21.73v-2.5C239.73,152.6,212.99,162.33,180,162.33z"/>			<path class="st3" d="M217.92,157.25c5.34-1.6,9.89-3.52,13.45-5.69v-26.56l-13.45,8.44V157.25z"/>			<path class="st3" d="M239.73,122.21c0,12-26.74,21.73-59.73,21.73c-32.99,0-59.73-9.73-59.73-21.73c0-12,26.75-21.72,59.73-21.72				C212.99,100.49,239.73,110.22,239.73,122.21z"/>			<path class="st2" d="M180,142.48c-32.31,0-58.63-9.33-59.69-20.99c-0.02,0.24-0.04,0.48-0.04,0.73c0,12,26.75,21.73,59.73,21.73				c32.99,0,59.73-9.73,59.73-21.73c0-0.24-0.01-0.49-0.04-0.73C238.63,133.14,212.32,142.48,180,142.48z"/>		</g>		<path class="st1" d="M212.88,117.07c0,6.61-14.72,11.96-32.88,11.96c-18.16,0-32.88-5.35-32.88-11.96			c0-6.61,14.72-11.96,32.88-11.96C198.16,105.11,212.88,110.47,212.88,117.07z"/>	</g>	<g>		<path class="st0" d="M229.01,70.72c0,27.06-21.94,49-49.01,49s-49.01-21.94-49.01-49c0-27.07,21.94-49.01,49.01-49.01			S229.01,43.65,229.01,70.72z"/>		<path class="st2" d="M209.21,42.83c-1.17,4.01-8.62,5.37-16.64,3.03c-8.02-2.34-13.58-7.48-12.41-11.49			c1.17-4.01,8.62-5.37,16.64-3.03C204.82,33.67,210.38,38.82,209.21,42.83z"/>	</g></g></svg>`
    for (let j = 0; j < element.length; j++) {
      // const main = element[j];
      // const div = document.createElement("div");
      // div.innerHTML = `
      // <div style="width: 10px; height: 10px; border-radius: 50%; z-index: 3; position: absolute; top: ${main.y}%; left: ${main.x}%">
      // ${svg}
      // </div>
      // `
      // container.appendChild(div);



      for (let i = 0; i < element[j].child.length; i++) {
        const elem = element[j].child[i];
        const div = document.createElement("div");
        div.innerHTML = `<div style="background-color: ${elem.color}; width: 7px; height: 7px; border-radius: 50%; z-index: 2; position: absolute; top: ${elem.y}%; left: ${elem.x}%; border: 1px solid black"></div>`
        container.appendChild(div);
      }

    }
    // console.log(element)
    // const div = document.createElement("div");
    // div.innerHTML = `<div style="background-color: ${"red"}; width: 30px; height: 30px; border-radius: 50%; position: absolute; top: ${element.y}%; left: ${element.x}%"></div>`
    // container.appendChild(div);
  }, [])


  return (
    <div>
      <div style={{
        background: "transparent",
        border: "1px solid black",
        height: 530,
        width: 1000,
        position: "relative",
        // backgroundImage: "url(/map-proyec.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div id="mapa_dots"  >
        </div>
      </div>
    </div>
  );
}

export default App;
