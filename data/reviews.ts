import type { ServiceId } from "./services";

export type Review = {
  name: string;
  area: string;
  stars: number;
  text: string;
  service: ServiceId;
  photo?: string; // /proof path to show alongside
};

export const reviews: Review[] = [
  { name: "Marisol V.", area: "Boca Raton", stars: 5, service: "irrigation", photo: "/proof/trench-mainline-01.webp",
    text: "They trenched the whole front yard and you couldn't tell a week later. Every head was adjusted before they left." },
  { name: "Dan K.", area: "Boynton Beach", stars: 5, service: "pump", photo: "/proof/pump-test-run.webp",
    text: "Old pump was losing prime every morning. Replaced in one visit and pressure is back on all six zones." },
  { name: "Renee T.", area: "Wellington", stars: 5, service: "landscape", photo: "/proof/backyard-bed-gravel-02.webp",
    text: "Asked for the beds to be cleaned up after the sprinkler work and they went further — gravel border, new mulch, edged." },
  { name: "Luis A.", area: "Delray Beach", stars: 5, service: "pump", photo: "/proof/goulds-pump-rebuild.webp",
    text: "Rebuilt the Goulds instead of pushing a new one on me. Honest, and it's been solid all summer." },
  { name: "Priya S.", area: "Delray Beach", stars: 4, service: "irrigation", photo: "/proof/trench-mainline-05.webp",
    text: "Scheduling took a few days but the install itself was clean and they put the sod back neatly." },
];
