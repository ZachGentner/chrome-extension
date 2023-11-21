const upload = document.getElementById('upload');

upload.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = upload.querySelector('input');
  if (input.files.length) {
    const file = input.files[0];
    checkFile(file);
  } else {
    alert('Please select a file for upload.');
  }
});

export default function checkFile(file) {
  const fileName = file.name.slice('.');
  const fileExt = fileName.slice(fileName.indexOf('.') + 1);

  if (fileExt !== 'ged') {
    alert('Please select a GEDCOM file with a .ged extension.');
  }

  console.log(file);
  return file;
}
