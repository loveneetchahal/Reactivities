import { makeAutoObservable, runInAction } from 'mobx';
import { User, UserFormValues } from '../models/user';
import agent from '../api/agent';
import { store } from './store';
import { router } from '../router/Routes';

export default class userStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      console.log(store.commonStore.token);
      
      router.navigate('/activities');
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate('/');
  };

  getUser = async (token: string) => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };
}
