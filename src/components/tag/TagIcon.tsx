import { useTheme } from "../../hooks";
import { componentWithIcon, IconBase } from "../icon";

export const TagIcon = componentWithIcon(({ ...iconProps }) => {
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
