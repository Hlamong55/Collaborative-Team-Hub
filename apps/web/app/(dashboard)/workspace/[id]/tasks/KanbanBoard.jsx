"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useWorkspaceStore } from "../../../../../lib/store";
import { updateTaskStatus } from "../../../../../lib/api";

const columns = {
  TODO: { title: "To Do" },
  IN_PROGRESS: { title: "In Progress" },
  DONE: { title: "Done" },
};

export default function KanbanBoard() {
  const { tasks, currentWorkspace, updateTask } =
    useWorkspaceStore();

  const grouped = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  tasks.forEach((t) => {
    const key = t.status || "TODO";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      const updated = await updateTaskStatus(
        currentWorkspace.id,
        taskId,
        newStatus
      );

      updateTask(updated);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {Object.entries(columns.map ? columns : columns).map(
          ([key, col]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 min-h-[300px]"
                >
                  <h2 className="font-semibold mb-4">
                    {col.title}
                  </h2>

                  {grouped[key].map((task, index) => (
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
                          className="bg-white/10 p-3 mb-3 rounded cursor-pointer"
                        >
                          <p className="font-medium">
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {task.priority}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}

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