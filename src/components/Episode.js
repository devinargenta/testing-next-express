const Episode = ({ name, summary, image = {} }) => {
	const imgUrl = image && image.medium;
	return (
		<li>
			<div className="desc" dangerouslySetInnerHTML={{ __html: summary }} />
			<span>{name}</span>
			<style jsx>{`
				span {
					font-weight: bold;
					position: relative;
					z-index: 2;
					color: #fff;
				}
				li {
					list-style: none;
					margin: 0;
					border-bottom: 2px solid #fff;
					padding: 5px 0;
					background-size: cover;
					min-height: ${imgUrl || summary ? '145px' : '40px'};
					flex-shrink: 0;
					background-color: #000;
					background-image: url(${imgUrl});
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 12px;
				}
				li:before {
					position: absolute;
					content: '';
					height: 100%;
					width: 100%;
					top: 0;
					left: 0;
					background: rgba(0, 0, 0, 0.25);
					transition: 0.3s ease-in-out;
				}
				li:hover:before {
					background: rgba(0, 0, 0, 0.75);
				}
				.desc {
					opacity: 0;
					font-size: 12px;
					color: #fff;
					position: relative;
					z-index: 1;
					transition: 0.25s ease-in-out;
				}
				li:hover .desc {
					opacity: 1;
				}
			`}</style>
		</li>
	);
};

export default Episode;
