import { normalizeTwyrLocale } from '@twyr/i18n';

type ShowcaseLocale =
	| 'bn-BD'
	| 'en-IN'
	| 'gu-IN'
	| 'hi-IN'
	| 'kn-IN'
	| 'ml-IN'
	| 'mr-IN'
	| 'ta-IN'
	| 'te-IN';

type ShowcaseCopy = {
	nav: {
		overview: string;
		primitives: string;
		composed: string;
		designSystem: string;
	};
	shell: {
		title: string;
		subtitle: string;
		sidebarTitle: string;
	};
	page: {
		eyebrow: string;
		title: string;
		descriptionWeb: string;
		descriptionMobile: string;
		overlayTour: string;
	};
	sections: {
		coverage: string;
		primitives: string;
		composed: string;
		designSystem: string;
	};
	common: {
		artifact: string;
		family: string;
		platform: string;
		preview: string;
		workspace: string;
		users: string;
		systemAdministrators: string;
		sharedShell: string;
		dashboard: string;
		reviewQueue: string;
		auditTrail: string;
		tokens: string;
		widgets: string;
		shell: string;
		operator: string;
		analyst: string;
		admin: string;
		lightTheme: string;
		darkTheme: string;
		spacingScale: string;
		radiusScale: string;
		typeScale: string;
		motionPresets: string;
		shadowPresets: string;
		defaultTheme: string;
		mediaKeys: string;
		tokensExposed: string;
	};
};

