import supertest from "supertest";
import app from "../src/app"
import { FruitInput } from "services/fruits-service"
import { getSpecificFruit } from "../src/controllers/fruits-controller"
import fruits from "data/fruits";
import { Fruit } from "repositories/fruits-repository";

const server = supertest(app);

describe("GET /fruits", () => {



    it("it should return all the fruits", async () => {

        const result = await server.get('/fruits')

        expect(result.status).toBe(200);
        expect(result.body).toEqual(fruits)
    });

    //-------------------------------------------------------------

    it("it should return a specific fruit", async () => {

        const result = await server.get('/fruits/2')
        const fruit: Fruit = {
            id: 2,
            name: 'maça',
            price: 5,
        }
        expect(result.status).toBe(200);
        expect(result.body).toEqual(fruit)
    });

    it("it should respond with status 404 when fruit doesnt exist", async () => {

        const result = await server.get('/fruits/9')

        expect(result.status).toBe(404);
    });

    //-------------------------------------------------------------

    it("it should ", async () => {
        const fruit: FruitInput = {
            name: 'uva',
            price: 15,
        }
        const result = await server.post('/fruits').send(fruit)
        expect(result.status).toBe(201);
    });


    it("it should respond with status 409 when there is a conflict", async () => {
        const fruit: FruitInput = {
            name: 'maça',
            price: 5,
        }
        const result = await server.post('/fruits').send(fruit)
        expect(result.status).toBe(409);
    });

})












