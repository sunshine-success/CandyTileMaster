import { useSetRecoilState } from 'recoil';
import { toastListState } from '../store/toastList';
import { Toast } from '../types';

type CreateToastCallback = (options: Toast) => void;

export default (): CreateToastCallback => {
	const setToastList = useSetRecoilState(toastListState);

	return (options: Toast) => {
		setToastList((list) => {
			return [...list, options];
		});
	};
};
