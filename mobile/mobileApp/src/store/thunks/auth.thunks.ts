import { AppDispatch } from '../store';
import { loginService } from '../../services/auth.service';

export const handleLogin =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      return await loginService(dispatch, email, password);
    } catch (err: any) {
      console.error('❌ Login hata:', err);
      throw err;
    }
  };