const SHOWCASE_COPY: Record<ShowcaseLocale, ShowcaseCopy> = {
	'en-IN': {
		nav: {
			overview: 'Overview',
			primitives: 'Primitives',
			composed: 'Composed',
			designSystem: 'Design System'
		},
		shell: {
			title: 'Shell Showcase',
			subtitle: 'Shared UI artifact catalog',
			sidebarTitle: 'Twyr UI Catalog'
		},
		page: {
			eyebrow: 'Shell apps',
			title: 'UI artifact showcase',
			descriptionWeb:
				'The web shell frame exposes the shared UI catalog: primitives, composed widgets, and design-system foundations.',
			descriptionMobile:
				'The mobile shell surface exposes the shared UI catalog: primitives, composed widgets, and design-system foundations.',
			overlayTour: 'Overlay tour'
		},
		sections: {
			coverage: 'Coverage',
			primitives: 'Primitive surfaces',
			composed: 'Composed workflows',
			designSystem: 'Design-system variants'
		},
		common: {
			artifact: 'Artifact',
			family: 'Family',
			platform: 'Platform',
			preview: 'Preview',
			workspace: 'Workspace',
			users: 'Users',
			systemAdministrators: 'System administrators',
			sharedShell: 'Shared shell',
			dashboard: 'Dashboard',
			reviewQueue: 'Review queue',
			auditTrail: 'Audit trail',
			tokens: 'Tokens',
			widgets: 'Widgets',
			shell: 'Shell',
			operator: 'Operator',
			analyst: 'Analyst',
			admin: 'Admin',
			lightTheme: 'light theme',
			darkTheme: 'dark theme',
			spacingScale: 'Spacing scale',
			radiusScale: 'Radius scale',
			typeScale: 'Type scale',
			motionPresets: 'Motion presets',
			shadowPresets: 'Shadow presets',
			defaultTheme: 'Default theme',
			mediaKeys: 'Media keys',
			tokensExposed: 'Tokens exposed'
		}
	},
	'hi-IN': {
		nav: {
			overview: 'अवलोकन',
			primitives: 'प्रिमिटिव्स',
			composed: 'कंपोज़्ड',
			designSystem: 'डिज़ाइन सिस्टम'
		},
		shell: {
			title: 'शेल शोकेस',
			subtitle: 'साझा UI आर्टिफैक्ट कैटलॉग',
			sidebarTitle: 'Twyr UI कैटलॉग'
		},
		page: {
			eyebrow: 'शेल ऐप्स',
			title: 'UI आर्टिफैक्ट शोकेस',
			descriptionWeb:
				'वेब शेल फ़्रेम साझा UI कैटलॉग दिखाता है: प्रिमिटिव्स, कंपोज़्ड विजेट्स और डिज़ाइन-सिस्टम नींव।',
			descriptionMobile:
				'मोबाइल शेल सतह साझा UI कैटलॉग दिखाती है: प्रिमिटिव्स, कंपोज़्ड विजेट्स और डिज़ाइन-सिस्टम नींव।',
			overlayTour: 'ओवरले टूर'
		},
		sections: {
			coverage: 'कवरेज',
			primitives: 'प्रिमिटिव सतहें',
			composed: 'कंपोज़्ड वर्कफ़्लो',
			designSystem: 'डिज़ाइन-सिस्टम वेरिएंट्स'
		},
		common: {
			artifact: 'आर्टिफैक्ट',
			family: 'परिवार',
			platform: 'प्लेटफ़ॉर्म',
			preview: 'पूर्वावलोकन',
			workspace: 'वर्कस्पेस',
			users: 'उपयोगकर्ता',
			systemAdministrators: 'सिस्टम प्रशासक',
			sharedShell: 'साझा शेल',
			dashboard: 'डैशबोर्ड',
			reviewQueue: 'रिव्यू कतार',
			auditTrail: 'ऑडिट ट्रेल',
			tokens: 'टोकन्स',
			widgets: 'विजेट्स',
			shell: 'शेल',
			operator: 'ऑपरेटर',
			analyst: 'विश्लेषक',
			admin: 'एडमिन',
			lightTheme: 'लाइट थीम',
			darkTheme: 'डार्क थीम',
			spacingScale: 'स्पेसिंग स्केल',
			radiusScale: 'रेडियस स्केल',
			typeScale: 'टाइप स्केल',
			motionPresets: 'मोशन प्रीसेट्स',
			shadowPresets: 'शैडो प्रीसेट्स',
			defaultTheme: 'डिफ़ॉल्ट थीम',
			mediaKeys: 'मीडिया कुंजियाँ',
			tokensExposed: 'उपलब्ध टोकन्स'
		}
	},
	'bn-BD': {
		nav: {
			overview: 'সংক্ষিপ্তসার',
			primitives: 'প্রিমিটিভস',
			composed: 'কম্পোজড',
			designSystem: 'ডিজাইন সিস্টেম'
		},
		shell: {
			title: 'শেল শোকেস',
			subtitle: 'শেয়ার্ড UI আর্টিফ্যাক্ট ক্যাটালগ',
			sidebarTitle: 'Twyr UI ক্যাটালগ'
		},
		page: {
			eyebrow: 'শেল অ্যাপস',
			title: 'UI আর্টিফ্যাক্ট শোকেস',
			descriptionWeb:
				'ওয়েব শেল ফ্রেমে শেয়ার্ড UI ক্যাটালগ দেখা যায়: প্রিমিটিভস, কম্পোজড উইজেট এবং ডিজাইন-সিস্টেমের ভিত্তি।',
			descriptionMobile:
				'মোবাইল শেল সারফেসে শেয়ার্ড UI ক্যাটালগ দেখা যায়: প্রিমিটিভস, কম্পোজড উইজেট এবং ডিজাইন-সিস্টেমের ভিত্তি।',
			overlayTour: 'ওভারলে ট্যুর'
		},
		sections: {
			coverage: 'কভারেজ',
			primitives: 'প্রিমিটিভ সারফেস',
			composed: 'কম্পোজড ওয়ার্কফ্লো',
			designSystem: 'ডিজাইন-সিস্টেম ভ্যারিয়েন্টস'
		},
		common: {
			artifact: 'আর্টিফ্যাক্ট',
			family: 'পরিবার',
			platform: 'প্ল্যাটফর্ম',
			preview: 'পূর্বরূপ',
			workspace: 'ওয়ার্কস্পেস',
			users: 'ব্যবহারকারী',
			systemAdministrators: 'সিস্টেম প্রশাসক',
			sharedShell: 'শেয়ার্ড শেল',
			dashboard: 'ড্যাশবোর্ড',
			reviewQueue: 'রিভিউ কিউ',
			auditTrail: 'অডিট ট্রেইল',
			tokens: 'টোকেন',
			widgets: 'উইজেট',
			shell: 'শেল',
			operator: 'অপারেটর',
			analyst: 'বিশ্লেষক',
			admin: 'অ্যাডমিন',
			lightTheme: 'হালকা থিম',
			darkTheme: 'গাঢ় থিম',
			spacingScale: 'স্পেসিং স্কেল',
			radiusScale: 'রেডিয়াস স্কেল',
			typeScale: 'টাইপ স্কেল',
			motionPresets: 'মোশন প্রিসেট',
			shadowPresets: 'শ্যাডো প্রিসেট',
			defaultTheme: 'ডিফল্ট থিম',
			mediaKeys: 'মিডিয়া কী',
			tokensExposed: 'উন্মুক্ত টোকেন'
		}
	},
	'gu-IN': {
		nav: {
			overview: 'સારાંશ',
			primitives: 'પ્રિમિટિવ્સ',
			composed: 'કમ્પોઝ્ડ',
			designSystem: 'ડિઝાઇન સિસ્ટમ'
		},
		shell: {
			title: 'શેલ શોકેસ',
			subtitle: 'સાંઝા UI આર્ટિફેક્ટ કેટલોગ',
			sidebarTitle: 'Twyr UI કેટલોગ'
		},
		page: {
			eyebrow: 'શેલ એપ્સ',
			title: 'UI આર્ટિફેક્ટ શોકેસ',
			descriptionWeb:
				'વેબ શેલ ફ્રેમ શેર કરાયેલ UI કેટલોગ બતાવે છે: પ્રિમિટિવ્સ, કમ્પોઝ્ડ વિજેટ્સ અને ડિઝાઇન-સિસ્ટમના પાયા.',
			descriptionMobile:
				'મોબાઇલ શેલ સપાટી શેર કરાયેલ UI કેટલોગ બતાવે છે: પ્રિમિટિવ્સ, કમ્પોઝ્ડ વિજેટ્સ અને ડિઝાઇન-સિસ્ટમના પાયા.',
			overlayTour: 'ઓવરલે પ્રવાસ'
		},
		sections: {
			coverage: 'કવરેજ',
			primitives: 'પ્રિમિટિવ સપાટી',
			composed: 'કમ્પોઝ્ડ વર્કફ્લો',
			designSystem: 'ડિઝાઇન-સિસ્ટમ પ્રકારો'
		},
		common: {
			artifact: 'આર્ટિફેક્ટ',
			family: 'પરિવાર',
			platform: 'પ્લેટફોર્મ',
			preview: 'પૂર્વાવલોકન',
			workspace: 'વર્કસ્પેસ',
			users: 'વપરાશકર્તાઓ',
			systemAdministrators: 'સિસ્ટમ એડમિનિસ્ટ્રેટર્સ',
			sharedShell: 'શેર કરાયેલ શેલ',
			dashboard: 'ડૅશબોર્ડ',
			reviewQueue: 'રિવ્યુ કતાર',
			auditTrail: 'ઓડિટ ટ્રેલ',
			tokens: 'ટોકન્સ',
			widgets: 'વિજેટ્સ',
			shell: 'શેલ',
			operator: 'ઓપરેટર',
			analyst: 'વિશ્લેષક',
			admin: 'એડમિન',
			lightTheme: 'લાઇટ થીમ',
			darkTheme: 'ડાર્ક થીમ',
			spacingScale: 'સ્પેસિંગ સ્કેલ',
			radiusScale: 'રેડિયસ સ્કેલ',
			typeScale: 'ટાઇપ સ્કેલ',
			motionPresets: 'મોશન પ્રિસેટ્સ',
			shadowPresets: 'શેડો પ્રિસેટ્સ',
			defaultTheme: 'ડિફૉલ્ટ થીમ',
			mediaKeys: 'મીડિયા કીઝ',
			tokensExposed: 'ઉપલબ્ધ ટોકન્સ'
		}
	},
	'kn-IN': {
		nav: {
			overview: 'ಒಳನೋಟ',
			primitives: 'ಪ್ರಿಮಿಟಿವ್‌ಗಳು',
			composed: 'ಕಂಪೋಸ್ಡ್',
			designSystem: 'ಡಿಸೈನ್ ಸಿಸ್ಟಂ'
		},
		shell: {
			title: 'ಶೆಲ್ ಶೋಕೇಸ್',
			subtitle: 'ಹಂಚಿಕೆಯ UI ಆರ್‌ಟಿಫ್ಯಾಕ್ಟ್ ಕ್ಯಾಟಲಾಗ್',
			sidebarTitle: 'Twyr UI ಕ್ಯಾಟಲಾಗ್'
		},
		page: {
			eyebrow: 'ಶೆಲ್ ಅಪ್‌ಗಳು',
			title: 'UI ಆರ್‌ಟಿಫ್ಯಾಕ್ಟ್ ಶೋಕೇಸ್',
			descriptionWeb:
				'ವೆಬ್ ಶೆಲ್ ಫ್ರೇಮ್ ಹಂಚಿಕೆಯ UI ಕ್ಯಾಟಲಾಗ್ ತೋರಿಸುತ್ತದೆ: ಪ್ರಿಮಿಟಿವ್‌ಗಳು, ಕಂಪೋಸ್ಡ್ ವಿಜೆಟ್‌ಗಳು ಮತ್ತು ಡಿಸೈನ್-ಸಿಸ್ಟಂ ಅಡಿಪಾಯಗಳು.',
			descriptionMobile:
				'ಮೊಬೈಲ್ ಶೆಲ್ ಮೇಲ್ಮೈ ಹಂಚಿಕೆಯ UI ಕ್ಯಾಟಲಾಗ್ ತೋರಿಸುತ್ತದೆ: ಪ್ರಿಮಿಟಿವ್‌ಗಳು, ಕಂಪೋಸ್ಡ್ ವಿಜೆಟ್‌ಗಳು ಮತ್ತು ಡಿಸೈನ್-ಸಿಸ್ಟಂ ಅಡಿಪಾಯಗಳು.',
			overlayTour: 'ಓವರ್‌ಲೇ ಪ್ರವಾಸ'
		},
		sections: {
			coverage: 'ವ್ಯಾಪ್ತಿ',
			primitives: 'ಪ್ರಿಮಿಟಿವ್ ಮೇಲ್ಮೈಗಳು',
			composed: 'ಕಂಪೋಸ್ಡ್ ವರ್ಕ್‌ಫ್ಲೋಗಳು',
			designSystem: 'ಡಿಸೈನ್-ಸಿಸ್ಟಂ ರೂಪಾಂತರಗಳು'
		},
		common: {
			artifact: 'ಆರ್‌ಟಿಫ್ಯಾಕ್ಟ್',
			family: 'ಕುಟುಂಬ',
			platform: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
			preview: 'ಪೂರ್ವವೀಕ್ಷಣೆ',
			workspace: 'ವರ್ಕ್‌ಸ್ಪೇಸ್',
			users: 'ಬಳಕೆದಾರರು',
			systemAdministrators: 'ಸಿಸ್ಟಂ ನಿರ್ವಾಹಕರು',
			sharedShell: 'ಹಂಚಿಕೆಯ ಶೆಲ್',
			dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
			reviewQueue: 'ರಿವ್ಯೂ ಸರದಿ',
			auditTrail: 'ಆಡಿಟ್ ಟ್ರೇಲ್',
			tokens: 'ಟೋಕನ್‌ಗಳು',
			widgets: 'ವಿಜೆಟ್‌ಗಳು',
			shell: 'ಶೆಲ್',
			operator: 'ಆಪರೇಟರ್',
			analyst: 'ವಿಶ್ಲೇಷಕ',
			admin: 'ನಿರ್ವಾಹಕ',
			lightTheme: 'ಲೈಟ್ ಥೀಮ್',
			darkTheme: 'ಡಾರ್ಕ್ ಥೀಮ್',
			spacingScale: 'ಸ್ಪೇಸಿಂಗ್ ಸ್ಕೇಲ್',
			radiusScale: 'ರೇಡಿಯಸ್ ಸ್ಕೇಲ್',
			typeScale: 'ಟೈಪ್ ಸ್ಕೇಲ್',
			motionPresets: 'ಮೋಷನ್ ಪ್ರಿಸೆಟ್‌ಗಳು',
			shadowPresets: 'ನೆರಳು ಪ್ರಿಸೆಟ್‌ಗಳು',
			defaultTheme: 'ಡೀಫಾಲ್ಟ್ ಥೀಮ್',
			mediaKeys: 'ಮೀಡಿಯಾ ಕೀಸ್',
			tokensExposed: 'ಲಭ್ಯ ಟೋಕನ್‌ಗಳು'
		}
	},
	'ml-IN': {
		nav: {
			overview: 'അവലോകനം',
			primitives: 'പ്രിമിറ്റീവുകൾ',
			composed: 'കമ്പോസ്ഡ്',
			designSystem: 'ഡിസൈൻ സിസ്റ്റം'
		},
		shell: {
			title: 'ഷെൽ ഷോകേസ്',
			subtitle: 'പങ്കിടുന്ന UI ആർട്ടിഫാക്റ്റ് കാറ്റലോഗ്',
			sidebarTitle: 'Twyr UI കാറ്റലോഗ്'
		},
		page: {
			eyebrow: 'ഷെൽ ആപ്പുകൾ',
			title: 'UI ആർട്ടിഫാക്റ്റ് ഷോകേസ്',
			descriptionWeb:
				'വെബ് ഷെൽ ഫ്രെയിം പങ്കിടുന്ന UI കാറ്റലോഗ് പ്രദർശിപ്പിക്കുന്നു: പ്രിമിറ്റീവുകൾ, കമ്പോസ്ഡ് വിഡ്ജറ്റുകൾ, ഡിസൈൻ-സിസ്റ്റം അടിസ്ഥാനങ്ങൾ.',
			descriptionMobile:
				'മൊബൈൽ ഷെൽ ഉപരിതലം പങ്കിടുന്ന UI കാറ്റലോഗ് പ്രദർശിപ്പിക്കുന്നു: പ്രിമിറ്റീവുകൾ, കമ്പോസ്ഡ് വിഡ്ജറ്റുകൾ, ഡിസൈൻ-സിസ്റ്റം അടിസ്ഥാനങ്ങൾ.',
			overlayTour: 'ഓവർലെ ടൂർ'
		},
		sections: {
			coverage: 'കവറേജ്',
			primitives: 'പ്രിമിറ്റീവ് ഉപരിതലങ്ങൾ',
			composed: 'കമ്പോസ്ഡ് പ്രവാഹങ്ങൾ',
			designSystem: 'ഡിസൈൻ-സിസ്റ്റം വകഭേദങ്ങൾ'
		},
		common: {
			artifact: 'ആർട്ടിഫാക്റ്റ്',
			family: 'കുടുംബം',
			platform: 'പ്ലാറ്റ്ഫോം',
			preview: 'പ്രീവ്യൂ',
			workspace: 'വർക്ക്സ്പേസ്',
			users: 'ഉപയോക്താക്കൾ',
			systemAdministrators: 'സിസ്റ്റം അഡ്മിനിസ്ട്രേറ്റർമാർ',
			sharedShell: 'പങ്കിടുന്ന ഷെൽ',
			dashboard: 'ഡാഷ്ബോർഡ്',
			reviewQueue: 'റിവ്യൂ നിര',
			auditTrail: 'ഓഡിറ്റ് ട്രെയിൽ',
			tokens: 'ടോക്കണുകൾ',
			widgets: 'വിഡ്ജറ്റുകൾ',
			shell: 'ഷെൽ',
			operator: 'ഓപ്പറേറ്റർ',
			analyst: 'വിശകലനകാരൻ',
			admin: 'അഡ്മിൻ',
			lightTheme: 'ലൈറ്റ് തീം',
			darkTheme: 'ഡാർക്ക് തീം',
			spacingScale: 'സ്പേസിംഗ് സ്കെയിൽ',
			radiusScale: 'റേഡിയസ് സ്കെയിൽ',
			typeScale: 'ടൈപ്പ് സ്കെയിൽ',
			motionPresets: 'മോഷൻ പ്രിസെറ്റുകൾ',
			shadowPresets: 'ഷാഡോ പ്രിസെറ്റുകൾ',
			defaultTheme: 'ഡീഫോൾട്ട് തീം',
			mediaKeys: 'മീഡിയ കീകൾ',
			tokensExposed: 'ലഭ്യമായ ടോക്കണുകൾ'
		}
	},
	'mr-IN': {
		nav: {
			overview: 'आढावा',
			primitives: 'प्रिमिटिव्ह्स',
			composed: 'कंपोज्ड',
			designSystem: 'डिझाइन सिस्टम'
		},
		shell: {
			title: 'शेल शोकेस',
			subtitle: 'सामायिक UI आर्टिफॅक्ट कॅटलॉग',
			sidebarTitle: 'Twyr UI कॅटलॉग'
		},
		page: {
			eyebrow: 'शेल अॅप्स',
			title: 'UI आर्टिफॅक्ट शोकेस',
			descriptionWeb:
				'वेब शेल फ्रेम सामायिक UI कॅटलॉग दाखवते: प्रिमिटिव्ह्स, कंपोज्ड विजेट्स आणि डिझाइन-सिस्टमची पायाभरणी.',
			descriptionMobile:
				'मोबाइल शेल पृष्ठभाग सामायिक UI कॅटलॉग दाखवतो: प्रिमिटिव्ह्स, कंपोज्ड विजेट्स आणि डिझाइन-सिस्टमची पायाभरणी.',
			overlayTour: 'ओव्हरले फेरी'
		},
		sections: {
			coverage: 'कव्हरेज',
			primitives: 'प्रिमिटिव्ह पृष्ठभाग',
			composed: 'कंपोज्ड कार्यप्रवाह',
			designSystem: 'डिझाइन-सिस्टम प्रकार'
		},
		common: {
			artifact: 'आर्टिफॅक्ट',
			family: 'कुटुंब',
			platform: 'प्लॅटफॉर्म',
			preview: 'पूर्वावलोकन',
			workspace: 'कार्यस्थान',
			users: 'वापरकर्ते',
			systemAdministrators: 'सिस्टम प्रशासक',
			sharedShell: 'सामायिक शेल',
			dashboard: 'डॅशबोर्ड',
			reviewQueue: 'रिव्यू रांग',
			auditTrail: 'ऑडिट ट्रेल',
			tokens: 'टोकन्स',
			widgets: 'विजेट्स',
			shell: 'शेल',
			operator: 'ऑपरेटर',
			analyst: 'विश्लेषक',
			admin: 'अॅडमिन',
			lightTheme: 'लाईट थीम',
			darkTheme: 'डार्क थीम',
			spacingScale: 'स्पेसिंग स्केल',
			radiusScale: 'रेडियस स्केल',
			typeScale: 'टाइप स्केल',
			motionPresets: 'मोशन प्रिसेट्स',
			shadowPresets: 'शॅडो प्रिसेट्स',
			defaultTheme: 'डिफॉल्ट थीम',
			mediaKeys: 'मीडिया कीज',
			tokensExposed: 'उपलब्ध टोकन्स'
		}
	},
	'ta-IN': {
		nav: {
			overview: 'மேலோட்டம்',
			primitives: 'பிரிமிட்டிவ்கள்',
			composed: 'கம்போஸ்ட்',
			designSystem: 'டிசைன் சிஸ்டம்'
		},
		shell: {
			title: 'ஷெல் ஷோகேஸ்',
			subtitle: 'பகிரப்பட்ட UI ஆட்டிபாக்ட் பட்டியல்',
			sidebarTitle: 'Twyr UI பட்டியல்'
		},
		page: {
			eyebrow: 'ஷெல் செயலிகள்',
			title: 'UI ஆட்டிபாக்ட் ஷோகேஸ்',
			descriptionWeb:
				'வெப் ஷெல் பிரேம் பகிரப்பட்ட UI பட்டியலைக் காட்டுகிறது: பிரிமிட்டிவ்கள், கம்போஸ்ட் விட்ஜெட்டுகள், மற்றும் டிசைன்-சிஸ்டம் அடித்தளங்கள்.',
			descriptionMobile:
				'மொபைல் ஷெல் மேற்பரப்பு பகிரப்பட்ட UI பட்டியலைக் காட்டுகிறது: பிரிமிட்டிவ்கள், கம்போஸ்ட் விட்ஜெட்டுகள், மற்றும் டிசைன்-சிஸ்டம் அடித்தளங்கள்.',
			overlayTour: 'ஓவர்லே சுற்று'
		},
		sections: {
			coverage: 'கவரேஜ்',
			primitives: 'பிரிமிட்டிவ் மேற்பரப்புகள்',
			composed: 'கம்போஸ்ட் பணிச்சரிகள்',
			designSystem: 'டிசைன்-சிஸ்டம் வகைகள்'
		},
		common: {
			artifact: 'ஆட்டிபாக்ட்',
			family: 'குடும்பம்',
			platform: 'தளம்',
			preview: 'முன்னோட்டம்',
			workspace: 'பணிமனை',
			users: 'பயனர்கள்',
			systemAdministrators: 'கணினி நிர்வாகிகள்',
			sharedShell: 'பகிரப்பட்ட ஷெல்',
			dashboard: 'டாஷ்போர்டு',
			reviewQueue: 'மதிப்பாய்வு வரிசை',
			auditTrail: 'ஆடிட் தடம்',
			tokens: 'டோக்கன்கள்',
			widgets: 'விட்ஜெட்டுகள்',
			shell: 'ஷெல்',
			operator: 'இயக்குநர்',
			analyst: 'பகுப்பாய்வாளர்',
			admin: 'நிர்வாகி',
			lightTheme: 'ஒளி தீம்',
			darkTheme: 'இருள் தீம்',
			spacingScale: 'இடைவெளி அளவுகோல்',
			radiusScale: 'ஆரம் அளவுகோல்',
			typeScale: 'எழுத்துரு அளவுகோல்',
			motionPresets: 'இயக்க முன்வடிவங்கள்',
			shadowPresets: 'நிழல் முன்வடிவங்கள்',
			defaultTheme: 'இயல்புநிலை தீம்',
			mediaKeys: 'மீடியா விசைகள்',
			tokensExposed: 'வெளிப்படுத்தப்பட்ட டோக்கன்கள்'
		}
	},
	'te-IN': {
		nav: {
			overview: 'సారాంశం',
			primitives: 'ప్రిమిటివ్‌లు',
			composed: 'కంపోజ్డ్',
			designSystem: 'డిజైన్ సిస్టమ్'
		},
		shell: {
			title: 'షెల్ షోకేస్',
			subtitle: 'పంచుకున్న UI ఆర్టిఫాక్ట్ క్యాటలాగ్',
			sidebarTitle: 'Twyr UI క్యాటలాగ్'
		},
		page: {
			eyebrow: 'షెల్ యాప్‌లు',
			title: 'UI ఆర్టిఫాక్ట్ షోకేస్',
			descriptionWeb:
				'వెబ్ షెల్ ఫ్రేమ్ పంచుకున్న UI క్యాటలాగ్‌ను చూపిస్తుంది: ప్రిమిటివ్‌లు, కంపోజ్డ్ విడ్జెట్‌లు, డిజైన్-సిస్టమ్ పునాదులు.',
			descriptionMobile:
				'మొబైల్ షెల్ ఉపరితలం పంచుకున్న UI క్యాటలాగ్‌ను చూపిస్తుంది: ప్రిమిటివ్‌లు, కంపోజ్డ్ విడ్జెట్‌లు, డిజైన్-సిస్టమ్ పునాదులు.',
			overlayTour: 'ఓవర్లే టూర్'
		},
		sections: {
			coverage: 'కవరేజ్',
			primitives: 'ప్రిమిటివ్ ఉపరితలాలు',
			composed: 'కంపోజ్డ్ వర్క్‌ఫ్లోలు',
			designSystem: 'డిజైన్-సిస్టమ్ రూపాలు'
		},
		common: {
			artifact: 'ఆర్టిఫాక్ట్',
			family: 'కుటుంబం',
			platform: 'ప్లాట్‌ఫార్మ్',
			preview: 'ప్రివ్యూ',
			workspace: 'వర్క్‌స్పేస్',
			users: 'వినియోగదారులు',
			systemAdministrators: 'సిస్టమ్ అడ్మినిస్ట్రేటర్లు',
			sharedShell: 'పంచుకున్న షెల్',
			dashboard: 'డ్యాష్‌బోర్డ్',
			reviewQueue: 'సమీక్ష సరసం',
			auditTrail: 'ఆడిట్ ట్రయిల్',
			tokens: 'టోకెన్లు',
			widgets: 'విడ్జెట్‌లు',
			shell: 'షెల్',
			operator: 'ఆపరేటర్',
			analyst: 'విశ్లేషకుడు',
			admin: 'అడ్మిన్',
			lightTheme: 'లైట్ థీమ్',
			darkTheme: 'డార్క్ థీమ్',
			spacingScale: 'స్పేసింగ్ స్కేలు',
			radiusScale: 'రేడియస్ స్కేలు',
			typeScale: 'టైప్ స్కేలు',
			motionPresets: 'మోషన్ ప్రీసెట్లు',
			shadowPresets: 'షాడో ప్రీసెట్లు',
			defaultTheme: 'డిఫాల్ట్ థీమ్',
			mediaKeys: 'మీడియా కీలు',
			tokensExposed: 'బయటపడ్డ టోకెన్లు'
		}
	}
};

export function getShowcaseCopy(locale?: string | null): ShowcaseCopy {
	return SHOWCASE_COPY[normalizeTwyrLocale(locale)];
}
