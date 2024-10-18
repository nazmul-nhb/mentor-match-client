export interface IUserDetails {
	name: string;
	age: number;
	email: string;
	password: string;
	image: string;
	role: "student" | "trainer" | "admin";
}

export interface IDecodedUser {
	_id: string;
	name: string;
	age: number;
	email: string;
	image: string;
	role: "student" | "trainer" | "admin";
	created: Date;
	__v: string;
	iat: number;
	exp: number;
}

export interface IRegResponse {
	success: boolean;
	insertedId?: string;
	message: string;
}

export interface ILoginResponse {
	success: boolean;
	message: string;
	accessToken: string;
}
