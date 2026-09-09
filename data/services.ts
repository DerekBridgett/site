export type ServiceId = "irrigation" | "pump" | "landscape" | "lighting";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  description: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "irrigation",
    name: "Irrigation install & repair",
    short: "New zones, trenching, head replacement, and leak repair.",
    description:
      "From a single broken head to a full new system, we trench, plumb, and tune each zone so coverage is even and nothing sprays the sidewalk.",
    includes: ["New system design and install", "Zone trenching and mainline", "Valve box and manifold work", "Head replacement and coverage tuning", "Leak location and repair"],
  },
  {
    id: "pump",
    name: "Pump & well systems",
    short: "Replace, rebuild, and prime irrigation pumps on wells and lakes.",
    description:
      "A tired pump means weak pressure and dry patches. We replace or rebuild pumps, re-plumb the suction and discharge side, and test-run under load before we leave.",
    includes: ["Pump replacement (Goulds, Everbilt, and others)", "Suction and discharge re-plumbing", "Priming and pressure testing", "Check valve and shutoff installs"],
  },
  {
    id: "landscape",
    name: "Beds, borders & plantings",
    short: "Mulch beds, gravel borders, annuals, and cleanup after irrigation work.",
    description:
      "After the trenches are closed we put the yard back better than we found it: fresh mulch, defined bed edges, gravel borders, and seasonal color.",
    includes: ["Mulch and gravel beds", "Border and edging installs", "Seasonal annuals", "Post-install lawn restoration"],
  },
  {
    id: "lighting",
    name: "Landscape lighting",
    short: "Low-voltage path, uplight, and accent lighting.",
    description:
      "Low-voltage LED fixtures that highlight palms, entries, and walkways without running up the power bill. Wired on a timer or photocell so it just works.",
    includes: ["Path and step lights", "Palm and tree uplighting", "Transformer and timer setup", "Fixture replacement and repair"],
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
