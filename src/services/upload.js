import routes from '../routes';

export function uploadFile(fileData) {
  const data = new FormData();
  data.append('base_string', fileData);

  return fetch(routes.upload, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });
}
