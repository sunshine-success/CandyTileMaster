import { atom } from 'recoil';
import { getStorageValue, saveRecoilStateToStorage } from '../../../utils/storage';

const { savedValue, defaultValue, key } = getStorageValue('level-selector-selected-tab', 0);

export const selectedTabState = atom<number>({
	key: 'selectedTab',
	default: defaultValue,
	effects: [({ setSelf, onSet }) => saveRecoilStateToStorage(savedValue, key, setSelf, onSet)],
});
