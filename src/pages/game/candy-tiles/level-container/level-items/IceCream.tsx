import { useRef, useState, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { levelItemsState } from '../../store/levelItems';
import iceCreamSprite from './../../../../../assets/img/candies/ice-cream.png';
import useAudio from '../../../../../hooks/useAudio';
import useScore from '../../hooks/useScore';
import { levelTasksState } from '../../store/levelTasks';
import { LevelTasks } from '../../types';

type IceCreamProps = {
	id: string;
	index: number;
};

const IceCream = ({ id, index }: IceCreamProps) => {
	const [show, setShow] = useState(true);
	const elementRef = useRef<HTMLImageElement | null>(null);
	const itemUsedRef = useRef(false);
	const levelItems = useRecoilValue(levelItemsState);
	const playAudio = useAudio();
	const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
	const setLevelTasks = useSetRecoilState<LevelTasks>(levelTasksState);
	useScore(matched, index, 'IceCream');

	useEffectAfterMount(() => {
		matched && !itemUsedRef.current && onItemMatch();
	}, [levelItems]);

	const onItemMatch = () => {
		itemUsedRef.current = true;
		playAudio({ audioName: 'iceCreamMatch' });
		setShow(false);

		setLevelTasks((tasks) => ({
			...tasks,
			iceCreams: tasks.iceCreams + 1,
		}));
	};

	return (
		<img
			data-ice-cream
			ref={elementRef}
			src={iceCreamSprite}
			className="w-full h-full m-0 select-none pointer-events-none duration-200"
			style={{
				display: show ? 'block' : 'none',
			}}
		></img>
	);
};

export default IceCream;
