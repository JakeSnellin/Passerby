export interface RawMenu {
  menu: {
    id: string;
    name: string;
    slug: string;
    menuItems: {
      nodes: MenuItem[];
    };
  };
}

export interface MenuItem {
  id: string;
  url: string;
  path: string;
  cssClasses: string[];
  label: string;
  parentId: string | null;
}

export interface Menu {
  id: string;
  name: string;
  slug: string;
  items: MenuItem[];
}
