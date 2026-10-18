import { useTheme } from "../../hooks";
import { IconBase, type IconComponentProps } from "../icon";

export const TagIcon = <G extends string>({
    ...iconProps
}: IconComponentProps<G>) => {
    const { theme, styles } = useTheme();

    return (
        <IconBase
            {...iconProps}
            color={theme.color.foreground}
            size={styles.text.font.body.size}
        />
    );
};
