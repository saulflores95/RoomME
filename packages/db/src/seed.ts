import { eq, sql } from "drizzle-orm";

import { db } from "./client";
import {
  AgentWeeklyHours,
  Application,
  Complex,
  ComplexImage,
  Room,
  RoomImage,
  RoommeRating,
  Stay,
  user,
} from "./schema";

const now = new Date();

const hosts = [
  {
    id: "seed-host-maria",
    name: "María López",
    email: "maria.host@roomme.local",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    bio: "Diseñadora en Centro Sur. Me encanta cocinar los domingos y mantener la casa limpia pero relajada. Busco roomies responsables y con buena vibra.",
    birthDate: new Date("1996-04-12"),
    role: "roomie,host",
  },
  {
    id: "seed-host-qro",
    name: "Diego Ramírez",
    email: "diego.host@roomme.local",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bio: "Ingeniero en Querétaro. Trabajo híbrido, me gusta el gym y las tardes tranquilas. La casa es pet-friendly y WFH friendly.",
    birthDate: new Date("1993-09-03"),
    role: "roomie,host",
  },
] as const;

const roomies = [
  {
    id: "seed-roomie-ana",
    name: "Ana Torres",
    email: "ana.roomie@roomme.local",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    bio: "Product designer de 28 años. Busco un espacio luminoso cerca de cafés. Soy ordenada, no fumo y trabajo desde casa 3 días a la semana.",
    birthDate: new Date("1998-02-18"),
    role: "roomie",
  },
  {
    id: "seed-roomie-luis",
    name: "Luis Mendoza",
    email: "luis.roomie@roomme.local",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bio: "Desarrollador full-stack. Me gusta cocinar, ver series y salir a correr. Busco roomies respetuosos del silencio en la noche.",
    birthDate: new Date("1995-11-07"),
    role: "roomie",
  },
  {
    id: "seed-roomie-sofia",
    name: "Sofía Chen",
    email: "sofia.roomie@roomme.local",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    bio: "Estudiante de maestría y freelance de marketing. Soy sociable, limpia y tengo un gato (sí, soy package deal).",
    birthDate: new Date("1999-06-22"),
    role: "roomie",
  },
] as const;

async function removeCdmxListings(): Promise<void> {
  await db.execute(sql`
    DELETE FROM complex WHERE city::text = 'cdmx'
  `);
  await db.execute(sql`
    DELETE FROM room WHERE city::text = 'cdmx'
  `);
  await db.execute(sql`
    UPDATE "user"
    SET operating_cities = array_remove(operating_cities, 'cdmx')
    WHERE 'cdmx' = ANY(operating_cities)
  `);
  await db.execute(sql`
    DELETE FROM "user" WHERE id = 'seed-host-cdmx'
  `);
}

async function upsertUsers(): Promise<void> {
  for (const person of [...hosts, ...roomies]) {
    const existing = await db.query.user.findFirst({
      where: eq(user.id, person.id),
    });

    if (existing) {
      await db
        .update(user)
        .set({
          name: person.name,
          image: person.image,
          bio: person.bio,
          birthDate: person.birthDate,
          role: person.role,
          updatedAt: now,
        })
        .where(eq(user.id, person.id));
      continue;
    }

    await db.insert(user).values({
      id: person.id,
      name: person.name,
      email: person.email,
      emailVerified: true,
      image: person.image,
      bio: person.bio,
      birthDate: person.birthDate,
      createdAt: now,
      updatedAt: now,
      role: person.role,
      banned: false,
    });
  }
}

