import routes from '../routes';

import { post, deleteMethod } from '../utils/Provider';

export const deletePhoto = ({ id }, headers, mediaType) => {
  let route;

  switch (mediaType) {
  case 'portfolio': { route = routes.deletePortfolioPhoto; break; }
  case 'master': { route = routes.deleteMasterPhoto; break; }
  case 'certificate': { route = routes.deleteCertificatePhoto; break; }
  default: { break; }
  }

  return deleteMethod(route, null, headers, { id });
};

export const createPhoto = ({ mediaFileId, masterCardId }, headers, mediaType) => {
  let route;

  switch (mediaType) {
  case 'portfolio': { route = routes.createPortfolioPhoto; break; }
  case 'master': { route = routes.createMasterPhoto; break; }
  case 'certificate': { route = routes.createCertificatePhoto; break; }
  default: { break; }
  }

  const params = {
    data: {
      attributes: {
        master_card_id: masterCardId,
        media_file_id: mediaFileId,
      },
    },
  };

  return post(route, params, headers);
};
