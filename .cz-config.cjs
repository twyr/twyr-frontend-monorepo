module.exports = {
	types: [
		{
			value: 'chore',
			name: 'chore:    Repository maintenance, automation, or support work'
		},
		{ value: 'docs', name: 'docs:     Documentation only changes' },
		{
			value: 'feat',
			name: 'feat:     A new feature or capability'
		},
		{ value: 'fix', name: 'fix:      A bug fix' },
		{
			value: 'perf',
			name: 'perf:     A code change that improves performance'
		},
		{
			value: 'refactor',
			name: 'refactor: A code change that neither fixes a bug nor adds a feature'
		},
		{ value: 'revert', name: 'revert:   Revert to a commit' },
		{ value: 'test', name: 'test:     Add or update tests' },
		{ value: 'wip', name: 'wip:      Work in progress' }
	],

	scopes: [
		{ name: 'mobile-shell' },
		{ name: 'web-shell' },
		{ name: 'core' },
		{ name: 'design-system' },
		{ name: 'platform' },
		{ name: 'ui-composed' },
		{ name: 'ui-kit' },
		{ name: 'system-administrators-profile' },
		{ name: 'system-administrators-profile/bff' },
		{ name: 'system-administrators-profile/frontend' },
		{ name: 'system-administrators-profile/shared' },
		{ name: 'system-administrators-session-management' },
		{ name: 'system-administrators-session-management/bff' },
		{ name: 'system-administrators-session-management/frontend' },
		{ name: 'system-administrators-session-management/shared' },
		{ name: 'users-profile' },
		{ name: 'users-profile/bff' },
		{ name: 'users-profile/frontend' },
		{ name: 'users-profile/shared' },
		{ name: 'users-session-management' },
		{ name: 'users-session-management/bff' },
		{ name: 'users-session-management/frontend' },
		{ name: 'users-session-management/shared' }
	],

	// it needs to match the value for field type. Eg.: 'fix'
	scopeOverrides: {
		chore: [
			{ name: 'repo' },
			{ name: 'agents' },
			{ name: 'ai-workflow' },
			{ name: 'architecture' },
			{ name: 'build' },
			{ name: 'ci' },
			{ name: 'config' },
			{ name: 'deps' },
			{ name: 'release' },
			{ name: 'tooling' }
		]
	},

	// override the messages, defaults are as follows
	messages: {
		type: "Select the type of change that you're committing:",
		scope: '\nSelect the SCOPE of this change:',
		// used if allowCustomScopes is true
		customScope: 'Denote the SCOPE of this change:',
		subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
		body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: 'Are you sure you want to proceed with the commit above?'
	},

	allowCustomScopes: false,
	allowBreakingChanges: ['feat', 'fix', 'refactor', 'revert'],

	// limit subject length
	subjectLimit: 500,

	// skip any questions you want
	// skipQuestions: ['scope', 'body'],

	askForBreakingChangeFirst: false, // default is false
	breaklineChar: '|', // It is supported for fields body and footer.
	footerPrefix: 'ISSUES CLOSED: ',

	allowTicketNumber: true,
	isTicketNumberRequired: true,
	ticketNumberTypes: ['feat', 'fix', 'refactor', 'perf', 'test'],
	ticketNumberPrefix: '#',
	ticketNumberRegExp: '\\d{1,7}',

	fallbackTicketNumber: 0,

	usePreparedCommit: true // to re-use commit from ./.git/COMMIT_EDITMSG
};
