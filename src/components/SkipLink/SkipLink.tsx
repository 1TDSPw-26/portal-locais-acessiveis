import type { MouseEvent } from "react";

type SkipLinkProps = {
  targetId: string;
  children?: string;
};

export function SkipLink({
  targetId,
  children = "Pular para o conteúdo principal",
}: SkipLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    target.focus();
    target.scrollIntoView();
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="
        absolute left-0 top-0 z-[1000]
        -translate-y-full focus:translate-y-0
        bg-black px-4 py-3 text-base text-white no-underline
        focus:outline focus:outline-[3px] focus:outline-offset-2 focus:outline-[#ffd400]
      "
    >
      {children}
    </a>
  );
}