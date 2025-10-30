import { Link, useLocation } from "react-router-dom";

const LABEL_OVERRIDES: Record<string, string> = {
  "o-colegio": "O Colégio",
  "nossa-estrutura": "Nossa Estrutura",
  "ensino": "Ensino",
  "ensino-medio": "Ensino Médio",
  "base-teorica-pedagogica": "Base Teórica Pedagógica",
  "atividades": "Atividades",
  "biblioteca": "Biblioteca",
  "contraturno": "Contraturno",
  "esporte": "Esporte",
};

function toTitle(label: string): string {
  const override = LABEL_OVERRIDES[label];
  if (override) return override;
  const words = label
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w));
  return words.join(" ");
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/") return null;

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((s) => decodeURIComponent(s));

  const items = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return { label: toTitle(seg), href, isLast: idx === segments.length - 1 };
  });

  return (
    <div className="breadcrumbs-container w-full flex justify-center items-center bg-gray-50 border-b border-gray-100 pt-4">
      <nav className="w-full max-w-[1200px] px-4 pb-2 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          </li>
          {items.map(({ label, href, isLast }) => (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">{label}</span>
              ) : (
                <Link to={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;


