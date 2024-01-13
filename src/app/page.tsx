'use client'
import React, { useState, useRef } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const buttonStyles =
  "px-3 py-1 rounded-full transition duration-300 ease-in-out";
const completedButtonStyles =
  "bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600 hover:text-white";
const incompleteButtonStyles =
  "bg-gradient-to-r from-orange-500 to-purple-500 text-white hover:from-orange-600 hover:to-purple-600 hover:text-white";

// Replace with your audio file URL

const TodoPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Date.now(),
      title: "Sample Todo",
      description: "This is a sample todo description.",
      completed: false,
    },
  ]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const addTodo = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        title: input,
        description: descriptionInput,
        completed: false,
      },
    ]);
    setInput("");
    setDescriptionInput("");
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const reorderTodos = () => {
    setTodos((prevTodos) => [...prevTodos].reverse());
  };

  const openEditSidebar = (todo: Todo) => {
    setSelectedTodo(todo);
    setInput(todo.title);
    setDescriptionInput(todo.description);
  };

  const closeEditSidebar = () => {
    setSelectedTodo(null);
    setInput("");
    setDescriptionInput("");
  };

  const editTodo = () => {
    if (selectedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === selectedTodo.id
            ? {
                ...todo,
                title: input,
                description: descriptionInput,
              }
            : todo
        )
      );
      setSelectedTodo(null);
      setInput("");
      setDescriptionInput("");
    }
  };
return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 text-white">
    <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-lg flex-grow">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Todo List</h1>
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
          placeholder="Enter Your Todo"
          className="flex-grow p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 text-gray-800"
        />
        <textarea
          value={descriptionInput}
          onChange={({ target: { value } }) => setDescriptionInput(value)}
          placeholder="Enter Todo Description"
          className="flex-grow p-3 border-b-2 border-blue-400 resize-none focus:outline-none focus:border-blue-600 text-gray-800"
        />
        <button
          onClick={addTodo}
          className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-purple-600 hover:text-white transition duration-300 ease-in-out"
        >
          Add
        </button>
      </div>
      <div className="mt-6">
        {todos.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-4 my-2 bg-gray-200 border rounded ${
              item.completed ? "bg-green-100" : ""
            } transition duration-300 ease-in-out transform hover:scale-105`}
          >
            <div>
              <h2 className={`text-lg ${item.completed ? "line-through" : ""}`}>
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => toggleCompleted(item.id)}
                className={`${buttonStyles} ${
                  item.completed
                    ? completedButtonStyles
                    : incompleteButtonStyles
                }`}
              >
                {item.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => openEditSidebar(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() => removeTodo(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={clearCompleted}
          className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
          Clear Completed
        </button>
        <button
          onClick={reorderTodos}
          className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-purple-600 hover:text-white transition duration-300 ease-in-out"
        >
          Reorder Todos
        </button>
      </div>
      <div className="mt-6">
      </div>
    </div>
    {selectedTodo && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Todo
          </h2>
          <input
            type="text"
            value={input}
            onChange={({ target: { value } }) => setInput(value)}
            placeholder="Edit Your Todo"
            className="w-full p-3 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-gray-800"
          />
          <textarea
            value={descriptionInput}
            onChange={({ target: { value } }) => setDescriptionInput(value)}
            placeholder="Edit Todo Description"
            className="w-full p-3 border-b-2 border-blue-500 resize-none focus:outline-none focus:border-blue-700 text-gray-800"
          />
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={editTodo}
              className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={closeEditSidebar}
              className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default TodoPage;