async function backfillRoomFilters(): Promise<void> {
  const updates = [
    {
      title: "Habitación en planta baja",
      includes: ["wifi", "water", "electricity", "gas"],
      householdGender: "male" as const,
      preferredAgeMin: 18,
      preferredAgeMax: 30,
      hasPets: false,
      acceptsPets: true,
      bathroomType: "private" as const,
      furnished: "semi" as const,
      depositMonths: 1,
      leaseMonths: 12,
      couplesAllowed: false,
      smokingPolicy: "no" as const,
      overnightGuests: "ask" as const,
      wfhFriendly: true,
      quietHome: true,
      cleanliness: "average" as const,
    },
    {
      title: "Suite con vista al jardín",
      includes: ["wifi", "water", "electricity", "gas", "cleaning"],
      householdGender: "mixed" as const,
      preferredAgeMin: 25,
      preferredAgeMax: 45,
      hasPets: true,
      acceptsPets: true,
      bathroomType: "private" as const,
      furnished: "furnished" as const,
      depositMonths: 2,
      leaseMonths: 12,
      couplesAllowed: true,
      smokingPolicy: "no" as const,
      overnightGuests: "no" as const,
      wfhFriendly: true,
      quietHome: true,
      cleanliness: "tidy" as const,
    },
    {
      title: "Cuarto luminoso en Centro Sur",
      includes: ["wifi", "water", "electricity", "gas", "cleaning"],
      householdGender: "female" as const,
      preferredAgeMin: 22,
      preferredAgeMax: 35,
      hasPets: true,
      acceptsPets: true,
      bathroomType: "shared" as const,
      furnished: "furnished" as const,
      depositMonths: 1,
      leaseMonths: 6,
      couplesAllowed: false,
      smokingPolicy: "no" as const,
      overnightGuests: "ask" as const,
      wfhFriendly: true,
      quietHome: false,
      cleanliness: "tidy" as const,
    },
    {
      title: "Habitación cerca del campus",
      includes: ["wifi", "water", "electricity"],
      householdGender: "mixed" as const,
      preferredAgeMin: 20,
      preferredAgeMax: 32,
      hasPets: false,
      acceptsPets: false,
      bathroomType: "shared" as const,
      furnished: "furnished" as const,
      depositMonths: 1,
      leaseMonths: 12,
      couplesAllowed: false,
      smokingPolicy: "outdoor" as const,
      overnightGuests: "yes" as const,
      wfhFriendly: true,
      quietHome: false,
      cleanliness: "average" as const,
    },
  ];

  for (const { title, ...values } of updates) {
    await db
      .update(Room)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(Room.title, title));
  }
}

async function seedApplicationsAndRatings(): Promise<void> {
  const rooms = await db.query.Room.findMany({
    columns: { id: true, title: true, hostId: true },
  });

  const centroSurRoom = rooms.find(
    (room) => room.title === "Habitación en planta baja",
  );
  const gardenRoom = rooms.find(
    (room) => room.title === "Suite con vista al jardín",
  );
  const mariaRoom = rooms.find(
    (room) => room.title === "Cuarto luminoso en Centro Sur",
  );

  if (!centroSurRoom || !gardenRoom) {
    return;
  }

  const existingApplications = await db.query.Application.findMany({
    limit: 1,
  });
  if (existingApplications.length === 0) {
    const values = [
      {
        roomId: centroSurRoom.id,
        applicantId: "seed-roomie-luis",
        message:
          "Busco algo en Centro Sur cerca del trabajo. Soy ordenado y sin drama.",
        status: "pending" as const,
      },
      {
        roomId: gardenRoom.id,
        applicantId: "seed-roomie-sofia",
        message:
          "Soy tranquila, limpia y tengo un gatito. ¿Aceptan mascotas pequeñas?",
        status: "pending" as const,
      },
    ];

    if (mariaRoom) {
      values.push(
        {
          roomId: mariaRoom.id,
          applicantId: "seed-roomie-ana",
          message:
            "¡Hola María! Me encanta Centro Sur y busco un espacio limpio para trabajar desde casa.",
          status: "pending" as const,
        },
        {
          roomId: mariaRoom.id,
          applicantId: "seed-roomie-sofia",
          message: "Busco un hogar pet-friendly y con buena luz natural.",
          status: "pending" as const,
        },
      );
    }

    await db.insert(Application).values(values);
  }

  const existingStays = await db.query.Stay.findMany({ limit: 1 });
  if (existingStays.length > 0) {
    return;
  }

  const pastStart = new Date("2024-01-15");
  const pastEnd = new Date("2025-06-01");

  const [luisStay] = await db
    .insert(Stay)
    .values({
      roomId: centroSurRoom.id,
      userId: "seed-roomie-luis",
      startedAt: pastStart,
      endedAt: pastEnd,
      status: "past",
    })
    .returning();

  if (!luisStay) {
    return;
  }

  const ratings = [
    {
      raterId: "seed-roomie-luis",
      rateeId: "seed-host-qro",
      stayId: luisStay.id,
      score: 4,
      comment:
        "Diego es puntual con las cuentas y el ambiente de la casa es tranquilo.",
    },
    {
      raterId: "seed-host-qro",
      rateeId: "seed-roomie-luis",
      stayId: luisStay.id,
      score: 5,
      comment: "Luis es responsable y fácil de vivir. Lo recomiendo mucho.",
    },
  ];

  if (mariaRoom) {
    const [anaStay] = await db
      .insert(Stay)
      .values({
        roomId: mariaRoom.id,
        userId: "seed-roomie-ana",
        startedAt: pastStart,
        endedAt: pastEnd,
        status: "past",
      })
      .returning();

    if (anaStay) {
      ratings.push(
        {
          raterId: "seed-roomie-ana",
          rateeId: "seed-host-maria",
          stayId: anaStay.id,
          score: 5,
          comment:
            "María es una anfitriona excelente: clara, limpia y súper amable.",
        },
        {
          raterId: "seed-host-maria",
          rateeId: "seed-roomie-ana",
          stayId: anaStay.id,
          score: 5,
          comment:
            "Ana fue una roomie ideal. Respetuosa y siempre dejaba todo ordenado.",
        },
      );
    }
  }

  await db.insert(RoommeRating).values(ratings);
}

