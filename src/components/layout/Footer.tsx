import { Menu } from '@/types/layout';

export default function Header(menu: Menu) {
  const { id, name, slug, items } = menu;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}
