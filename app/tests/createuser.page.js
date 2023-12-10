import { Selector } from 'testcafe';

class CreateUserPage {
// Define a test function for form submission with valid data
  async submitFormWithValidData(testController) {
    // Select form input fields
    const firstNameField = Selector('#firstNameField');
    const lastNameField = Selector('#lastNameField');
    const emailField = Selector('#emailField');
    const phoneField = Selector('#phoneField');
    const addressField = Selector('#addressField');
    const statusField = Selector('#statusField');
    // const submitButton = Selector('#submitButton');
    const submitButton = Selector('#submitButton');
    const spinner = Selector('#loadingSpinner');
    const successSwal = Selector('.swal-title').withText('Success');
    const swalOkButton = Selector('button').withText('OK');

    // Enter valid data into form fields
    await testController
      .typeText(firstNameField, 'John')
      .typeText(lastNameField, 'Doe')
      .typeText(emailField, 'johndoe@example.com')
      .typeText(phoneField, '808-123-4567')
      .typeText(addressField, '123 Main St')
      .click(statusField)
      .click(Selector('option').withText('Insured')); // Select a valid status option

    console.log('about to click submit button');
    // Click the submit button
    await testController.click('input[type="submit"]');
    console.log('have clicked submit button');

    console.log('waiting for swal to appear');
    // Wait for the success message to appear
    await testController.expect(successSwal.exists).ok({ timeout: 5000 });
    console.log('swal appears');

    console.log('clicking ok on swal');
    // Click the "OK" button on the success message
    await testController.click(swalOkButton);
    console.log('clicked ok on swal');
  }

  async submitFormWithInvalidData(testController) {
    // Select form input fields
    const firstNameField = Selector('#firstNameField');
    const lastNameField = Selector('#lastNameField');
    const emailField = Selector('#emailField');
    const phoneField = Selector('#phoneField');
    const addressField = Selector('#addressField');
    const statusField = Selector('#statusField');
    const submitButton = Selector('#submitButton');

    // Enter invalid data into form fields
    await testController
      .typeText(firstNameField, '12345') // Invalid first name
      .typeText(lastNameField, '') // Empty last name
      .typeText(emailField, 'invalid-email') // Invalid email
      .typeText(phoneField, '123') // Invalid phone number
      .typeText(addressField, '') // Empty address
      .click(statusField)
      .click(Selector('option').withText('Uninsured')); // Just as an example

    // Click the submit button
    await testController.click(submitButton);

    // Assertion for the presence of any error message
    const errorsField = Selector('#errorsField');
    await testController.expect(errorsField.innerText).ok();
  }
}

export const createUserPage = new CreateUserPage();
