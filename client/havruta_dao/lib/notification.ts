import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const noti = (type: NotificationType, msg: string, desc?: string) => {
  return notification['success']({
    message: msg,
    description: desc && desc,
  });
};
