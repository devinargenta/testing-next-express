import React from 'react';
import 'isomorphic-unfetch';

import Season from '../components/Season';
import Episode from '../components/Episode';

import { ScrollContainer } from '../components/InView';

const Home = ({ show }) => {
  if (!show) {
    return <div>error bb</div>;
  }
  const { episodes } = show._embedded;

  // group seasons { [season number]: [...episodes] }
  const seasons = episodes.reduce((prev, next) => {
    const nextSeason = next.season;
    prev[nextSeason] = prev[nextSeason] || [];
    prev[nextSeason].push(next);
    return prev;
  }, {});
  // keys 4 mappi
  const seasonsKeys = Object.keys(seasons);

  // build the seasons / episodes
  const seasonsReturn = seasonsKeys.map(season => (
    <Season season={season} key={season}>
      <ScrollContainer
        render={(state, inView) =>
          seasons[season].map(episode => (
            <Episode {...state} inView={inView} {...episode} key={episode.id} />
          ))
        }
      />
    </Season>
  ));

  return (
    <div className="main">
      <h1>{show.name}</h1>
      <div className="container">{seasonsReturn}</div>
      <style jsx global>{`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
        body {
          background: #f0f0f0;
          color: #f0f0f0;
          margin: 0;
          padding: 0;
          line-height: 1.4rem;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
      `}</style>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .main {
          padding: 20px;
          margin: 0;
        }
        h1 {
          margin: 0;
          padding: 18px;
          color: #151617;
          line-height: 1.9rem;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async ({ req, query: { q = 'futurama' } }) => {
  const API_URL = `http://api.tvmaze.com/singlesearch/shows?q=${q}&embed=episodes`;
  try {
    const data = await fetch(API_URL);
    const json = await data.json();
    return { show: json };
  } catch (e) {
    console.log(e);
    return { show: null };
  }
};

export default Home;
