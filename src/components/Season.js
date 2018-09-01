
const Season = ({ season, children}) => {
  return (
    <div className="season-container">
      <h4> Season {season}</h4>
      {children}
      <style jsx>{`
        .season-container {
          display: flex;
          flex-direction: column;
          margin: 9px;
          border: 2px solid #151617;
          padding: 0px;
          border-radius: 3px;
          overflow: hidden;
        }
        h4 {
          padding: 18px;
          display: flex;
          flex-align: center;
          justify-content: center;
          flex-direction: column;
          margin: 0;
          background: #151617;;
        }
        .season-container :global(ul)  {
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          list-style: none;
          max-height: 400px;
          overflow: scroll;
        }
        @media (min-width: 35rem) {
          .season-container {
            flex-basis: calc(50% - 18px);
            flex-shrink: 0;
          }
        @media (min-width: 55rem) {
          .season-container {
            flex-basis: calc(33.33% - 18px);
          }
        }
        @media (min-width: 75rem) {
          .season-container {
            flex-basis: calc(25% - 18px);
          }
        }
      `}</style>
    </div>
  );
};

export default Season;
