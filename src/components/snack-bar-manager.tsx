import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/index';
import { removeSnackbar } from 'store/app/app-slice';

let displayed: Array<string | number> = [];

const storeDisplayed = (id: string | number) => {
  displayed = [...displayed, id];
};
const removeDisplayed = (id: string | number) => {
  displayed = [...displayed.filter((key) => id !== key)];
};

const SnackBarManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { notifications } = useAppSelector((state) => state.app);

  useEffect(() => {
    notifications.forEach(({ key, message, options = {} }) => {
      const { onAccept, onClose, onConfirm } = options;

      if (displayed.includes(key)) return;

      const action = (key: string | number) => {
        if (onConfirm) {
          return handleConfirm({ key, onConfirm });
        }

        if (onAccept && onClose) {
          return handleAccept({ key, onAccept, onClose });
        }
      };

      // display snackbar
      enqueueSnackbar(message, {
        action,
        persist: !!onAccept || !!onConfirm,
        preventDuplicate: true,
        variant: options.variant,
        onClose: () => {
          if (options.onClose) {
            options.onClose();
          }
        },
        onExited: (_, myKey) => {
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      // track active snackbars
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar]);

  const handleConfirm = ({ onConfirm, key }: ConfirmHandlerType) => {
    const acceptHandler = () => {
      onConfirm();
      closeSnackbar(key);
    };

    return (
      <Button onClick={acceptHandler} sx={{ color: '#fff' }} aria-label='Подтвердить'>
        Подтвердить
      </Button>
    );
  };

  const handleAccept = ({ onAccept, onClose, key }: AcceptHandlerType) => {
    const cancelHandler = () => {
      onClose();
      closeSnackbar(key);
    };

    const acceptHandler = () => {
      onAccept();
      closeSnackbar(key);
    };

    return (
      <>
        <Button onClick={cancelHandler} sx={{ color: '#fff' }} aria-label='Отменить'>
          Отменить
        </Button>
        <Button onClick={acceptHandler} sx={{ color: '#fff' }} aria-label='Подтвердить'>
          Подтвердить
        </Button>
      </>
    );
  };

  return null;
};

type AcceptHandlerType = {
  key: string | number;
  onAccept: () => void;
  onClose: () => void;
};

type ConfirmHandlerType = {
  key: string | number;
  onConfirm: () => void;
};

export default SnackBarManager;
