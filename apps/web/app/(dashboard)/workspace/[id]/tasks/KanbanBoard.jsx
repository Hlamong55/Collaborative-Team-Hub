"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  useWorkspaceStore,
} from "../../../../../lib/store";

import {
  updateTaskStatus,
} from "../../../../../lib/api";

/* ================= COLUMNS ================= */

const columns = {
  TODO: {
    title: "To Do",
  },

  IN_PROGRESS: {
    title: "In Progress",
  },

  DONE: {
    title: "Done",
  },
};

export default function KanbanBoard() {

  const {
    tasks,
    currentWorkspace,
    updateTask,
  } = useWorkspaceStore();

  /* ================= GROUP TASKS ================= */

  const grouped = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  tasks.forEach((task) => {

    const status =
      task.status || "TODO";

    grouped[status]?.push(task);
  });

  /* ================= DRAG ================= */

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId =
      result.draggableId;

    const newStatus =
      result.destination.droppableId;

    try {

      const updated =
        await updateTaskStatus(
          currentWorkspace.id,
          taskId,
          newStatus
        );

      updateTask(taskId, updated);

    } catch (err) {
      console.error(err);

      alert("Update failed");
    }
  };

  /* ================= UI ================= */

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {Object.entries(columns).map(
          ([key, col]) => (

            <Droppable
              droppableId={key}
              key={key}
            >

              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}

                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    min-h-[500px]
                  "
                >

                  {/* HEADER */}

                  <div className="flex justify-between items-center mb-5">

                    <h2 className="font-bold text-lg">
                      {col.title}
                    </h2>

                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                      {grouped[key].length}
                    </span>

                  </div>

                  {/* EMPTY */}

                  {grouped[key].length === 0 && (

                    <div className="text-center py-10">

                      <p className="text-sm text-gray-500">
                        No tasks
                      </p>

                    </div>
                  )}

                  {/* TASKS */}

                  {grouped[key].map(
                    (task, index) => (

                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >

                        {(prov) => (

                          <div
                            ref={prov.innerRef}

                            {...prov.draggableProps}

                            {...prov.dragHandleProps}

                            className="
                              bg-white/10
                              border
                              border-white/10
                              p-4
                              mb-4
                              rounded-2xl
                              cursor-grab
                              active:cursor-grabbing
                              hover:bg-white/20
                              hover:border-purple-500/40
                              transition
                            "
                          >

                            {/* TITLE */}

                            <p className="font-medium">
                              {task.title}
                            </p>

                            {/* BADGES */}

                            <div className="flex flex-wrap gap-2 mt-3">

                              {/* PRIORITY */}

                              <span
                                className={`
                                  text-xs
                                  px-2
                                  py-1
                                  rounded-full
                                  font-medium

                                  ${
                                    task.priority === "HIGH"
                                      ? "bg-red-500/20 text-red-300"

                                      : task.priority === "MEDIUM"
                                      ? "bg-orange-500/20 text-orange-300"

                                      : "bg-gray-500/20 text-gray-300"
                                  }
                                `}
                              >
                                {task.priority}
                              </span>

                              {/* GOAL */}

                              {task.goal && (

                                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">

                                  {task.goal.title}

                                </span>
                              )}

                            </div>

                            {/* BOTTOM */}

                            <div className="flex justify-between items-center mt-5 text-xs text-gray-400">

                              <div>

                                {task.assignee?.name
                                  ? `Assigned to ${task.assignee.name}`
                                  : "Unassigned"}

                              </div>

                              <div>

                                {new Date(
                                  task.createdAt
                                ).toLocaleDateString()}

                              </div>

                            </div>

                          </div>
                        )}

                      </Draggable>
                    )
                  )}

                  {provided.placeholder}

                </div>
              )}

            </Droppable>
          )
        )}

      </div>

    </DragDropContext>
  );
}