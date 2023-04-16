/*
    https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
    Prisma should have a single instance per application, since the number of instances matter,
    since each instance of PrismaClient creates a new connection to the database.
    With this approach, we create only one, which is created and cached the first time it is instaced,
    the next calls to this object, get the cached instance.
*/

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export { prisma }
