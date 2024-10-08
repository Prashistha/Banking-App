import { test, expect } from '@playwright/test';

test.describe('Sign-Up Page', () => {
  
  // 1. Basic Sign-Up Page Load Test
  test('should load the sign-up page', async ({ page }) => {
    await page.goto('/sign-up'); // Update this path if needed

    // Check if the "Sign Up" header is visible
    const header = page.locator('h1:has-text("Sign Up")');
    await expect(header).toBeVisible();

    await expect(page.getByLabel('First Name')).toBeVisible();  // Targets the input with label 'First Name'
    await expect(page.getByLabel('Last Name')).toBeVisible();   // Targets the input with label 'Last Name'
    
    await expect(page.locator('input[placeholder="Enter your city"]')).toBeVisible();
    await expect(page.locator('input[placeholder="YYYY-MM-DD"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();
  });

  // 2. Validation Error Test: Ensure required fields throw an error if empty
  test('should show validation errors for required fields', async ({ page }) => {
    await page.goto('/sign-up');

    // Try submitting the form with empty fields
    await page.click('button:has-text("Sign Up")');

    // Verify validation error messages
  // Check visibility of validation messages for required fields
await expect(page.locator('input[placeholder="Enter your first name"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Enter your last name"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Enter your specific address"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Enter your city"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Example: NY"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Example: 11101"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="YYYY-MM-DD"]').locator('..').locator('.form-message')).toHaveText('Required');
await expect(page.locator('input[placeholder="Example: 1234"]').locator('..').locator('.form-message')).toHaveText('Required');


  });

  // 3. Validation Error Test: Email and Password formats
  test('should show validation error for invalid email and password formats', async ({ page }) => {
    await page.goto('/sign-up');

    // Enter invalid email and password
    await page.fill('input[placeholder="Enter your email"]', 'Invalid email');
    await page.fill('input[placeholder="Enter your password"]', 'short');

    // Submit the form
    await page.click('button:has-text("Sign Up")');

    // Verify validation error messages
    await expect(page.locator('text=Invalid email')).toBeVisible();
    await expect(page.locator('text=String must contain at least 8 character(s)')).toBeVisible();
  });

  // 4. Successful Form Submission Test
  test('should successfully submit the form with valid data', async ({browserName,  page }) => {
    if (browserName === 'firefox' || browserName === 'webkit') {
      test.skip();  // Skip for Firefox and WebKit
    }
    await page.goto('/sign-up');

    // Fill in the form with valid data
    await page.fill('input[placeholder="Enter your first name"]', 'Nihar');
    await page.fill('input[placeholder="Enter your last name"]', 'Dani');
    await page.fill('input[placeholder="Enter your specific address"]', '123 Main St');
    await page.fill('input[placeholder="Enter your city"]', 'New York');
    await page.fill('input[placeholder="Example: NY"]', 'NY');
    await page.fill('input[placeholder="Example: 11101"]', '14292');
    await page.fill('input[placeholder="YYYY-MM-DD"]', '1990-10-23');
    await page.fill('input[placeholder="Example: 1234"]', '1234');
    await page.fill('input[placeholder="Enter your email"]', 'niharphansalkar@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'securePassword123');

    await page.click('button:has-text("Sign Up")');



    // Ensure that we are now on the "Link Account" page by checking for the "Connect bank" button
    await expect(page.locator('button:has-text("Connect bank")')).toBeVisible();

    // Interact with the "Link Account" page
    await page.click('button:has-text("Connect bank")');
  });

  // 5. Link to Sign-In Page Test
  test('should navigate to sign-in page when "Sign in" link is clicked', async ({ page }) => {
    await page.goto('/sign-up');

    // Click on the "Sign in" link
    const signInLink = page.locator('a:has-text("Sign in")');
    await signInLink.click();

    // Wait for the sign-in page to load
    await page.waitForURL('/sign-in');
    
    // Verify the URL or heading of the sign-in page
    await expect(page).toHaveURL('/sign-in');
  });

});
