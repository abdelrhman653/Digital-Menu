// Shared Firebase Storage helper.
// The actual authorization is enforced by Firebase Storage Rules.
export async function uploadRestaurantFile(file, restaurantId, folder = 'uploads') {
  if (!file || !restaurantId || !window.FB?.storage) return '';
  const safeName = String(file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileRef = window.FB.ref(
    window.FB.storage,
    `${folder}/${restaurantId}_${Date.now()}_${safeName}`
  );
  await window.FB.uploadBytes(fileRef, file);
  return await window.FB.getDownloadURL(fileRef);
}

window.uploadRestaurantFile = uploadRestaurantFile;
