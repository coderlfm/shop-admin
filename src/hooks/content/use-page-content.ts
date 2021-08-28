import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import Request from '@/service/request';
import { PageContent, Dialog } from '@/components/context';

export function usePageConent({ url, title = '' }: { url: string; title?: string }) {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const pageDialogRef = ref<InstanceType<typeof Dialog>>();

  /**
   * 1. 重新请求列表
   * 2. 操作成功提示
   * 3. 关闭弹框
   * 4. 清空弹框中的表单内容
   * @param type 'delete' 是否为删除操作
   */
  function _success(type?: 'delete') {
    (pageContentRef.value as any).getList();
    ElMessage.success('操作成功');
    pageDialogRef.value.dialogVisible = false;
    if (type !== 'delete') (pageDialogRef.value as any).formRef.resetFormFidlds();
  }

  async function pageContentCreate(data: any) {
    await Request.post({ url, data });
    _success();
  }

  async function pageContentEdit(id: string | number, data: any) {
    await Request.patch({ url: `${url}/${id}`, data });
    _success();
  }

  async function pageContentDelete(id: string | number): Promise<void> {
    await ElMessageBox.confirm(`此操作将永久删除${title}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await Request.delete({ url: `${url}/${id}` });
    _success('delete');
  }

  return { pageContentRef, pageDialogRef, pageContentCreate, pageContentEdit, pageContentDelete };
}
