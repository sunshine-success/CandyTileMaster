import { useRecoilState } from 'recoil';
import { showUserAuthDialogState } from '../store/showUserAuthenticationDialog';
import { Dialog, DialogContent, Tab, Tabs } from '@mui/material';
import SignInForm from './sign-in-form';
import { useState } from 'react';
import TabPanel from './TabPanel';
import SwipeableViews from 'react-swipeable-views';
import SignUpForm from './sign-up-form';
import { loggedUserState } from '../store/loggedUser';

const UserAuthDialog = () => {
	const [showUserAuthDialog, setShowUserAuthDialog] = useRecoilState(showUserAuthDialogState);
	const dialogOnClose = () => setShowUserAuthDialog(false);
	const [selectedTab, setSelectedTab] = useState(0);
	const loggedUser = useRecoilState(loggedUserState);

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

	return (
		<Dialog open={showUserAuthDialog && loggedUser !== null} onClose={dialogOnClose} fullWidth={true} maxWidth={'xs'} data-cy="auth-dialog">
			<DialogContent sx={{ overflow: 'visible' }}>
				<Tabs value={selectedTab} onChange={onTabChange} variant="fullWidth" sx={{ marginBottom: '14px' }}>
					<Tab label="Sign in"></Tab>
					<Tab label="Create account"></Tab>
				</Tabs>

				<SwipeableViews
					index={selectedTab}
					containerStyle={{
						transition: '0.35s ',
					}}
				>
					<TabPanel value={selectedTab} index={0}>
						<SignInForm onClose={dialogOnClose} />
					</TabPanel>
					<TabPanel value={selectedTab} index={1}>
						<SignUpForm onClose={dialogOnClose} />
					</TabPanel>
				</SwipeableViews>
			</DialogContent>
		</Dialog>
	);
};

export default UserAuthDialog;
