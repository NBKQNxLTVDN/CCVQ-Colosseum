import React, { forwardRef, useEffect } from "react";
import classNames from "classnames";
import { DriveEta } from "@mui/icons-material";

// import styles from "./Item.module.css";

// import { Handle, Remove } from "../Item";

// import styles from "./Container.module.css";
export const Container = forwardRef(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    },
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        ref={ref}
        style={{
          ...style,
          "--columns": columns,
        }}
        // className={classNames(
        //   styles.Container,
        //   unstyled && styles.unstyled,
        //   horizontal && styles.horizontal,
        //   hover && styles.hover,
        //   placeholder && styles.placeholder,
        //   scrollable && styles.scrollable,
        //   shadow && styles.shadow
        // )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div>
            {label}
            <div>
              {/* {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} /> */}
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);

export const Item = React.memo(
  React.forwardRef(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay,
          dragging,
          sorting,
          index,
          fadeIn,
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          style={{
            ...wrapperStyle,
            transition: [transition, wrapperStyle?.transition]
              .filter(Boolean)
              .join(", "),
            "--translate-x": transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            "--translate-y": transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
            "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
            "--index": index,
            "--color": color,
          }}
          ref={ref}
        >
          <DriveEta
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {value}
            {/* <span className={styles.Actions}>
              {onRemove ? (
                <Remove className={styles.Remove} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span> */}
          </DriveEta>
        </li>
      );
    }
  )
);
