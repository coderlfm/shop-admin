import Request from '@/service/request';
import { ElMessageBox } from 'element-plus';

export async function checkStatusAction({ title, url, data }: { title: string; url: string; data: any }) {
  await ElMessageBox.confirm(`此操作将${title}, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await Request.patch({ url, data });
}
