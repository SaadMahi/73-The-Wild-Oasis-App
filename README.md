1. **Registration of the image field in the form:**
   Ensure that the form includes a field for the image.

2. **Handling the image upload in the `createCabin` function:**

   - Generate a unique image name.
   - Create an image path.
   - Upload the image to Supabase storage.

3. **Handling errors during the creation process:**
   If an error occurs during image upload:
   - Delete the cabin to maintain data integrity.
