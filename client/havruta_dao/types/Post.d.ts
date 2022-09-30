export interface PostInterface {
  article_id: number;
  user_id: number;
  article_content: string;
  like_count: number;
  comment_count: number;
  comment_content: string;
  created_at: string;
  id: number;
  user: {
    user_id: number;
    user_address: string;
    user_network: string;
    user_nickname: string;
    user_introduction: string;
    created_at: string;
    updated_at: string;
  };
}

export interface NicknamePopover {
  user_nickname: string;
  user_introduction: string;
  user_address: string;
}

export interface LikeButton {
  type: 'post' | 'detail';
  article_id: number;
  like_count: number;
}

export interface CommentButton {
  comment_count: number;
}

export interface DeleteButton {
  type: 'post' | 'comment' | 'detail';
  id: number;
}
