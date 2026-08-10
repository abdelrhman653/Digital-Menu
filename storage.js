/*
 * Image preparation helper.
 * Images are resized in the browser before the admin page uploads them
 * to Firebase Storage. The helper keeps the existing file-picker API intact.
 */
(function () {
  function fileToDataURL(file, options) {
    options = options || {};
    if (!file) return Promise.resolve('');

    const maxSize = Number(options.maxSize || 600);
    const quality = Number(options.quality || 0.55);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('تعذر قراءة الصورة.'));
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          if (!w || !h) return reject(new Error('الصورة غير صالحة.'));

          const scale = Math.min(1, maxSize / Math.max(w, h));
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d', { alpha: false });
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('تعذر معالجة الصورة.'));
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  window.fileToDataURL = fileToDataURL;
})();
