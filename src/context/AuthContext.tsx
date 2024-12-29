'use client';
import React, { useState, createContext, useEffect } from 'react';
import { useData } from '@/hooks';
import { getAuthUser } from '@/lib/getAuthUser';
import { USER_ROLE, RoleType } from '@/types/interfaces';

type AuthUserType = {
	id: number;
	role: RoleType;
} | null;

type AuthContextType = {
	user: AuthUserType;
	isAdmin: boolean;
	setUser: (user: AuthUserType) => void;
	setIsAdmin: (isAdmin: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
	user: null,
	isAdmin: false,
	setUser: () => {},
	setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: user, setData: setUser } = useData(getAuthUser, []);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		setIsAdmin(user?.role === USER_ROLE.ADMIN);
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, isAdmin, setUser, setIsAdmin }}>
			{children}
		</AuthContext.Provider>
	);
};
