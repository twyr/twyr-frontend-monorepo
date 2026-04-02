export const enINTranslation = {
	common: {
		appName: 'Twyr',
		actions: {
			add: 'Add',
			apply: 'Apply',
			back: 'Back',
			cancel: 'Cancel',
			continue: 'Continue',
			createProfile: 'Create profile',
			dashboard: 'Dashboard',
			deselect: 'Deselect',
			generateOtp: 'Generate OTP',
			login: 'Login',
			logout: 'Logout',
			makePrimary: 'Make Primary',
			next: 'Next',
			previous: 'Previous',
			profile: 'Profile',
			review: 'Review',
			save: 'Save',
			search: 'Search actions...',
			useToday: 'Use today',
			validateOtp: 'Validate OTP'
		},
		labels: {
			actions: 'Actions',
			availableLocales: 'Available locales',
			contacts: 'Contacts',
			country: 'Country',
			dateOfBirth: 'Date of birth',
			demographics: 'Demographics',
			firstName: 'First name',
			gender: 'Gender',
			language: 'Language',
			lastName: 'Last name',
			locales: 'Locales',
			middleNames: 'Middle names',
			mobileNumber: 'Mobile number',
			name: 'Name',
			names: 'Names',
			nickname: 'Nickname',
			phone: 'Phone',
			review: 'Review',
			workspace: 'Workspace'
		},
		messages: {
			authenticatedWorkspace: 'Authenticated workspace',
			profileLoadedFailed: 'Unable to load the profile.',
			sessionConfirmationFailed:
				'Unable to confirm the authenticated session.'
		},
		placeholders: {
			contactType: 'Select a contact type',
			contactValue: 'Enter the contact value',
			country: 'Select country',
			date: 'Select a date',
			day: 'Day',
			gender: 'Select a gender',
			language: 'Select language',
			month: 'Month',
			mobileNumber: 'Mobile number',
			nickname: 'Nickname',
			otp: 'Enter OTP',
			validateOtp: 'Validate OTP',
			year: 'Year'
		},
		status: {
			stepOf: 'Step {{step}} of {{total}}'
		},
		tooltips: {
			changeLanguage: 'Change language',
			collapseMenu: 'Collapse menu',
			collapseSidebar: 'Collapse sidebar',
			deleteContact: 'Delete contact',
			dashboard: 'Dashboard',
			logout: 'Logout',
			makePrimary: 'Make primary',
			openMenu: 'Open menu',
			primaryContact: 'Primary contact',
			profile: 'Profile',
			expandSidebar: 'Expand sidebar'
		},
		values: {
			notProvided: 'Not provided',
			notSelected: 'Not selected'
		}
	},
	datePicker: {
		description: 'Choose a date using the current device timezone.',
		months: {
			'01': 'January',
			'02': 'February',
			'03': 'March',
			'04': 'April',
			'05': 'May',
			'06': 'June',
			'07': 'July',
			'08': 'August',
			'09': 'September',
			'10': 'October',
			'11': 'November',
			'12': 'December'
		}
	},
	profileEditor: {
		addContactDescription:
			'Choose a supported contact type and enter the contact value.',
		addContactFailed: 'Unable to add the contact.',
		cannotDeleteLocale: 'Unable to delete the locale.',
		cannotAddLocale: 'Unable to add the locale.',
		cannotDeleteContact: 'Unable to delete the contact.',
		cannotUpdatePrimaryContact: 'Unable to update the primary contact.',
		cannotUpdatePrimaryLocale: 'Unable to update the primary locale.',
		contactType: 'Contact type',
		contactValue: 'Contact value',
		dateOfBirth: 'Date of birth',
		delete: 'Delete',
		gender: 'Gender',
		makePrimary: 'Make Primary',
		no: 'No',
		unspecified: 'Unspecified',
		primary: 'Primary',
		type: 'Type',
		value: 'Value',
		verified: 'Verified',
		yes: 'Yes'
	},
	userShell: {
		title: 'Users'
	},
	adminShell: {
		title: 'System Administrators'
	},
	userProfile: {
		title: 'User profile',
		description:
			'Manage the authenticated profile with locale-aware names, contacts, and preferred locales.',
		nameDescription:
			"Edit the active locale's first name, middle names, last name, and nickname.",
		demographicsDescription: 'Update the user gender and date of birth.',
		contactDescription:
			'Review contacts, delete non-primary entries, and choose the primary contact.',
		localeDescription: 'Choose one or more locales for the user profile.'
	},
	adminProfile: {
		title: 'Administrator profile',
		description:
			'Update operator names, contacts, and locale assignments from the authenticated workspace.',
		nameTitle: 'Operator names',
		nameDescription:
			"Edit the active locale's administrator name fields in a single responsive row.",
		demographicsDescription:
			'Update the operator gender and date of birth.',
		contactDescription:
			'Review contacts, delete non-primary entries, and choose the primary contact.',
		localeDescription:
			'Choose one or more locales for the operator profile.'
	},
	userLogin: {
		register: 'Register',
		otpSent: 'OTP sent for {{countryCode}} +91 {{phoneNumber}}.',
		sessionStarted: 'User session started.',
		loginFailed: 'Unable to complete login.',
		otpVerified: 'OTP verified. Continue with identity details.',
		validateOtpFailed: 'Unable to validate OTP.',
		createProfileFailed: 'Unable to create the user profile.',
		profileCreated: 'Profile created. Use the login tab to continue.',
		reviewDescription:
			'Confirm the details before creating the user profile.'
	},
	adminLogin: {
		otpSent: 'OTP sent for {{countryCode}} +91 {{phoneNumber}}.',
		sessionStarted: 'Administrator session started.',
		loginFailed: 'Unable to complete administrator login.'
	},
	userDashboard: {
		title: 'User dashboard',
		sessionManagement: 'Session management',
		dashboardDescription:
			'Authenticated user workspace with the same sidebar and profile structure as the reference app.',
		sessionDescription:
			'You are signed in. Continue from the dashboard or update the profile from the authenticated shell.',
		workspaceDescription:
			'Collapsible sidebar, language selector, and profile access are active.',
		profileDescription:
			'Identity and language preferences are editable post-login.',
		mobileDescription:
			'Authenticated mobile workspace with a collapsible menu and profile access.',
		mobileLanguageDescription:
			'Language selection is available before login and inside the authenticated drawer.'
	},
	adminDashboard: {
		title: 'Administrator dashboard',
		sessionManagement: 'Session management',
		dashboardDescription:
			'Privileged operators land in the same authenticated layout, with collapsible navigation and profile access.',
		sessionDescription:
			'The administrator session is active. Use the sidebar to move between dashboard and profile.',
		workspaceDescription:
			'Administrative shell chrome is active with language selection and logout.',
		profileDescription:
			'Operator identity and privilege scope remain editable post-login.',
		mobileDescription:
			'Authenticated administrative mobile workspace with a collapsible menu, profile access, and language controls.',
		mobileLanguageDescription:
			'Operator language selection is available before login and in the authenticated menu.'
	},
	registration: {
		firstNameRequired: 'First name *',
		lastNameRequired: 'Last name *'
	}
} as const;
