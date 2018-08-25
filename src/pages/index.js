import React, { Component } from 'react';
import Season from '../components/Season';
import Episode from '../components/Episode';

import 'isomorphic-unfetch';

const Home = ({ show }) => {
  const { episodes } = show._embedded;

	// group seasons { [season number]: [...episodes] }
	const seasons = episodes.reduce((prev, next) => {
		prev[next.season] = prev[next.season] || [];
		prev[next.season].push(next);
		return prev;
	}, []);

	// keys 4 mappin
	const seasonsKeys = Object.keys(seasons);
	// build the seasons / episodes
	const seasonsRet = seasonsKeys.map(szn => (
		<Season
			szn={szn}
			eps={seasons[szn].map(ep => (
				<Episode {...ep} key={ep.id} />
			))}
		/>
	));

	return (
		<div className="container">
			{seasonsRet}
			<style jsx global>{`
				*,
				*:before,
				*:after {
					box-sizing: border-box;
				}
				body {
					margin: 0;
					padding: 0;
					line-height: 1.2em;
					font-size: 16px;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
						Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
						'Segoe UI Symbol';
				}
			`}</style>
			<style jsx>{`
				.container {
					padding: 12px;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
				}
			`}</style>
		</div>
	);
};

Home.getInitialProps = async ({ req }) => {
	if (req) {
		const data = await fetch(
			'http://api.tvmaze.com/singlesearch/shows?q=king%20%of%20the%20hill&embed=episodes'
		);
		const json = await data.json();
		return { show: json };
	}
};

export default Home;
