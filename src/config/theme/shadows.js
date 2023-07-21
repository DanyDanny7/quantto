const shadows = [
    "none",
    "2px 2px 8px 0px rgba(159, 165, 199, 0.25)",
    "5px 5px 16px 0px rgba(159, 165, 199, 0.25)",
    "8px 8px 40px 0px rgba(159, 165, 199, 0.25)",
    ...Array.from({ length: 21 }, (v, i) => "8px 8px 40px 0px rgba(159, 165, 199, 0.25)")
    // Esta última linea es solo para evitar el warning de que no hay sombra 24
];

export default shadows;