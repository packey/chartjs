export interface ConfirmationDialogData {
  headerTitle: string;
  content?: string;
  actionLabels: {
    cancel: string;
    confirm: string;
  };
}
