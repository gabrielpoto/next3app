import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({id: z.string()});

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
})

const userUpdateSchema = z.object({
    id:z.string(),
    name:z.string(),
    email:z.string()
})
export const exampleRouter = createTRPCRouter({

    //get All user

    getAllUser: publicProcedure.query(({ctx}) => {
        return ctx.prisma.user.findMany();
    }),

    //get user by id
    getUserById: publicProcedure.input(idSchema).query(({ctx, input}) => {
        return ctx.prisma.user.findUnique({
            where: idSchema.parse(input)
        });
    }),

    //create user
    createUser: publicProcedure.input(userSchema).mutation(({ctx, input}) => {
        return ctx.prisma.user.create({
            data: userSchema.parse(input)
        });
    }),

    //update user
    updateUser: publicProcedure.input(userUpdateSchema).mutation(({ctx, input}) => {
        return ctx.prisma.user.update({
            where: {
                id: input.id.toString(),
            },
            data: userUpdateSchema.parse(input)
        });
    }),

    //delete user
    deleteUser: publicProcedure.input(idSchema).mutation(({ctx, input}) => {
        return ctx.prisma.user.delete({
            where: idSchema.parse(input)
        });
    })

});
