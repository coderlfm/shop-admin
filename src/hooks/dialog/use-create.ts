import Request from '@/service/request';
import { ElMessage } from 'element-plus';

export async function useCreate({ url, data }: { url: string; data: any }) {
  await Request.post({ url, data });
  ElMessage.success('操作成功');
}
