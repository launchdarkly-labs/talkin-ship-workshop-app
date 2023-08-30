import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const classitToggle = await prisma.toggletable.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            toggle_name: 'Classic Toggle',
            price: '$2',
            description: 'A simple, wooden toggle for any coat!',
            image: '/toggle-1.jpg',
            category: 'toggle'
        },
    })
    const fanceToggle = await prisma.toggletable.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            toggle_name: 'Fancy Toggle',
            price: '$5',
            description: 'Looking for some new flair? Look no further!',
            image: '/toggle-2.webp',
            category: 'toggle'
        },
    })

    const plasticToggle = await prisma.toggletable.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            toggle_name: 'Plastic Toggle',
            price: '$1',
            description: 'When durability is your main concern, plastic is there.',
            image: '/toggle-3.webp',
            category: 'toggle'
        },
    })

    const metalToggle = await prisma.toggletable.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            toggle_name: 'Metal Toggle',
            price: '$10',
            description: 'For those who need a little more flash from their toggles.',
            image: '/toggle-4.webp',
            category: 'toggle'
        },
    })

    const bulkToggle = await prisma.toggletable.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            toggle_name: 'Bulk Toggles',
            price: '$15',
            description: 'Value Pack! Perfect for when you need a lot of toggles!',
            image: '/toggle-5.jpeg',
            category: 'toggle'
        },
    })

    const cordedToggle = await prisma.toggletable.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            toggle_name: 'Corded Toggle',
            price: '$5',
            description: 'Toggle and cord combo set! Cord not included.',
            image: '/toggle-6.jpeg',
            category: 'toggle'
        },
    })

    const historicToggle = await prisma.toggletable.upsert({
        where: { id: 7 },
        update: {},
        create: {
            id: 7,
            toggle_name: 'Historic Toggle',
            price: '$25',
            description: 'Perfect for whaling outings, definitely not whale bone...',
            image: '/toggle-7.jpeg',
            category: 'toggle'
        },
    })

    const hornToggle = await prisma.toggletable.upsert({
        where: { id: 8 },
        update: {},
        create: {
            id: 8,
            toggle_name: 'Horn Toggle',
            price: '$50',
            description: 'We are not liable for horn toggle related injuries, buyer beware.',
            image: '/toggle-8.jpeg',
            category: 'toggle'
        },
    })

    const glimmeryGoggles = await prisma.toggletable.upsert({
        where: { id: 9 },
        update: {},
        create: {
            id: 9,
            toggle_name: 'Glimmery Goggles',
            price: '$150',
            description: 'Look like a star in these gold goggles.',
            image: '/gold-glasses.jpg',
            category: 'goggle'
        },
    })

    const shadyGoggles = await prisma.toggletable.upsert({
        where: { id: 10 },
        update: {},
        create: {
            id: 10,
            toggle_name: 'Shady Goggles',
            price: '$100',
            description: 'No need to avoid the limelight in these goggles.',
            image: '/dark-glasses.jpg',
            category: 'goggle'
        },
    })

    const shinyGoggles = await prisma.toggletable.upsert({
        where: { id: 11 },
        update: {},
        create: {
            id: 11,
            toggle_name: 'Shiny Goggles',
            price: '$125',
            description: 'Do you play sportball? Doesnt matter. Look like you do in these goggles.',
            image: '/shiny-glasses.jpg',
            category: 'goggle'
        },
    })
    console.log({ classitToggle, fanceToggle, plasticToggle, metalToggle, bulkToggle, cordedToggle, historicToggle, hornToggle, glimmeryGoggles, shadyGoggles, shinyGoggles })


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
