import { Grid } from '@mui/material';
import { MAIN_LEVELS_COUNT } from '../../../config';
import useCompletedLevels from '../../../hooks/useCompletedLevels';
import SelectLevelButton from './SelectLevelButton';

const MainLevelsTab = () => {
	const completedLevels = useCompletedLevels();

	return (
		<Grid container columns={{ xs: 3, sm: 6, md: 10 }} spacing={1} padding={2} data-cy="main-levels-tab">
			{new Array(MAIN_LEVELS_COUNT).fill(0).map((x, index) => {
				const levelAvaliable = index === 0 || completedLevels.main.some((x) => x.id === index);
				const stars = completedLevels.main.find((x) => x.id === index + 1)?.stars || 0;
				return (
					<Grid item xs={1} key={index}>
						<SelectLevelButton locked={!levelAvaliable} stars={stars} levelId={index + 1} />{' '}
					</Grid>
				);
			})}
		</Grid>
	);
};

export default MainLevelsTab;
