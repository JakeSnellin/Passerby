export interface MenuItem {
  id: string;
  url: string;
  label: string;
}

export interface CustomLogo {
  id: string;
  url: string;
  alt: string;
}

export interface SiteInfo {
  headerMenuLabel: string;
  customLogo: CustomLogo | null;
  headerMenu: MenuItem[];
  footerMenu: MenuItem[];
}
