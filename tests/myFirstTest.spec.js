import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('main').click();
  await page.getByRole('button', { name: 'Наверх' }).click();
  await page
    .getByRole('navigation')
    .filter({ hasText: /^$/ })
    .locator('path')
    .nth(1)
    .click();
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await page.getByRole('button', { name: 'Войти как гость' }).click();
  await page.getByText('Ошибка при гостевом входе. Попробуйте позже').click();
  await page.getByText('Ошибка проверки капчи').click();
});
