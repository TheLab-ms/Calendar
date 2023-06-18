import { UserRoles } from '../interfaces/roles';

const { CREATE_EVENT_ROLE, APPROVE_EVENT_ROLE, ADMIN_ROLE } = process.env;

export const getRoleByGroup = (groups: string[]): UserRoles => {
	if (groups.includes(CREATE_EVENT_ROLE)) return UserRoles.CREATE_EVENT;
	if (groups.includes(APPROVE_EVENT_ROLE)) return UserRoles.APPROVE_EVENT;
	if (groups.includes(ADMIN_ROLE)) return UserRoles.ADMIN;
	return UserRoles.MEMBER;
};
