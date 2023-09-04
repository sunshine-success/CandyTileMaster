import uuid from 'react-uuid';
import { Chocolate, LevelItem, MatchDetail, SuperCandy } from '../candy-tiles/types';

export const getLevelItemByFusion = (matchDetail: MatchDetail, itemToFuse: LevelItem): LevelItem => {
	let item: LevelItem = null;
	const itemIsACandy = itemToFuse?.type === 'Candy' || itemToFuse?.type === 'SuperCandy';
	if (!itemIsACandy) return null;

	const superCandyFusion = matchDetail.left + matchDetail.right > 2 || matchDetail.down + matchDetail.up > 2;
	const chocolateFusion =
		[matchDetail.up, matchDetail.left, matchDetail.right, matchDetail.down].filter(x => x > 1).reduce((acc, curr) => acc + curr, 0) > 3;

	if (superCandyFusion) {
		item = {
			color: itemToFuse?.color,
			type: 'SuperCandy',
			id: uuid(),
		} as SuperCandy;
	}

	if (chocolateFusion) {
		item = {
			type: 'Chocolate',
			id: uuid(),
		} as Chocolate;
	}

	return item;
};
