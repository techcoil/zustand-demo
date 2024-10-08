import { queryClient } from "./query-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type User = {
  name: string;
  profilePic: string;
};

const serverMockData: { user: null | User } = {
  user: null,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      return serverMockData.user;
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user-mutation"],
    mutationFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      serverMockData.user = null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      console.log("Making Login");
      await new Promise((res) => setTimeout(res, 200));
      serverMockData.user = {
        name: "John Doe",
        profilePic: "https://picsum.photos/50/50",
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
}
