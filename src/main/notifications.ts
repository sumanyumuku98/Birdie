import { type Session } from 'electron';
import { ALLOWED_PERMISSIONS } from '../shared/constants';

export function setupPermissionHandler(session: Session): void {
  session.setPermissionRequestHandler((_webContents, permission, callback) => {
    if (ALLOWED_PERMISSIONS.includes(permission)) {
      callback(true);
    } else {
      callback(false);
    }
  });

  session.setPermissionCheckHandler((_webContents, permission) => {
    return ALLOWED_PERMISSIONS.includes(permission);
  });
}
