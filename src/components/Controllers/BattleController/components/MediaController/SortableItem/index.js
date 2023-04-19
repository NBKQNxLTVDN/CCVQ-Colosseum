import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";

import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import { useSortable } from "@dnd-kit/sortable";

import styles from "./index.module.css";
import classNames from "classnames";

const SortableItem = ({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  wrapperStyle,
  dragOverlay,
}) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({ id });

  const useMountStatus = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setIsMounted(true), 500);

      return () => clearTimeout(timeout);
    }, []);

    return isMounted;
  };

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      })}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    border: "2px solid black",
    marginBottom: 15,
    width: "100%",
    minHeight: 60,
    borderRadius: 10,
    textShadow: "none",
    color: "black",
    display: "flex",
    alignItems: "center",
    padding: 15,
    letterSpacing: 2,
    overflow: "hidden",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    fontSize: 30,
    marginRight: 20,
    display: "flex",
    alignContent: "center",
  },
}));

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

      const Styles = useStyles();

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
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
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
          <div
            // className={styles.item}
            className={classNames(
              Styles.item,
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={{
              backgroundColor:
                value.type === "video"
                  ? "#EC8A17"
                  : value.type === "audio"
                  ? "#EDD502"
                  : "#DF2121",
              ...style,
              // zIndex: dragging ? 99999 : 1,
            }}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <div className={Styles.icon}>
                {value.type === "video" ? (
                  <MovieCreationRoundedIcon fontSize="inherit" />
                ) : value.type === "audio" ? (
                  <AudioFileRoundedIcon fontSize="inherit" />
                ) : (
                  <ImageRoundedIcon fontSize="inherit" />
                )}
              </div>
              {value.name}
            </div>
            <IconButton>
              <DeleteForeverRoundedIcon fontSize="medium" />
            </IconButton>
          </div>
        </li>
      );
    }
  )
);

export default SortableItem;
