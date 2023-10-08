import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import PostsPage from "pages/posts";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";
import PostPage from "pages/posts/detail";
import PostNew from "pages/posts/new";
import { RouterProps } from "type";

export const Router = ({ isAuthenticated }: RouterProps) => {
	return (
		<>
			<Routes>
				{isAuthenticated ? (
					<>
						<Route path='/' element={<Home />} />
						<Route path='/posts' element={<PostsPage />} />
						<Route path='/posts/:id' element={<PostPage />} />
						<Route path='/posts/new' element={<PostNew />} />
						<Route path='/posts/edit/:id' element={<PostEdit />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='*' element={<Navigate replace to='/' />} />
					</>
				) : (
					<>
						<Route path='/' element={<Home />} />
						<Route path='/posts' element={<PostsPage />} />
						<Route path='/posts/:id' element={<PostPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignupPage />} />
						<Route path='*' element={<LoginPage />} />
					</>
				)}
			</Routes>
		</>
	);
};
