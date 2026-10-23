import { expect, locaisExclusao, test } from './fixtures/exclusao'

const [localSelecionado, outroLocal] = locaisExclusao

test('cancelar a exclusão mantém o local e não grava alterações', async ({
  page,
  exclusao,
}) => {
  await page.goto('/locais')

  const cartao = page.getByRole('article', { name: localSelecionado.nome })
  await cartao
    .getByRole('button', { name: `Excluir ${localSelecionado.nome}` })
    .click()

  const dialogo = page.getByRole('dialog', { name: 'Excluir local?' })
  await expect(dialogo).toBeVisible()
  await expect(dialogo).toContainText(localSelecionado.nome)
  await expect(dialogo.getByRole('button', { name: 'Cancelar' })).toBeFocused()

  await dialogo.getByRole('button', { name: 'Cancelar' }).click()

  await expect(dialogo).toBeHidden()
  await expect(
    page.getByRole('list', { name: 'Lista de locais, página 1 de 1' }),
  ).toBeVisible()
  await expect(cartao).toBeVisible()
  await expect(
    page.getByRole('article', { name: outroLocal.nome }),
  ).toBeVisible()
  expect(await exclusao.quantidadeDeGravacoes()).toBe(0)
  expect(await exclusao.locaisPersistidos()).toEqual(locaisExclusao)
})

test('confirmar a exclusão remove somente o local selecionado', async ({
  page,
  exclusao,
}) => {
  await page.goto('/locais')

  const cartao = page.getByRole('article', { name: localSelecionado.nome })
  await cartao
    .getByRole('button', { name: `Excluir ${localSelecionado.nome}` })
    .click()

  const dialogo = page.getByRole('dialog', { name: 'Excluir local?' })
  await expect(dialogo).toBeVisible()
  await dialogo.getByRole('button', { name: 'Excluir' }).click()

  await expect(
    page
      .getByRole('status')
      .filter({
        hasText: `Local "${localSelecionado.nome}" excluído com sucesso.`,
      }),
  ).toBeVisible()
  await expect(dialogo).toBeHidden()
  await expect(
    page.getByRole('list', { name: 'Lista de locais, página 1 de 1' }),
  ).toBeVisible()
  await expect(
    page.getByRole('article', { name: localSelecionado.nome }),
  ).toHaveCount(0)
  await expect(
    page.getByRole('article', { name: outroLocal.nome }),
  ).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: '1 local encontrado' }))
    .toBeVisible()

  expect(await exclusao.quantidadeDeGravacoes()).toBe(1)
  expect(await exclusao.locaisPersistidos()).toEqual([outroLocal])
})

test('falha ao excluir informa o erro e mantém os locais na listagem', async ({
  page,
  exclusao,
}) => {
  await page.goto('/locais')
  await exclusao.falharProximaGravacao()

  const cartao = page.getByRole('article', { name: localSelecionado.nome })
  await cartao
    .getByRole('button', { name: `Excluir ${localSelecionado.nome}` })
    .click()

  const dialogo = page.getByRole('dialog', { name: 'Excluir local?' })
  await expect(dialogo).toBeVisible()
  await dialogo.getByRole('button', { name: 'Excluir' }).click()

  await expect(
    page
      .getByRole('status')
      .filter({ hasText: `Não foi possível excluir "${localSelecionado.nome}".` }),
  ).toBeVisible()
  await expect(dialogo).toBeHidden()
  await expect(
    page.getByRole('list', { name: 'Lista de locais, página 1 de 1' }),
  ).toBeVisible()
  await expect(cartao).toBeVisible()
  await expect(
    page.getByRole('article', { name: outroLocal.nome }),
  ).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: '2 locais encontrados' }))
    .toBeVisible()

  expect(await exclusao.quantidadeDeGravacoes()).toBe(1)
  expect(await exclusao.locaisPersistidos()).toEqual(locaisExclusao)
})