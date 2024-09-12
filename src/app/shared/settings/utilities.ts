export function showLoader(mode = true): any {
  if (mode) {
    document.getElementById('loader')?.classList.remove('hide');
  } else {
    document.getElementById('loader')?.classList.add('hide');
  }
}

export function descargarDocumento(b: Blob, extension = '.xlsx', nombre: string = new Date().toISOString() ) {
  const fileURL = URL.createObjectURL(b);
  const link = document.createElement('a');
  link.download = nombre + extension;
  link.href = fileURL;
  document.body.appendChild(link);
  link.click();
  setTimeout(function () {
    document.body.removeChild(link);
  }, 10000);
  return;
}