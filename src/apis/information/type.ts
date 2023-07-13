// 人员详情id
export interface detailInt {
  id: number;
}


export interface infoInt {
  id: number;
  name: string;
  gender: string;
  education_level: string;
  post: string;
  id_card: string;
  work_unit: string;
  job_category: string;
  delete_time: number | null;
  update_time: string;
  become_time: number | null;
  category_id: number | null;
  is_remind: number;
  days_diff: number | null;
  phone: number | null;
}
