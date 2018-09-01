import LazyBgImage from './LazyBgImage';

const Episode = ({ name, summary, image = {}, ...rest}) => {
  const imgUrl = image && image.medium;
  return (
    <div className="root">
    <LazyBgImage src={imgUrl} {...rest} className="episode">
      <div className="desc" dangerouslySetInnerHTML={{ __html: summary }} />
      <span>{name}</span>
    </LazyBgImage>
    <style jsx>{`
        span {
          font-weight: bold;
          position: relative;
          z-index: 2;
          color: #fff;
        }
        .root :global(.episode){
          list-style: none;
          margin: 0 0 12px 0;
          padding: 12px;
          background-size: cover;
          min-height: ${imgUrl || summary ? '160px' : '40px'};
          flex-grow: 1;
          flex-shrink: 0;
          background-color: #000;
          
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
        }
        .root :global(.episode):before {
          position: absolute;
          content: '';
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(to top, rgba(0,0,0,.5) 10%, rgba(0,0,0,0) 30%);
          transition: 0.3s ease-in-out;
        }
        .root :global(.episode):hover:before {
          background: linear-gradient(to top, rgba(0,0,0, .75) 20%, rgba(0,0,0,.75) 75%);
        }
        .desc {
          opacity: 0;
          font-size: 12px;
          color: #fff;
          position: relative;
          z-index: 1;
          transition: 0.3s ease-in-out;
        }
        .root :global(.episode):hover .desc {
          opacity: 1;
        }
        .desc :global(p) {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Episode;
