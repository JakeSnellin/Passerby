import { Menu } from '@/types/layout';
import TransitionLink from '@/components/TransitionLink';

export default function Header(menu: Menu) {
  const { slug, items } = menu;

  return (
    <ul className={slug}>
      {items.map((item) => (
        <li key={item.id}>
          <TransitionLink href={item.path}>{item.label}</TransitionLink>
        </li>
      ))}
    </ul>
  );
}
