import anime from 'animejs';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import useAudio from '../../../../../hooks/useAudio';

const starLineStyle =
	'before:content-[""] before:absolute before:block before:h-[10px] before:w-[2px] before:bg-white/30 before:left-[45%] before:bottom-[100%]';

type Props = {
	elementId: string;
	positionX: number;
	targetPercentage: number;
	scorePercentage: number;
};

const animateStar = (elementId: string) => {
	anime({
		targets: [`#${elementId} > svg`],
		scale: [1, 2.3, 1],
		rotate: [360, 0],
		color: ['#a3a3a3', '#ffd21c'],
		easing: 'easeOutBack',
	});
};

const ScoreBarStar = ({ elementId, positionX, targetPercentage, scorePercentage }: Props) => {
	const [lit, setLit] = useState(false);
	const playAudio = useAudio();

	useEffect(() => {
		const percentagePast = scorePercentage >= targetPercentage;
		percentagePast && setLit(true);
	}, [scorePercentage]);

	useEffect(() => {
		lit && onLight();
	}, [lit]);

	const onLight = () => {
		animateStar(elementId);
		playAudio({ audioName: 'starScore' });
	};

	return (
		<span
			id={elementId}
			className={`absolute top-[115%] text-[#a3a3a3] ${starLineStyle}`}
			style={{
				left: `${positionX}%`,
			}}
		>
			<AiFillStar className='md:max-w-[12px] '></AiFillStar>
		</span>
	);
};

export default ScoreBarStar;
