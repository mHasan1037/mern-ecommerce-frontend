import { Category } from "@/types/category";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import React, { useState } from "react";
import ConfirmButton from "../buttons/ConfirmButton";

interface CategoryReorderModalProps {
  categories: Category[];
  onSave: (orderedIds: string[]) => void;
  onClose: () => void;
}

const CategoryReorderModal = ({
  categories,
  onSave,
  onClose,
}: CategoryReorderModalProps) => {
  const [items, setItems] = useState(categories);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col max-h-[80vh]">
        <h2 className="text-lg font-semibold mb-3">Reorder Categories</h2>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="overflow-y-auto flex-1"
              >
                {items.map((cat, index) => (
                  <Draggable key={cat._id} draggableId={cat._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-2 p-2 border-b bg-white ${
                          snapshot.isDragging ? "shadow-md" : ""
                        }`}
                      >
                        <span>⋮⋮</span>
                        {cat.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-3 py-1.5 rounded border" onClick={onClose}>
            Cancel
          </button>
          <ConfirmButton
            buttonText="Save Order"
            onclick={() => onSave(items.map((c) => c._id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryReorderModal;
