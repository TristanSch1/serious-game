import useSWR from "swr";
import { fetcher } from "../../../_config/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TSessionData } from "../../withSession";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/users/session", fetcher<TSessionData>);
  const router = useRouter();
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.data.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.data.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
