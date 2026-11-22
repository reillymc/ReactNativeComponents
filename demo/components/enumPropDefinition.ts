type AnyValueItem = {
    id?: string;
    label: string;
    description?: string;
    value: unknown;
};

type ValueItemKey<Item> = Item extends { id: infer ItemId extends string }
    ? ItemId
    : Item extends { value: infer ItemValue extends string | number }
      ? ItemValue
      : never;

type EnumPropDefinition<ItemValues extends ReadonlyArray<AnyValueItem>> = {
    type: "enum";
    label?: string;
    values: ItemValues;
    default: ValueItemKey<ItemValues[number]>;
};

export const enumPropDefinition = <
    const ItemValues extends ReadonlyArray<AnyValueItem>,
>(definition: {
    label?: string;
    values: ItemValues;
    default: ValueItemKey<ItemValues[number]>;
}): EnumPropDefinition<ItemValues> => ({
    type: "enum",
    ...definition,
});
