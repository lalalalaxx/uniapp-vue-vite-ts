export interface listInt {
  level_four: levelItemInt[];
  level_three: levelItemInt[];
  level_two: levelItemInt[];
  level_one: levelItemInt[];
}
interface levelItemInt {
  id: number;
  name: string;
  days_diff: number;
  gender: string;
  education_level: string;
  post: string;
  id_card: string;
  work_unit: string;
  job_category: string;
  delete_time: number;
  update_time: string;
  become_time: number;
  category_id: number;
  is_remind: number;
}
