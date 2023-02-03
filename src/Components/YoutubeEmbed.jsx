import { string } from 'prop-types';

const ALLOW_PART_1 = 'accelerometer; autoplay; clipboard-write;';
const ALLOW_PART_2 = 'encrypted-media; gyroscope; picture-in-picture';

export default function YoutubeEmbed({ youtubeLink }) {
  const link = youtubeLink ? youtubeLink.replace('watch', 'embed') : '#';

  return (
    <div
      className="video-responsive"
      data-testid="video"
    >
      <iframe
        width="300"
        height="240"
        src={ link }
        frameBorder="0"
        allow={ `${ALLOW_PART_1} ${ALLOW_PART_2}` }
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

YoutubeEmbed.defaultProps = {
  youtubeLink: '#',
};

YoutubeEmbed.propTypes = {
  youtubeLink: string,
};
