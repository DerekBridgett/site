export type NavItem = { href: string; label: string };

/** Site nav, shared by Header (desktop + mobile) and Footer so the three
 *  lists can't drift apart. */
export const nav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/reviews", label: "Reviews" },
];
