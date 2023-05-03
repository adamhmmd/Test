const express = require('express');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

// add new campaign with new categories

const createCategory = await prisma.campaign.create({
  data: {
    title: 'campaign-1',
    description: `description-1`,
    goal: 20000000,
    currentDonation: 0,
    endDate: new Date(),
    images: `anylink`,
    user: `masih gatau cara link dari tabel user`,
    categories: {
      create: [
        {
          created_at: new Date(),
          updated_at: new Date(),
          category: {
            create: {
              name: 'Category-1',
              description: `description category-1`,
            },
          },
        },
      ],
    },
  },
})

// add new campaign on existing categories

const assignCategories = await prisma.campaign.create({
  data: {
    title: 'campaign=2',
    description: `description-2`,
    goal: 30000000,
    currentDonation: 0,
    endDate: new Date(),
    images: `anylink`,
    user: `masih gatau cara link dari tabel user`,
    categories: {
      create: [
        {
          created_at: new Date(),
          updated_at: new Date(),
          category: {
            connect: {
              id: 1,
            },
          },
        },
        {
          user: 'x',
          created_at: new Date(),
          category: {
            connect: {
              id: 2,
            },
          },
        },
      ],
    },
  },
})

// Get some campaign with category assignment

const getCampaign = await prisma.campaign.findMany({
  where: {
    categories: {
      some: {
        category: {
          name: 'Category-1',
        },
      },
    },
  },
})

// Get categories with campaign assignment

const getAssignments = await prisma.category.findMany({
  where: {
    campaign: {
      some: {
        user: 'masih belum tau juga cara linknya',
        campaign: {
          title: {
            contains: 'random',
          },
        },
      },
    },
  },
})

// Get all 

const getCampaignAndCategories = await prisma.campaign.findMany({
  include: {
    categories: true,
  },
})


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});