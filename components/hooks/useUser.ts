import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id || "123456";

  return { userId, isLoading: status === "loading" };
};
