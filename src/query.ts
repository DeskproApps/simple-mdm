import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

enum QueryKey {
  SEARCH_DEVICES = "searchDevices",
  DEVICE = "device",
  LINKED_DEVICES = "linkedDevices",
  DEVICE_GROUPS = "deviceGroups",
}

export { queryClient, QueryKey };
