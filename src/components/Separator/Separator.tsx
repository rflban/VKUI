import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { warnOnce } from "../../lib/warnOnce";
import "./Separator.css";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * С этим свойством компонент не будет иметь отступы слева и справа
   */
  wide?: boolean;
  expanded?: boolean;
}

const warn = warnOnce("Separator");

/**
 * @deprecated Этот компонент устарел и будет удален в 5.0.0. Используйте [`Spacing`](#/Spacing).
 */
const Separator: React.FC<SeparatorProps> = React.memo(
  ({ wide, expanded, ...restProps }) => {
    if (process.env.NODE_ENV === "development") {
      warn(
        "Этот компонент устарел и будет удален в 5.0.0. Используйте Spacing."
      );
    }

    const platform = usePlatform();

    return (
      <div
        {...restProps}
        aria-hidden="true"
        vkuiClass={classNames(
          getClassName("Separator", platform),
          wide && "Separator--wide"
        )}
      >
        <div
          vkuiClass={classNames(
            "Separator__in",
            expanded && "Separator__in--expanded"
          )}
        />
      </div>
    );
  }
);

Separator.displayName = "Separator";

// eslint-disable-next-line import/no-default-export
export default Separator;
