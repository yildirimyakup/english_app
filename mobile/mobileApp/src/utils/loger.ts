import { store } from '../store/store';
import { addLog } from '../store/logs/loger.slice';

const log = (type: 'info' | 'success' | 'error', ...args: any[]) => {
  const message = args
    .map(a => (typeof a === 'string' ? a : JSON.stringify(a)))
    .join(' ');

  console.log(`[${type.toUpperCase()}]`, message);

  store.dispatch(
    addLog({
      type,
      message,
      time: new Date().toLocaleTimeString(),
    }),
  );
};

export const logInfo = (...args: any[]) => log('info', ...args);
export const logSuccess = (...args: any[]) => log('success', ...args);
export const logError = (...args: any[]) => log('error', ...args);
