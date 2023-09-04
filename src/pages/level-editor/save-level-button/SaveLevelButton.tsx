import { MdSave } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useToast from '../../../hooks/useToast';
import createLevelData from '../createLevelData';
import validateLevel from './validateLevel';
import { levelDataEditorState } from '../store/levelDataEditor';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { uploadLevel, UploadLevelData } from '../../../api/levels';
import { showUserAuthDialogState } from '../../../store/showUserAuthenticationDialog';
import { LevelFile, LevelRules } from '../../../types';
import useLoggedUser from '../../../hooks/useLoggedUser';

const SaveLevelButton = () => {
	const levelDataEditor = useRecoilValue(levelDataEditorState);
	const loggedUser = useLoggedUser();
	const setShowUserAuthDialog = useSetRecoilState(showUserAuthDialogState);
	const toast = useToast();
	const validateLevelMutation = useMutation(
		(data: { levelData: LevelFile; levelRules: LevelRules }) => validateLevel(data.levelData, data.levelRules),
		{
			onSuccess: (data) => {
				if (data.valid) {
					onLevelValidationSuccess();
					return;
				}
				onLevelValidationFailed(data.messages);
			},
		},
	);

	const uploadLevelMutation = useMutation((data: UploadLevelData) => uploadLevel(data), {
		onSuccess: (data) => {
			if (data?.error) {
				onUploadLevelError();
				return;
			}
			toast({ message: 'Level saved!', severity: 'success', durationMs: 5000 });
		},
		onError: () => onUploadLevelError(),
	});

	const onUploadLevelError = () => toast({ message: 'Something went wrong. Please try again.', severity: 'error', durationMs: 5000 });
	const onLevelValidationFailed = (failMessages: string[]) => {
		failMessages.forEach((x) => toast({ severity: 'error', message: x, durationMs: 3000 }));
	};

	const onLevelValidationSuccess = () => {
		uploadLevelMutation.mutate({
			userId: loggedUser?.auth.id || '',
			levelTitle: levelDataEditor.levelTitle.trim(),
			levelJson: JSON.stringify(createLevelData(levelDataEditor)),
		});
	};

	const handleClick = () => {
		loggedUser ? saveLevel() : setShowUserAuthDialog(true);
	};

	const saveLevel = () => {
		const levelData = createLevelData(levelDataEditor);
		validateLevelMutation.mutate({ levelData, levelRules: levelDataEditor.levelRules });
	};

	return (
		<LoadingButton
			data-cy="level-editor-save-button"
			onClick={handleClick}
			startIcon={<MdSave />}
			loadingPosition="start"
			loading={uploadLevelMutation.isLoading || validateLevelMutation.isLoading}
			sx={{ fontWeight: 'bolder', marginLeft: 'auto' }}
			variant="contained"
			size="small"
			disableElevation
		>
			Save
		</LoadingButton>
	);
};

export default SaveLevelButton;
