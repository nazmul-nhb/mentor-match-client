import { jwtDecode } from "jwt-decode";
import { IDecodedUser } from "../types/interfaces";

export const decodeAccessToken = (token: string): IDecodedUser | null => {
	try {
		return jwtDecode<IDecodedUser>(token);
	} catch (error) {
		console.error("Failed to decode JWT:", error);
		return null;
	}
};
