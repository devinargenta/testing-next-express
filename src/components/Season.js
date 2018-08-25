const Season = ({ szn, eps }) => {
	return (
		<div className="season-container">
			<h4> Season {szn}</h4>
			<ul>{eps}</ul>
			<style jsx>{`
				.season-container {
					display: flex;
					flex-direction: column;
					margin: 6px;
					border: 1px solid #00c;
					padding: 0px;
				}
				h4 {
					padding: 12px 12px;
					display: flex;
					flex-align: center;
					justify-content: center;
					flex-direction: column;
					margin: 0;
				}
				ul {
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
						flex-basis: calc(50% - 12px);
						flex-shrink: 0;
					}
				@media (min-width: 60rem) {
					.season-container {
						flex-basis: calc(33.33% - 12px);
					}
				}
			`}</style>
		</div>
	);
};

export default Season;
