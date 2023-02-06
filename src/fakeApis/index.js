import { createServer, Model } from "miragejs"

export const setupServer = () => {
    return createServer({
        models: {
            todos: Model,
        },
        // seeds(server) {
        //     server.create("todos", { name: "Learn React", completed: true, priority: "High" })

        // },
        routes() {
            this.get("/api/todos", (schema) => {
                return schema.todos.all();
            })
            this.post("/api/todos", (schema, request) => {
                let currenTodo = JSON.parse(request.requestBody)
                return schema.todos.create(currenTodo);
            })
            this.post("/api/toggleCompleted", (schema, request) => {
                let idTodo = JSON.parse(request.requestBody)
                console.log((idTodo));
                let currenTodo = schema.todos.find(idTodo);
                currenTodo.update({ completed: !currenTodo.completed });
                return currenTodo;
            })
        },
    })
}
