export type ValueItem<T = string> = T extends string | number
    ? {
          label: string;
          description?: string;
          value: T;
      }
    : {
          id: string;
          label: string;
          description?: string;
          value: T;
      };
