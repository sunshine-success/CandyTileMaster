import { Dialog, DialogContent, DialogTitle, Slider } from '@mui/material';
import { showVolumeDialogState } from './store/showVolumeDialog';
import { useRecoilState } from 'recoil';
import { MdVolumeDown, MdVolumeUp } from 'react-icons/md';
import { gameVolumeState } from './../../store/gameVolume';
import { useMemo } from 'react';
import { blueGrey } from '@mui/material/colors';

const VolumeDialog = () => {
	const [showVolumeDialog, setShowVolumeDialog] = useRecoilState(showVolumeDialogState);
	const [gameVolume, setGameVolume] = useRecoilState(gameVolumeState);
	const handleClose = () => setShowVolumeDialog(false);
	const initialValue = useMemo(() => Math.floor(gameVolume * 100), [showVolumeDialog]);

	const handleSliderChange = (e: Event, newValue: number | number[]) => setGameVolume((newValue as number) / 100);

	return (
		<Dialog open={showVolumeDialog} onClose={handleClose} fullWidth={true} maxWidth={'xs'} data-cy="adjust-volume-dialog">
			<DialogTitle>Volume</DialogTitle>
			<DialogContent sx={{ overflow: 'visible' }}>
				<div className="flex gap-x-[16px] items-center mt-[12px]" style={{ color: blueGrey[600] }}>
					<MdVolumeDown size={24} className="min-w-[24px]"></MdVolumeDown>
					<Slider
						key={showVolumeDialog.toString()}
						min={0}
						max={100}
						defaultValue={initialValue}
						onChange={handleSliderChange}
						valueLabelDisplay="auto"
					></Slider>
					<MdVolumeUp size={24} className="min-w-[24px]"></MdVolumeUp>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default VolumeDialog;
