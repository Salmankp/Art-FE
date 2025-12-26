import { PLAYER_MEDIA_URL } from '../../../utils/constants';

const NftIframe = ({ paintingId }: any) => {
  return (
    <iframe
      id="nf-view-frame"
      title={paintingId}
      className="nf-view-frame"
      height="100%"
      width="100%"
      frameBorder="0"
      src={`${PLAYER_MEDIA_URL}${paintingId}`}
    />
  );
};

export default NftIframe;
