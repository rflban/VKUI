import * as React from "react";
import Tappable, { ACTIVE_EFFECT_DELAY } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { HasRef, HasRootRef } from "../../types";
import { usePlatform } from "../../hooks/usePlatform";
import {
  withAdaptivity,
  AdaptivityProps,
  SizeType,
} from "../../hoc/withAdaptivity";
import { hasReactNode } from "../../lib/utils";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
import "./Radio.css";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    HasRef<HTMLInputElement>,
    HasRootRef<HTMLLabelElement>,
    AdaptivityProps {
  description?: React.ReactNode;
}

const RadioComponent: React.FC<RadioProps> = (props: RadioProps) => {
  const {
    children,
    description,
    style,
    className,
    getRef,
    getRootRef,
    sizeY,
    ...restProps
  } = props;
  const platform = usePlatform();

  const RadioTypography =
    platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;

  return (
    <Tappable
      Component="label"
      style={style}
      className={className}
      vkuiClass={classNames(
        getClassName("Radio", platform),
        `Radio--sizeY-${sizeY}`
      )}
      activeEffectDelay={platform === IOS ? 100 : ACTIVE_EFFECT_DELAY}
      disabled={restProps.disabled}
      getRootRef={getRootRef}
    >
      <input
        {...restProps}
        type="radio"
        vkuiClass="Radio__input"
        ref={getRef}
      />
      <div vkuiClass="Radio__container">
        <i vkuiClass="Radio__icon" role="presentation" />
        <RadioTypography vkuiClass="Radio__content" Component="div">
          <div vkuiClass="Radio__children">{children}</div>
          {hasReactNode(description) && (
            <Caption vkuiClass="Radio__description">{description}</Caption>
          )}
        </RadioTypography>
      </div>
    </Tappable>
  );
};

/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */
export const Radio = withAdaptivity(RadioComponent, {
  sizeY: true,
});
