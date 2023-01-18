export type ValueItem<T = string> = T extends string | number
    ? {
          label: string;
          value: T;
      }
    : {
          id: string;
          label: string;
          value: T;
      };
