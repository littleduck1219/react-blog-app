import { ReactNode } from "react";

export interface PostListProps {
	hasNavigation?: boolean;
	defaultTab?: TabType | CategoryType;
}

export type TabType = "all" | "my";

export interface CommentInterface {
	content: string;
	uid: string;
	email: string;
	createdAt: string;
}

export interface PostProps {
	id?: string;
	title: string;
	email: string;
	summary: string;
	content: string;
	createdAt: string;
	updatedAt?: string;
	uid: string;
	category?: CategoryType;
	comments?: CommentInterface[];
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";

export interface ThemeProps {
	children: ReactNode;
}

export interface CommentProps {
	post: PostProps;
	getPost: (id: string) => void;
}

export interface RouterProps {
	isAuthenticated: boolean;
}
