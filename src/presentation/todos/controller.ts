import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { error } from "console";

export class TodosController {


    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        todo ? res.json(todo) : res.status(404).json({ error: `TODO with ID ${id} NOT FOUND` });

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create(
            {
                id,
                ...req.body,
            }
        );
        if (error) return res.status(400).json({ error });
        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if (!todo) return res.status(404).json({ error: `TODO with id ${id} NOT FOUND` })

        const updatedTodo = await prisma.todo.update(
            {
                where: { id },
                data: updateTodoDto!.values
            }
        )
        res.json(updatedTodo);

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `TODO with id ${id} NOT FOUND` })
        const deleted = await prisma.todo.delete({
            where: { id }
        });
        deleted ? res.json(deleted) : res.status(400).json({ error: `TODO with ID ${id} has been deleted` });

    }

}