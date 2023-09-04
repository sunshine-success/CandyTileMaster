///<reference types="cypress" />
import { LoggedUserData } from './../../src/types/index';

Cypress.Commands.add('login', () => {
	const email = 'test@gmail.com';
	const password = 'test123';

	cy.session(email, () => {
		cy.visit('/levels');
		cy.get('[data-cy=login-button]').click();
		cy.get('input[name=signin-email]').type(email);
		cy.get('input[name=signin-password]').type(`${password}{enter}`, { log: false });

		cy.get('[data-cy=user-avatar-header-button]').should('exist');

		cy.then(() => {
			const loggedUser = JSON.parse(localStorage.getItem('logged-user')) as LoggedUserData | null;
			expect(loggedUser.auth?.aud).to.equal('authenticated');
		});
	});
});

Cypress.Commands.add('loginAndGoToMyLevels', (interceptLevelRequest = true) => {
	interceptLevelRequest &&
		cy
			.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json' })
			.as('myLevelsRequest');
	cy.visit('/levels');
	cy.login();
	cy.visit('/levels');
	cy.get('[data-cy=my-levels-tab-button]').click();
	interceptLevelRequest && cy.wait('@myLevelsRequest').then((interception) => interception);
});

Cypress.Commands.add('fillGridEditor', () => {
	cy.get('[data-cy=editor-element-button-Blue-candy').click();
	cy.get('[data-cy=grid-editor-item-slot]').each(($slot) => cy.wrap($slot).click({ force: true }));
});

Cypress.Commands.add('moveLevelCandies', (from, to) => {
	cy.get('[data-cy=level-tiles-grid]').children().eq(from).trigger('mousedown').trigger('mouseover');
	cy.get('[data-cy=level-tiles-grid]').children().eq(to).trigger('mouseover').trigger('mouseup', { force: true });
});

