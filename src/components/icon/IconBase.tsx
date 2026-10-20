import { useTheme } from "../../hooks";
import type { IconBaseStyles } from "./IconBase.styles";
import type { IconComponentProps } from "./IconComponentProps";

export type IconBaseProps<G extends string> = IconComponentProps<G> & {
    size?: IconBaseStyles["size"];
    color?: IconBaseStyles["color"];
};

export const IconBase = <G extends string>({
    iconSet: IconSet,
    iconName,
    size,
    color,
}: IconBaseProps<G>) => {
    const { styles } = useTheme();

    return (
        <IconSet
            size={size ?? styles.iconBase.size}
            color={color ?? styles.iconBase.color}
            name={iconName}
        />
    );
};
