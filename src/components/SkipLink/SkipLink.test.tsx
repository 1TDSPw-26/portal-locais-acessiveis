import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkipLink } from "./SkipLink";
import { describe, expect, it } from "vitest";

function setup(targetId = "conteudo") {
  render(
    <>
      <SkipLink targetId={targetId} />
      <button>Outro botão</button>
      <main id="conteudo">Conteúdo principal</main>
    </>
  );
}

describe("SkipLink", () => {
  it("é o primeiro elemento da ordem de foco", async () => {
    setup();
    await userEvent.tab();
    expect(
      screen.getByRole("link", { name: /pular para o conteúdo principal/i })
    ).toHaveFocus();
  });

  it("aponta para o ID recebido por props", () => {
    setup("conteudo");
    expect(screen.getByRole("link")).toHaveAttribute("href", "#conteudo");
  });

  it("move o foco para o alvo ao ativar com Enter", async () => {
    setup();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("não quebra quando o destino não existe", async () => {
    setup("id-inexistente");
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("link")).toBeInTheDocument();   
  });
});