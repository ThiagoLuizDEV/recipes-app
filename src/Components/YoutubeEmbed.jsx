import { string } from 'prop-types';

const ALLOW_PART_1 = 'accelerometer; autoplay; clipboard-write;';
const ALLOW_PART_2 = 'encrypted-media; gyroscope; picture-in-picture';

export default function YoutubeEmbed({ embedId }) {
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${embedId}` }
        frameBorder="0"
        allow={ `${ALLOW_PART_1} ${ALLOW_PART_2}` }
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: string.isRequired,
};
