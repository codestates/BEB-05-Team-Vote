interface Lecture {
  lecture_id: number;
  lecture_image?: string;
  lecture_price?: number;
  lecture_title: string;
  user?: any;
}

interface UploadLecture {
  user_id: number;
  lecture_title: string;
  lecture_summary: string;
  lecture_introduction: string;
  instructor_introduction: string;
  lecture_url: string;
  lecture_image: string;
  lecture_price: number;
}

interface LectureDetail extends Lecture {
  user_id?: number;
  lecture_summary: string;
  lecture_introduction?: string;
  instructor_introduction?: string;
  lecture_url: string;
  class_id: string;
  created_at?: string;
  updated_at?: string;
  user?: any;
}
