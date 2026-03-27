module.exports = {
	types: [
		{ value: 'chore', name: 'chore:    Changes to auxiliary tools' },
		{ value: 'docs', name: 'docs:     Documentation only changes' },
		{
			value: 'feat',
			name: 'feat:     A new feature - to be used only for closing a ticket/issue'
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
		{ value: 'test', name: 'test:     CRUD-ding tests' },
		{ value: 'wip', name: 'wip:      Work in progress' }
	],

	scopes: [
		{ name: 'eva-server' },
		{ name: 'package/api-registry' },
		{ name: 'package/error-serializer' },
		{ name: 'package/framework-classes' },
		{ name: 'package/server-dependency-manager' },
		{ name: 'server/rest-api-server' },
		{ name: 'server/rest-api-server/baseclass' },
		{ name: 'server/rest-api-server/knex-migrations' },
		{ name: 'server/rest-api-server/context/masterdata' },
		{ name: 'server/rest-api-server/domain/user' },
		{
			name: 'server/rest-api-server/domain/user/context/session_manager'
		},
		{
			name: 'server/rest-api-server/domain/user/context/profile'
		},
		{ name: 'server/rest-api-server/domain/user/model' },
		{ name: 'server/rest-api-server/domain/user/template' },
		{ name: 'server/rest-api-server/surface/rest-api' },
		{ name: 'server/rest-api-server/repository/config' },
		{ name: 'server/rest-api-server/repository/audit' },
		{ name: 'server/rest-api-server/repository/auth' },
		{ name: 'server/rest-api-server/repository/cache' },
		{ name: 'server/rest-api-server/repository/logger' },
		{ name: 'server/rest-api-server/repository/message_i18n' },
		{ name: 'server/rest-api-server/repository/mongodb' },
		{ name: 'server/rest-api-server/repository/notification' },
		{ name: 'server/rest-api-server/repository/renderer' },
		{ name: 'server/rest-api-server/repository/sql_database' },
		{ name: 'server/rest-api-server/repository/translate' }
	],

	// it needs to match the value for field type. Eg.: 'fix'
	scopeOverrides: {
		chore: [
			{ name: 'ai-tooling' },
			{ name: 'build' },
			{ name: 'ci' },
			{ name: 'config' },
			{ name: 'deps' },
			{ name: 'release' },
			{ name: 'style/reformat' }
		]
	},

	// override the messages, defaults are as follows
	messages: {
		type: "Select the type of change that you're committing:",
		scope: '\nDenote the SCOPE of this change (optional):',
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
	ticketNumberTypes: ['feat', 'fix', 'refactor', 'perf', 'revert', 'test'],
	ticketNumberPrefix: '#',
	ticketNumberRegExp: '\\d{1,7}',

	fallbackTicketNumber: 0,

	usePreparedCommit: true // to re-use commit from ./.git/COMMIT_EDITMSG
};
