export interface ProfileDto {
	actorType: 'users';
	id?: string;
	genderId: string;
	dateOfBirth: string;
	names: Array<{
		id?: string;
		localeCode: string;
		firstName: string;
		middleNames: string;
		lastName: string;
		nickname: string;
	}>;
	contacts: Array<{
		id?: string;
		typeName: string;
		typeId?: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}>;
	locales: Array<{
		id?: string;
		localeCode: string;
		localeId: string;
		isPrimary: boolean;
	}>;
}
