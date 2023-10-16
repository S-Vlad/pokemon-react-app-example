export enum SNACKBAR_COLORS {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

type SnackbarOptions = {
  onAccept?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  variant?: SNACKBAR_COLORS;
};

export type Notification = {
  key: string | number;
  message: string;
  options: SnackbarOptions;
};

export type AppState = {
  notifications: Notification[];
};

export type ShowNotificationPayload = {
  message: string;
  options?: SnackbarOptions;
  type?: SNACKBAR_COLORS;
};
