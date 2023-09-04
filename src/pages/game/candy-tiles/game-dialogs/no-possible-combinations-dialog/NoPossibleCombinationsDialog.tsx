import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useAudio from '../../../../../hooks/useAudio';
import { possibleCombinationsState } from '../../store/possibleCombinations';
import { levelCompleteState } from '../../store/levelComplete';
import CandyTilesDialog from '../CandyTilesDialog';
import GameOverActions from '../GameOverActions';

const NoPossibleCombinationsDialog = () => {
	const levelComplete = useRecoilValue(levelCompleteState);
	const possibleCombinations = useRecoilValue(possibleCombinationsState);
	const playAudio = useAudio();

	useEffect(() => {
		!possibleCombinations && onRanOutOfPossibleCombinations();
	}, [possibleCombinations]);

	const onRanOutOfPossibleCombinations = () => {
		playAudio({ audioName: 'gameOver', volume: 0.7 });
	};

	return !possibleCombinations && !levelComplete ? (
		<CandyTilesDialog>
			<div className="flex flex-col w-full items-center gap-[12px]" data-cy="no-moves-dialog">
				<div>
					<span className="m-auto font-YellowCandy text-[22px] block text-center text-p-light">No moves!</span>
					<span className="m-auto font-YellowCandy text-[18px] block text-center text-s-light">You ran out of possible combinations!</span>
				</div>
				<GameOverActions></GameOverActions>
			</div>
		</CandyTilesDialog>
	) : (
		<></>
	);
};

export default NoPossibleCombinationsDialog;
