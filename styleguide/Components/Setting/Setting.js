import React, { useContext, useEffect, useRef } from 'react';
import { Icon16Dropdown } from '@vkontakte/icons';
import { ActionSheet, ActionSheetItem, classNames, Headline, Link } from '@vkui';
import './Setting.css';
import { Tooltip } from '@vkui/components/Tooltip/Tooltip';
import { StyleGuideContext } from '../StyleGuide/StyleGuideRenderer';

export const Setting = ({
  label,
  onChange,
  value,
  options,
  children,
  disabled,
  hint,
  className,
}) => {
  const { setPopout } = useContext(StyleGuideContext);
  const ref = useRef();

  useEffect(
    () => () => {
      setPopout(null);
    },
    [],
  );

  const title =
    options?.find((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return false;
      }
      return option.value === value;
    })?.title || value;

  const labelJsx = <span className="Setting__label">{label}:&nbsp;</span>;

  return (
    <Headline
      className={classNames('Setting', className, disabled && 'Setting--disabled')}
      weight="3"
    >
      {hint ? (
        <Tooltip placement="top" enableInteractive text={hint}>
          {labelJsx}
        </Tooltip>
      ) : (
        labelJsx
      )}
      {Array.isArray(options) && (
        <Link
          className="Setting__value"
          getRootRef={ref}
          disabled={disabled}
          onClick={() => {
            setPopout(
              <ActionSheet toggleRef={ref} onClose={() => setPopout(null)}>
                {options.map((item) => {
                  const isPrimitive = typeof item === 'string' || typeof item === 'number';
                  const option = isPrimitive ? item : item.value;
                  const title = isPrimitive ? item : item.title;
                  return (
                    <ActionSheetItem key={option} value={option} onClick={() => onChange(option)}>
                      {title}
                    </ActionSheetItem>
                  );
                })}
              </ActionSheet>,
            );
          }}
        >
          {title}
          <Icon16Dropdown />
        </Link>
      )}
      {children}
    </Headline>
  );
};
