import { QueryClient, useQueryClient } from "@tanstack/react-query";

/**
 * Single shared QueryClient instance for the whole app.
 * Use this when you need access outside of React tree (rare).
 */
export const queryClient = new QueryClient();

/**
 * Typed wrapper around useQueryClient to avoid repeating imports everywhere.
 *
 * Example:
 * const queryClient = useAppQueryClient();
 */
export const useAppQueryClient = () => {
  return useQueryClient();
};
