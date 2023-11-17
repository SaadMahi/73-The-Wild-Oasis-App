# CreateCabinForm Component

This is a React component named `CreateCabinForm` that utilizes the `react-hook-form` library for handling form state and validation. Here's a breakdown of the key features and functionality:

## 1. Form Setup:

- The component imports necessary dependencies, including styled components, form-related UI components (`Input`, `Form`, `Button`, `FileInput`, `Textarea`), and hooks from `react-hook-form` and `@tanstack/react-query`.
- It defines the form structure using these imported components and sets up the form using the `useForm` hook from `react-hook-form`.

## 2. Validation:

- The component performs form validation using the `register` method from `react-hook-form`.
- Validation rules, such as `required` and `min`, are applied to various form fields, ensuring that the user provides valid input.
- Custom validation is implemented for the "Discount" field, where the discount value must be less than or equal to the regular price.

## 3. Form Submission:

- The component uses the `handleSubmit` function from `react-hook-form` to handle form submissions.
- The `onSubmit` function is called when the form is successfully submitted. It triggers a mutation using `useMutation` from `@tanstack/react-query`, which, upon success, displays a success toast, invalidates the query for cabin data, and resets the form.
- The `onError` function handles errors during form submission, displaying an error toast.

## 4. Error Handling:

- Form errors are extracted from the `formState` object, and error messages are displayed for each corresponding input field using the `FormRow` component.
- The `error` prop in each `FormRow` is populated with the specific error message for that field.

## 5. Reusable Components:

- The code emphasizes reusability by using a custom `FormRow` component for each form field. This helps reduce code duplication and improves maintainability.

## 6. UI Interaction:

- The form includes buttons for submitting and canceling the form. The "Add Cabin" button is disabled during form submission (`isCreating` state) to prevent multiple submissions.

## 7. Console Logging:

- There are console log statements for debugging purposes, such as logging the `regularPrice` value and commented-out logs for errors during form submission.

Overall, this component provides a structured and reusable form implementation with integrated validation and error handling using `react-hook-form`.
