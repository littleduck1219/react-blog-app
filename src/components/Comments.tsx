import AuthContext from "context/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CommentProps } from "type";

export const Comments = ({ post, getPost }: CommentProps) => {
	const [comment, setComment] = useState("");
	const { user } = useContext(AuthContext);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "comment") {
			setComment(value);
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (post && post?.id) {
				const postRef = doc(db, "posts", post.id);
				if (user?.uid) {
					const commentObj = {
						content: comment,
						uid: user.uid,
						email: user.email,
						createdAt: new Date()?.toLocaleDateString("ko", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}),
					};

					await updateDoc(postRef, {
						comments: arrayUnion(commentObj),
						updateDated: new Date()?.toLocaleDateString("ko", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}),
					});
					await getPost(post.id);
				}
			}

			toast.success("댓글이 작성되었습니다.");
			setComment("");
		} catch (error: any) {
			toast.error("댓글 작성을 실패하였습니다.");
		}

		if (comment) {
			setComment("");
		}
	};

	const handleDeleteComment = (comment: any) => async () => {
		const confirm = window.confirm("댓글이 삭제됩니다.");
		if (confirm && post.id) {
			const postRef = doc(db, "posts", post.id);
			await updateDoc(postRef, {
				comments: arrayRemove(comment),
			});

			toast.success("댓글이 삭제되었습니다.");
			await getPost(post.id);
		}
	};

	return (
		<div className='comments'>
			<form className='comments__form' onSubmit={onSubmit}>
				<div className='form__block'>
					<label htmlFor='comment'>댓글 입력</label>
					<textarea name='comment' id='comment' onChange={onChange} required value={comment} />
				</div>
				<div className='form__block form__block-reverse'>
					<input type='submit' value='입력' className='form__btn-submit' />
				</div>
			</form>
			<div className='comments__list'>
				{post?.comments
					?.slice(0)
					?.reverse()
					.map((comment) => (
						<div key={comment.createdAt} className='comment__box'>
							<div className='comment__profile-box'>
								<div className='comment__email'>{comment?.email}</div>
								<div className='comment__date'>{comment?.createdAt}</div>
								{comment.uid === user?.uid && (
									<div className='comment__delete' onClick={handleDeleteComment(comment)}>
										삭제
									</div>
								)}
							</div>
							<div className='comment__text'>{comment?.content}</div>
						</div>
					))}
			</div>
		</div>
	);
};
