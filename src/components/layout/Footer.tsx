import { CustomLogo, MenuItem } from '@/types/layout';
import TransitionLink from '@/components/TransitionLink';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  customLogo: CustomLogo | null;
  menu: MenuItem[];
  titleText: string;
}

export default function Footer({ customLogo, menu, titleText }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <button className="back-to-top">
          <span className="back-to-top__label">Back to top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="21"
            viewBox="0 0 8 21"
            fill="none"
            className="back-to-top__icon"
          >
            <path
              d="M4.35355 0.646446C4.15829 0.451185 3.84171 0.451185 3.64645 0.646446L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646446ZM4 21L4.5 21L4.5 1L4 1L3.5 1L3.5 21L4 21Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="site-footer__content-inner">
          <Link href="/">
            {customLogo && (
              <Image
                src={customLogo.url}
                alt={customLogo.alt ?? 'Site logo'}
                width={47}
                height={52}
                priority
                className="site-footer__logo"
              />
            )}
          </Link>
          <h1 className="site-footer__logo-title">{titleText}</h1>
          <nav className="site-footer__nav">
            <ul className="site-footer__list">
              {menu.map((item) => (
                <li key={item.id}>
                  <TransitionLink className="site-footer__link" href={item.url}>
                    <div className="site-footer__link-text-wrapper">
                      <span aria-hidden="true" className="header-bar__link-text--new">
                        {item.label}
                      </span>
                      <span className="site-footer__link-text--old">{item.label}</span>
                    </div>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="social-icons">
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M8.96433 1H4.03554C2.36174 1 1 2.36181 1 4.0356V8.9644C1 10.6383 2.36174 12 4.03554 12H8.96433C10.6383 12 12 10.6382 12 8.9644V4.0356C12.0001 2.36181 10.6383 1 8.96433 1ZM11.0241 8.9644C11.0241 10.1001 10.1001 11.024 8.9644 11.024H4.03554C2.89989 11.0241 1.97597 10.1001 1.97597 8.9644V4.0356C1.97597 2.89996 2.89989 1.97597 4.03554 1.97597H8.96433C10.1 1.97597 11.024 2.89996 11.024 4.0356L11.0241 8.9644Z"
                  fill="black"
                />
                <path
                  d="M6.49946 3.66406C4.93654 3.66406 3.66504 4.93556 3.66504 6.49848C3.66504 8.06134 4.93654 9.33278 6.49946 9.33278C8.06238 9.33278 9.33388 8.06134 9.33388 6.49848C9.33388 4.93556 8.06238 3.66406 6.49946 3.66406ZM6.49946 8.35674C5.47475 8.35674 4.64101 7.52313 4.64101 6.49842C4.64101 5.47365 5.47469 4.63997 6.49946 4.63997C7.52423 4.63997 8.35791 5.47365 8.35791 6.49842C8.35791 7.52313 7.52417 8.35674 6.49946 8.35674Z"
                  fill="black"
                />
                <path
                  d="M9.45302 2.83984C9.26498 2.83984 9.08026 2.91597 8.94746 3.04935C8.81402 3.18209 8.7373 3.36687 8.7373 3.55556C8.7373 3.74366 8.81408 3.92838 8.94746 4.06176C9.0802 4.19449 9.26498 4.27127 9.45302 4.27127C9.64171 4.27127 9.82584 4.19449 9.95922 4.06176C10.0926 3.92838 10.1687 3.7436 10.1687 3.55556C10.1687 3.36687 10.0926 3.18209 9.95922 3.04935C9.82649 2.91597 9.64171 2.83984 9.45302 2.83984Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M8.88631 12.0008V7.21338C8.88631 6.96232 8.85257 6.75201 8.7474 6.61144C8.64647 6.47654 8.46926 6.39778 8.17589 6.39778C7.2263 6.39778 6.98885 7.11758 6.95824 7.22688V12.0008L4.56934 12.0008V4.20703H6.95824V4.82405C7.11807 4.72023 7.33049 4.59982 7.58945 4.49346C7.96819 4.33793 8.44595 4.21238 9.00333 4.21238C9.44789 4.21238 10.1794 4.371 10.6942 5.07492C11.0325 5.53747 11.2756 6.23485 11.2756 7.27649V12.0008L8.88631 12.0008Z"
                  fill="black"
                />
                <path
                  d="M2.19759 3.26381C1.88595 3.26381 1.60336 3.13687 1.39872 2.93114C1.19465 2.726 1.06836 2.44276 1.06836 2.12923C1.06836 1.81753 1.19486 1.53525 1.39921 1.3309C1.60363 1.12648 1.886 1 2.19759 1L2.1985 1.00046C2.51025 1.00345 2.79222 1.13104 2.99601 1.33482C3.20037 1.53919 3.3268 1.82016 3.3268 2.12923C3.3268 2.4428 3.20057 2.72608 2.9965 2.93124C2.79191 3.13691 2.50936 3.26381 2.19759 3.26381Z"
                  fill="black"
                />
                <path d="M1 12.0008V4.20703H3.39617V12.0008H1Z" fill="black" />
              </svg>
            </Link>
          </div>
          <div className="legal">
            <ul className="legal__links">
              <li>
                <Link href="#">Terms</Link>{' '}
              </li>
              <li>
                <Link href="#">Privacy</Link>
              </li>
              <li>
                <Link href="#">Cookies</Link>
              </li>
            </ul>
            <p className="legal__copy">© 2022 Lowein-Levy Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
