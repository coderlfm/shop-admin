import { ref } from 'vue';
import { PageContent, Dialog } from '@/components/context';

export function usePageConent() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const pageDialogRef = ref<InstanceType<typeof Dialog>>();

  return [pageContentRef, pageDialogRef];
}
