import { rest } from "msw";

let todos = [
  { id: 1, text: "먹기" },
  { id: 2, text: "자기" },
  { id: 3, text: "놀기" }
];

export const handlers = [
  // 할일 목록
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 할일 추가
  rest.post("/todos", (req, res, ctx) => {
    const newTodo = {
      id: todos.length + 1,
      text: req.body
    };
    todos.push(newTodo);
    return res(ctx.status(201));
  }),

  // 할일 수정
  rest.put("/todos/:id", (req, res, ctx) => {
    const todoId = parseInt(req.params.id);
    const updatedTodo = {
      id: todoId,
      text: req.body
    };
    const index = todos.findIndex((todo) => todo.id === todoId);
    todos[index] = updatedTodo;
    return res(ctx.status(200));
  }),

  // 할일 삭제
  rest.delete("/todos/:id", (req, res, ctx) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== todoId);
    return res(ctx.status(200));
  })
];