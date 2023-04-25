import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // Route implementation will go here
  if (req.method === "POST") {
  // Parse the request body to get the event data
  const eventData = req.body;

  // Validate the data and return an error response if necessary

  // Create a new PrismaClient instance
  const prisma = new PrismaClient();

  // Use Prisma to create the event in the database
  const newEvent = await prisma.event.create({
    data: eventData,
  });

  // Close the Prisma connection
  await prisma.$disconnect();

  // Return a success response with the created event data
  res.status(201).json(newEvent);
} else {
  // Return a 405 response for unsupported request methods
  res.status(405).json({ message: "Method not allowed" });
}
};

