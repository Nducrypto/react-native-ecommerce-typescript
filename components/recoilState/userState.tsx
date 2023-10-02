import { atom, useRecoilState, useSetRecoilState } from "recoil";

export interface CollectionInterface {
  role: string;
  email: string;
  userId: string;
  joined: string;
  docId: string;
  location: string;
}

interface AllUserState {
  usersCollection: CollectionInterface[];
  currentUser: CollectionInterface | null;
  isUserLoading: boolean;
  isAuthError: boolean | string;
  snackBarOpen: string | null;
  snackBarSeverity: string;
  previousRoute: string;
}

export const userState = atom<AllUserState>({
  key: "userState",
  default: {
    currentUser: null,
    isUserLoading: false,
    usersCollection: [],
    isAuthError: false,
    snackBarOpen: null,
    snackBarSeverity: "success",
    previousRoute: "Home",
  },
});

export const useUserState = () => {
  const setUser = useSetRecoilState(userState);
  const [userStateValue] = useRecoilState(userState);
  const {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
  } = userStateValue;
  return {
    currentUser,
    isUserLoading,
    usersCollection,
    isAuthError,
    snackBarOpen,
    snackBarSeverity,
    previousRoute,
    setUser,
  };
};
