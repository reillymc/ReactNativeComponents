import { useTheme } from "../../hooks";
import { IconBase, withIcon } from "../icon";

export const TagIcon = withIcon(({ ...iconProps }) => {
    const { theme, styles } = useTheme();

    return (
        <IconBase
            {...iconProps}
            style={{
                color: theme.color.textPrimary,
                size: styles.text.font.body.size,
            }}
        />
    );
});