async function seedAgents(): Promise<void> {
  const agents = [
    {
      id: "seed-agent-qro",
      name: "Andrés Vega",
      email: "andres.agent@roomme.local",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      bio: "Agente en Querétaro. Conozco Centro Sur y Juriquilla de punta a punta.",
      birthDate: new Date("1991-07-22"),
      role: "agent",
      hobbies: ["running", "música"],
      personalities: ["directo", "puntual"],
      hasPets: true,
      documentUrl:
        "https://images.unsplash.com/photo-1554224311-beee415c201f?auto=format&fit=crop&w=800&q=80",
      operatingCities: ["queretaro"] as const,
    },
    {
      id: "seed-agent-qro-2",
      name: "Camila Ortega",
      email: "camila.agent@roomme.local",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Agente en Querétaro. Tours en Centro Sur, Juriquilla y El Refugio. Puntual y clara con los detalles del depa.",
      birthDate: new Date("1994-02-18"),
      role: "agent",
      hobbies: ["café", "fotos", "caminar"],
      personalities: ["organizada", "amigable"],
      hasPets: false,
      documentUrl:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      operatingCities: ["queretaro"] as const,
    },
  ];

  await db.execute(sql`DELETE FROM "user" WHERE id = 'seed-agent-cdmx'`);

  for (const agent of agents) {
    const existing = await db.query.user.findFirst({
      where: eq(user.id, agent.id),
    });

    if (existing) {
      await db
        .update(user)
        .set({
          name: agent.name,
          bio: agent.bio,
          birthDate: agent.birthDate,
          image: agent.image,
          role: agent.role,
          hobbies: [...agent.hobbies],
          personalities: [...agent.personalities],
          hasPets: agent.hasPets,
          documentUrl: agent.documentUrl,
          operatingCities: [...agent.operatingCities],
          updatedAt: now,
        })
        .where(eq(user.id, agent.id));
    } else {
      await db.insert(user).values({
        id: agent.id,
        name: agent.name,
        email: agent.email,
        emailVerified: true,
        image: agent.image,
        bio: agent.bio,
        birthDate: agent.birthDate,
        hobbies: [...agent.hobbies],
        personalities: [...agent.personalities],
        hasPets: agent.hasPets,
        documentUrl: agent.documentUrl,
        operatingCities: [...agent.operatingCities],
        createdAt: now,
        updatedAt: now,
        role: agent.role,
        banned: false,
      });
    }

    await db
      .delete(AgentWeeklyHours)
      .where(eq(AgentWeeklyHours.agentId, agent.id));

    await db.insert(AgentWeeklyHours).values(
      [1, 2, 3, 4, 5].map((dayOfWeek) => ({
        agentId: agent.id,
        dayOfWeek,
        startMinute: 10 * 60,
        endMinute: 18 * 60,
      })),
    );
  }

  console.log(`Seeded ${agents.length} agents with weekly hours.`);
}

