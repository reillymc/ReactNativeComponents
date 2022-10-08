// import React from "react";
// import { ColorValue, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
// import { Theme, useTheme, useThemedStyles } from "./ThemeProvider";

// type ActionSize = "small" | "medium" | "large";

// const getLabelColor = (type: ActionType, pressed: boolean): ColorValue => {
//     if (type === "shaded") {
//         return "#fff";
//     }

//     return pressed ? "#bbb" : "#333";
// };

// const getFontSize = (size: ActionSize): number => {
//     switch (size) {
//         case "small":
//             return 14;
//         case "medium":
//             return 16;
//         case "large":
//             return 20;
//     }
// };


// interface ActionProps {
//     size?: ActionSize;
//     disabled?: boolean;
//     style?: ViewStyle;
//     children?: React.ReactNode;
//     onPress: () => void;
// }

// const Action: React.FC<ActionProps> = ({
//     size = "large",
//     disabled,
//     style,
//     children,
//     onPress,
// }) => {
//     const hitBuffer = size === "small" ? 80 : 20;

//     const styles = useThemedStyles(createStyles);
//     const theme = useTheme();

//     return (
//         <Pressable
//             hitSlop={hitBuffer}
//             disabled={disabled}
//             style={({ pressed }) => [
//                 style,
//                 styles.Action,
//                 {
//                     minHeight: getHeight(type, size),
//                     minWidth: getWidth(type, size),
//                     borderRadius: 8,
//                     backgroundColor: getBackgroundColor(type, pressed),
//                     color: getLabelColor(type, pressed),
//                 },
//             ]}
//             onPress={onPress}
//         >
//             {({ pressed }) => (
//                 <Text
//                     style={[
//                         styles.label,
//                         {
//                             color: getLabelColor(type, pressed),
//                             fontSize: getFontSize(size),
//                             textAlign: contentAlign,
//                             paddingHorizontal: type === "shaded" ? 8 : 0,
//                         },
//                     ]}
//                 >
//                     {label}
//                 </Text>
//             )}
//         </Pressable>
//     );
// };

// export { Action, ActionProps, ActionSize };

// const createStyles = (theme: Theme) =>
//     StyleSheet.create({
//         Action: {
//             justifyContent: "center",
//         },
//         label: {
//             fontWeight: "bold",
//             fontFamily: theme.font.regular,
//         },
//     });
