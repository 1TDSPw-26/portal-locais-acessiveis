import footerLogo from "../../assets/logo-footer.svg";
import { Link, NavLink } from "react-router-dom";

const footerNavigation = [
  { label: "Início", path: "/" },
  { label: "Locais", path: "/locais" },
  { label: "Cadastrar local", path: "/cadastrar" },
  { label: "Sobre", path: "/sobre" },
];

const projectLinks = [
  { label: "Sobre o portal", path: "/*" },
  { label: "Acessibilidade", path: "/acessibilidade" },
  { label: "Informações do projeto", path: "/*" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-footer grid grid-cols-[minmax(250px,1.8fr)_repeat(3,minmax(150px,1fr))] gap-[clamp(40px,6vw,96px)] px-[clamp(32px,5vw,68px)] pt-11 pb-14.5 text-white max-[820px]:grid-cols-2 max-[520px]:grid-cols-1 max-[520px]:gap-8.5 max-[520px]:px-6 max-[520px]:pt-10 max-[520px]:pb-12">
      <div>
        <Link
          to="/"
          className="flex w-max items-center gap-2.5 text-lg font-bold text-white"
        >
          <img
            className="size-9 shrink-0"
            src={footerLogo}
            alt="Logo do AcessoLocal"
          />
          <span>AcessoLocal</span>
        </Link>
        <p className="mt-3.5 max-w-80 text-xs leading-[1.55]">
          Portal colaborativo que reúne informações de acessibilidade para
          ampliar autonomia e participação.
        </p>
      </div>

      <FooterLinks title="Navegação" links={footerNavigation} />
      <FooterLinks title="Projeto" links={projectLinks} />

      <section aria-labelledby="footer-institucional">
        <h2
          className="mt-1 mb-4 text-[15px] leading-tight font-bold"
          id="footer-institucional"
        >
          Institucional
        </h2>
        <p className="mt-3.5 text-xs leading-[1.55]">
          Projeto acadêmico - FIAP
          <br />
          2º semestre de ADS - 2026
        </p>
      </section>
    </footer>
  );
}

type FooterLinksProps = {
  title: string;
  links: { label: string; path: string }[];
};

function FooterLinks({ title, links }: FooterLinksProps) {
  const titleId = `footer-${title.toLowerCase()}`;

  return (
    <nav aria-labelledby={titleId}>
      <h2
        className="mt-1 mb-4 text-[15px] leading-tight font-bold"
        id={titleId}
      >
        {title}
      </h2>
      <ul className="grid list-none gap-2.5 p-0">
        {links.map(({ label, path }) => (
          <li key={label}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `text-xs text-white underline-offset-4 hover:underline ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
