import React, { useCallback, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";

import { makeStyles } from "@mui/styles";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  defaultAnimateLayoutChanges,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import ModalCustom from "components/Modal";
import ProcessIcon from "../ProcessIcon";
import SortableItem from "./SortableItem";

import { ImageList, MusicList, VideoList } from "utils/media";

import { coordinateGetter as multipleContainersCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { useTimeProcessing } from "hooks/useTimer";

import { Item } from "./SortableItem";
import Action from "./Action";
import ProcessingMusic from "./ProcessingMusic";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "55vh",
    marginBottom: "5vh",
    display: "flex",
    justifyContent: "space-around",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    border: "5px solid black",
    borderRadius: 30,
    padding: 15,
    backgroundColor: theme.palette.info.main,
    overflowY: "auto",
    minHeight: 115,
  },
  action: {
    display: "flex",
    border: "1px solid black",
    width: "10%",
    height: "100%",
  },
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
  },
  icon: {
    fontSize: 30,
    marginRight: 20,
    display: "flex",
    alignContent: "center",
  },
}));

const ListMedia = [
  ...VideoList.map((video) => ({ type: "video", name: video })),
  ...MusicList.map((video) => ({ type: "audio", name: video })),
  ...ImageList.map((video) => ({ type: "image", name: video })),
]; //test shuffle O(n log n)
// .map((value) => ({ value, sort: Math.random() }))
// .sort((a, b) => a.sort - b.sort)
// .map(({ value }) => value);

const TRASH_ID = "void";
const PLACEHOLDER_ID = "placeholder";

const animateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const DroppableContainer = ({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  shadow,
}) => {
  const { isDragging, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
    disabled,
  });

  const styles = useStyles();
  return (
    <div
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        boxShadow: shadow ? "0 1px 10px 0 rgba(34, 33, 81, 0.1)" : "none",
        width: id === "list" ? "40%" : "100%",
        overflow: id === "current" ? "visible" : "scroll",
        height: id === "stack" ? "100%" : "auto",
      }}
      className={styles.column}
    >
      {children}
    </div>
  );
};

