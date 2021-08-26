import { ElMessage, ElMessageBox } from 'element-plus';
import Request from '@/service/request';

export async function useDelete(url: string, id: number | string, title: string): Promise<void> {
  await ElMessageBox.confirm(`此操作将永久删除${title}, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  await Request.delete({ url: `${url}/${id}` });
  ElMessage.success('删除成功!');
}

export default useDelete;