async function seed(): Promise<void> {
  await removeCdmxListings();
  await upsertUsers();
  await seedAgents();

  const existingComplexes = await db.query.Complex.findMany({ limit: 1 });
  if (existingComplexes.length > 0) {
    await backfillRoomFilters();
    await seedApplicationsAndRatings();
    console.log("Seed listings already exist, updated Querétaro profiles.");
    return;
  }

  const [centroSur] = await db
    .insert(Complex)
    .values({
      title: "Casa Centro Sur",
      description:
        "Casa compartida en Querétaro Centro Sur, cerca de plazas y transporte. Patio interior y estacionamiento.",
      addressLine1: "Blvd. Bernardo Quintana 202",
      city: "queretaro",
      neighborhood: "Centro Sur",
      postalCode: "76090",
      country: "MX",
      latitude: 20.5736,
      longitude: -100.387,
      amenities: ["wifi", "parking", "patio", "kitchen"],
      petFriendly: true,
    })
    .returning();

  const [juriquilla] = await db
    .insert(Complex)
    .values({
      title: "Residencial Juriquilla",
      description:
        "Habitación en residencial cerrado de Juriquilla, Querétaro. Alberca, gimnasio y áreas verdes.",
      addressLine1: "Paseo de la República 800",
      city: "queretaro",
      neighborhood: "Juriquilla",
      postalCode: "76230",
      country: "MX",
      latitude: 20.709,
      longitude: -100.447,
      amenities: ["wifi", "pool", "gym", "garden"],
      petFriendly: true,
    })
    .returning();

  const [alamos] = await db
    .insert(Complex)
    .values({
      title: "Casa Los Álamos",
      description:
        "Casa amplia en Los Álamos con cocina compartida, lavandería y terraza. Ideal para young professionals en Querétaro.",
      addressLine1: "Calle Los Álamos 45",
      city: "queretaro",
      neighborhood: "Los Álamos",
      postalCode: "76160",
      country: "MX",
      latitude: 20.6012,
      longitude: -100.412,
      amenities: ["wifi", "laundry", "terrace", "kitchen"],
      petFriendly: true,
    })
    .returning();

  const [elRefugio] = await db
    .insert(Complex)
    .values({
      title: "Loft El Refugio",
      description:
        "Loft moderno cerca de plazas comerciales en El Refugio. Seguridad y áreas comunes amuebladas.",
      addressLine1: "Av. El Refugio 120",
      city: "queretaro",
      neighborhood: "El Refugio",
      postalCode: "76146",
      country: "MX",
      latitude: 20.641,
      longitude: -100.432,
      amenities: ["wifi", "security", "furnished", "parking"],
      petFriendly: false,
    })
    .returning();

  if (!centroSur || !juriquilla || !alamos || !elRefugio) {
    throw new Error("Failed to insert seed complexes");
  }

  await db.insert(ComplexImage).values([
    {
      complexId: centroSur.id,
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      alt: "Casa en Centro Sur",
      kind: "exterior",
      sortOrder: 0,
    },
    {
      complexId: juriquilla.id,
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      alt: "Residencial Juriquilla",
      kind: "exterior",
      sortOrder: 0,
    },
    {
      complexId: alamos.id,
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      alt: "Sala en Los Álamos",
      kind: "common",
      sortOrder: 0,
    },
    {
      complexId: elRefugio.id,
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      alt: "Loft El Refugio",
      kind: "common",
      sortOrder: 0,
    },
  ]);

  const rooms = await db
    .insert(Room)
    .values([
      {
        hostId: "seed-host-qro",
        complexId: centroSur.id,
        addressLine1: "Blvd. Bernardo Quintana 202",
        city: "queretaro",
        neighborhood: "Centro Sur",
        latitude: 20.5736,
        longitude: -100.387,
        title: "Habitación en planta baja",
        description:
          "Cuarto con baño propio, patio y estacionamiento. Ambiente tranquilo para estudiantes y young professionals.",
        rentPriceCents: 800_000,
        currency: "MXN",
        includes: ["wifi", "water", "electricity", "gas"],
        capacity: 2,
        householdGender: "male",
        preferredAgeMin: 18,
        preferredAgeMax: 30,
        hasPets: false,
        acceptsPets: true,
        bathroomType: "private",
        furnished: "semi",
        depositMonths: 1,
        leaseMonths: 12,
        couplesAllowed: false,
        smokingPolicy: "no",
        overnightGuests: "ask",
        wfhFriendly: true,
        quietHome: true,
        cleanliness: "average",
        availableFrom: now,
        status: "listed",
      },
      {
        hostId: "seed-host-qro",
        complexId: juriquilla.id,
        addressLine1: "Paseo de la República 800",
        city: "queretaro",
        neighborhood: "Juriquilla",
        latitude: 20.709,
        longitude: -100.447,
        title: "Suite con vista al jardín",
        description:
          "Habitación amplia con vista a áreas verdes. Acceso a alberca y gym del residencial.",
        rentPriceCents: 950_000,
        currency: "MXN",
        includes: ["wifi", "water", "electricity", "gas", "cleaning"],
        capacity: 2,
        householdGender: "mixed",
        preferredAgeMin: 25,
        preferredAgeMax: 45,
        hasPets: true,
        acceptsPets: true,
        bathroomType: "private",
        furnished: "furnished",
        depositMonths: 2,
        leaseMonths: 12,
        couplesAllowed: true,
        smokingPolicy: "no",
        overnightGuests: "no",
        wfhFriendly: true,
        quietHome: true,
        cleanliness: "tidy",
        availableFrom: now,
        status: "listed",
      },
      {
        hostId: "seed-host-maria",
        complexId: alamos.id,
        addressLine1: "Calle Los Álamos 45",
        city: "queretaro",
        neighborhood: "Los Álamos",
        latitude: 20.6012,
        longitude: -100.412,
        title: "Cuarto luminoso en Centro Sur",
        description:
          "Recámara amueblada con closet, escritorio y buena luz. Incluye Wi-Fi, agua, gas y limpieza de áreas comunes.",
        rentPriceCents: 850_000,
        currency: "MXN",
        includes: ["wifi", "water", "electricity", "gas", "cleaning"],
        capacity: 2,
        householdGender: "female",
        preferredAgeMin: 22,
        preferredAgeMax: 35,
        hasPets: true,
        acceptsPets: true,
        bathroomType: "shared",
        furnished: "furnished",
        depositMonths: 1,
        leaseMonths: 6,
        couplesAllowed: false,
        smokingPolicy: "no",
        overnightGuests: "ask",
        wfhFriendly: true,
        quietHome: false,
        cleanliness: "tidy",
        availableFrom: now,
        status: "listed",
      },
      {
        hostId: "seed-host-maria",
        complexId: elRefugio.id,
        addressLine1: "Av. El Refugio 120",
        city: "queretaro",
        neighborhood: "El Refugio",
        latitude: 20.641,
        longitude: -100.432,
        title: "Habitación cerca del campus",
        description:
          "Espacio privado con cama queen y baño compartido. A pasos de plazas y transporte.",
        rentPriceCents: 780_000,
        currency: "MXN",
        includes: ["wifi", "water", "electricity"],
        capacity: 3,
        householdGender: "mixed",
        preferredAgeMin: 20,
        preferredAgeMax: 32,
        hasPets: false,
        acceptsPets: false,
        bathroomType: "shared",
        furnished: "furnished",
        depositMonths: 1,
        leaseMonths: 12,
        couplesAllowed: false,
        smokingPolicy: "outdoor",
        overnightGuests: "yes",
        wfhFriendly: true,
        quietHome: false,
        cleanliness: "average",
        availableFrom: now,
        status: "listed",
      },
    ])
    .returning();

  const roomImageUrls = [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
  ] as const;

  await db.insert(RoomImage).values(
    rooms.map((room, index) => {
      const url = roomImageUrls[index];
      if (url === undefined) {
        throw new Error(`Missing seed image URL at index ${index}`);
      }

      return {
        roomId: room.id,
        url,
        alt: room.title,
        kind: "room" as const,
        sortOrder: 0,
      };
    }),
  );

  await seedApplicationsAndRatings();
  console.log(`Seeded ${rooms.length} rooms in Querétaro.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