const MediaController = ({
  coordinateGetter = multipleContainersCoordinateGetter,
  strategy = verticalListSortingStrategy,
}) => {
  const styles = useStyles();

  const [show, setShow] = useState(false);
  const [items, setItems] = useState({
    current: [],
    stack: [],
    list: ListMedia,
  });
  const [containers, setContainers] = useState(Object.keys(items));

  const [clonedItems, setClonedItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleSubmitModal = () => {};

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  /* The above code is a custom collision detection strategy that is used to determine which droppable
  container the draggable item is over. */
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        // if (overId === TRASH_ID) {
        //   // If the intersecting droppable is the trash, return early
        //   // Remove this if you're not using trashable functionality in your app
        //   return intersections;
        // }

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    let res = undefined;

    Object.keys(items).forEach((item) => {
      items[item.toString()].forEach((media) => {
        if (media.type === id.type && media.name === id.name) {
          res = item.toString();
        }
      });
    });

    return res;
  };

  const getIndex = (id) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  /**
   * It gets the next container ID by getting the last container ID and adding one to it
   * @returns The next container id.
   */
  const getNextContainerId = () => {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  };

  const renderSortableItemDragOverlay = (id) => {
    return <Item value={id} dragOverlay />;
  };

  function renderContainerDragOverlay(containerId) {
    return (
      <DroppableContainer shadow>
        {items[containerId].map((item) => (
          <Item key={item} value={item} />
        ))}
      </DroppableContainer>
    );
  }

  const {
    duration,
    setDuration,
    timer,
    isPause,
    handleOnPause,
    handleReset,
    handleOnStart,
  } = useTimeProcessing();

  return (
    <>
      <ProcessIcon
        process={timer / duration}
        isPause={isPause}
        handleOnPause={handleOnPause}
        handleReset={handleReset}
        handleOnStart={handleOnStart}
        setShow={setShow}
      >
        <LibraryMusicIcon fontSize="inherit" />
      </ProcessIcon>
      <ModalCustom
        show={show}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        type="large"
        id="modal-media-controller"
      >
        <ProcessingMusic
          currentMedia={items.current[0]}
          duration={duration}
          setDuration={setDuration}
          timer={timer}
          isPause={isPause}
          handleOnPause={handleOnPause}
          handleReset={handleReset}
          handleOnStart={handleOnStart}
        />
        <div className={styles.container}>
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{
              droppable: {
                strategy: MeasuringStrategy.Always,
              },
            }}
            onDragStart={({ active }) => {
              setActiveId(active.id);

              setClonedItems(items);
            }}
            onDragOver={({ active, over }) => {
              const overId = over?.id;

              if (overId == null || overId === TRASH_ID || active.id in items) {
                return;
              }

              const overContainer = findContainer(overId);
              const activeContainer = findContainer(active.id);

              if (!overContainer || !activeContainer) {
                return;
              }

              if (activeContainer !== overContainer) {
                if (overContainer === "current" && items.current.length > 0) {
                  const activeItems = items[activeContainer];
                  const activeIndex = activeItems.indexOf(active.id);

                  if (activeContainer === "stack") {
                    setItems((prev) => {
                      let tmp = prev.stack;
                      tmp = tmp.filter((item) => item !== active.id);
                      tmp = [...prev.current, ...tmp];
                      return {
                        ...prev,
                        current: [items[activeContainer][activeIndex]],
                        stack: tmp,
                      };
                    });
                  } else
                    setItems((prev) => {
                      return {
                        ...prev,
                        current: [items[activeContainer][activeIndex]],
                        stack: [...prev.current, ...prev.stack],
                        [activeContainer]: items[activeContainer].filter(
                          (item) => item !== active.id
                        ),
                      };
                    });
                  return;
                }

                setItems((items) => {
                  const activeItems = items[activeContainer];
                  const overItems = items[overContainer];
                  const overIndex = overItems.indexOf(overId);
                  const activeIndex = activeItems.indexOf(active.id);

                  let newIndex;

                  if (overId in items) {
                    newIndex = overItems.length + 1;
                  } else {
                    const isBelowOverItem =
                      over &&
                      active.rect.current.translated &&
                      active.rect.current.translated.top >
                        over.rect.top + over.rect.height;

                    const modifier = isBelowOverItem ? 1 : 0;

                    newIndex =
                      overIndex >= 0
                        ? overIndex + modifier
                        : overItems.length + 1;
                  }

                  recentlyMovedToNewContainer.current = true;

                  return {
                    ...items,
                    [activeContainer]: items[activeContainer].filter(
                      (item) => item !== active.id
                    ),
                    [overContainer]: [
                      ...items[overContainer].slice(0, newIndex),
                      items[activeContainer][activeIndex],
                      ...items[overContainer].slice(
                        newIndex,
                        items[overContainer].length
                      ),
                    ],
                  };
                });
              }
            }}
            onDragEnd={({ active, over }) => {
              if (active.id in items && over?.id) {
                setContainers((containers) => {
                  const activeIndex = containers.indexOf(active.id);
                  const overIndex = containers.indexOf(over.id);

                  return arrayMove(containers, activeIndex, overIndex);
                });
              }

              const activeContainer = findContainer(active.id);

              if (!activeContainer) {
                setActiveId(null);
                return;
              }

              const overId = over?.id;

              if (overId == null) {
                setActiveId(null);
                return;
              }

              if (overId === TRASH_ID) {
                setItems((items) => ({
                  ...items,
                  [activeContainer]: items[activeContainer].filter(
                    (id) => id !== activeId
                  ),
                }));
                setActiveId(null);
                return;
              }

              if (overId === PLACEHOLDER_ID) {
                const newContainerId = getNextContainerId();

                unstable_batchedUpdates(() => {
                  setContainers((containers) => [
                    ...containers,
                    newContainerId,
                  ]);
                  setItems((items) => ({
                    ...items,
                    [activeContainer]: items[activeContainer].filter(
                      (id) => id !== activeId
                    ),
                    [newContainerId]: [active.id],
                  }));
                  setActiveId(null);
                });
                return;
              }

              const overContainer = findContainer(overId);

              if (overContainer) {
                const activeIndex = items[activeContainer].indexOf(active.id);
                const overIndex = items[overContainer].indexOf(overId);

                if (activeIndex !== overIndex) {
                  setItems((items) => ({
                    ...items,
                    [overContainer]: arrayMove(
                      items[overContainer],
                      activeIndex,
                      overIndex
                    ),
                  }));
                }
              }
              setActiveId(null);
            }}
            onDragCancel={onDragCancel}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
                gap: 20,
                height: "100%",
              }}
            >
              <List
                id="current"
                items={items}
                strategy={strategy}
                isSortingContainer={isSortingContainer}
                getIndex={getIndex}
                disabled={items.current.length > 0}
              />
              <List
                id="stack"
                items={items}
                strategy={strategy}
                isSortingContainer={isSortingContainer}
                getIndex={getIndex}
              />
            </div>
            <Action setItems={setItems} />
            <List
              id="list"
              items={items}
              strategy={strategy}
              isSortingContainer={isSortingContainer}
              getIndex={getIndex}
            />
            {createPortal(
              <DragOverlay
                dropAnimation={dropAnimation}
                style={{ zIndex: 9999 }}
              >
                {activeId
                  ? containers.includes(activeId)
                    ? renderContainerDragOverlay(activeId)
                    : renderSortableItemDragOverlay(activeId)
                  : null}
              </DragOverlay>,
              document.body
            )}
            {/* {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null} */}
          </DndContext>
        </div>
      </ModalCustom>
    </>
  );
};

const List = ({
  id,
  items,
  strategy,
  isSortingContainer,
  getIndex,
  disabled,
}) => {
  return (
    <DroppableContainer id={id} items={items.list} disabled={disabled}>
      <SortableContext items={items[id]} strategy={strategy}>
        {items[id].map((value, index) => {
          return (
            <SortableItem
              disabled={isSortingContainer}
              key={index}
              id={value}
              index={index}
              handle={false}
              style={() => (id === "current" ? { marginBottom: 0 } : {})}
              wrapperStyle={() => {}}
              renderItem={undefined}
              containerId={id}
              getIndex={getIndex}
            />
          );
        })}
      </SortableContext>
    </DroppableContainer>
  );
};

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export default MediaController;
