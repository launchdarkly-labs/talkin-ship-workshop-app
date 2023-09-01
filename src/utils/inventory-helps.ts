
import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

const prisma = new PrismaClient()

// @ts-ignore
if (typeof BigInt.prototype.toJSON === 'undefined') {
// @ts-ignore
  BigInt.prototype.toJSON = function() { return this.toString(); };
}

export default async function databaseConnection (req: NextApiRequest, res: NextApiResponse ) {
    const data = await prisma.toggletable.findMany()
