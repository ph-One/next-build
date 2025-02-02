const { test, expect } = require('@playwright/test')

test.describe('404 Error Page', () => {
  test('Displays the 404 Error page content', async ({ page }) => {
    test.setTimeout(30000)
    await page.goto('/404')

    await expect(page.locator('h3 >> nth=0')).toContainText(
      'Sorry — we can’t find that page'
    )
    await expect(
      page.locator(
        'p:has-text("Try the search box or one of the common questions below.")'
      )
    ).toBeVisible()

    await expect(page.locator('form#search_form')).toBeVisible()

    await expect(page.locator('.va-quicklinks--commpop')).toBeVisible()
  })

  test.skip('Should render without a11y accessibility errors', async ({
    page,
  }) => {
    await page.goto('/404')
  })
})
