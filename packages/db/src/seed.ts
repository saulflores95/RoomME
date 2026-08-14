import { eq } from "drizzle-orm";

import { db } from "./client";
import {
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
    id: "seed-host-cdmx",
    name: "María López",
    email: "maria.host@roomme.local",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    bio: "Diseñadora en Roma Norte. Me encanta cocinar los domingos y mantener la casa limpia pero relajada. Busco roomies responsables y con buena vibra.",
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
      title: "Habitación con luz natural",
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
      title: "Cuarto privado en loft",
      includes: ["wifi", "water", "electricity"],
      householdGender: "mixed" as const,
      preferredAgeMin: 24,
      preferredAgeMax: 40,
      hasPets: false,
      acceptsPets: false,
      bathroomType: "shared" as const,
      furnished: "furnished" as const,
      depositMonths: 1,
      leaseMonths: 12,
      couplesAllowed: true,
      smokingPolicy: "outdoor" as const,
      overnightGuests: "yes" as const,
      wfhFriendly: true,
      quietHome: false,
      cleanliness: "average" as const,
    },
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

  const romaRoom = rooms.find(
    (room) => room.title === "Habitación con luz natural",
  );
  const loftRoom = rooms.find(
    (room) => room.title === "Cuarto privado en loft",
  );
  const qroRoom = rooms.find(
    (room) => room.title === "Habitación en planta baja",
  );

  if (!romaRoom || !loftRoom || !qroRoom) {
    return;
  }

  const existingApplications = await db.query.Application.findMany({
    limit: 1,
  });
  if (existingApplications.length === 0) {
    await db.insert(Application).values([
      {
        roomId: romaRoom.id,
        applicantId: "seed-roomie-ana",
        message:
          "¡Hola María! Me encanta Roma Norte y busco un espacio limpio para trabajar desde casa.",
        status: "pending",
      },
      {
        roomId: romaRoom.id,
        applicantId: "seed-roomie-sofia",
        message:
          "Soy tranquila, limpia y tengo un gatito. ¿Aceptan mascotas pequeñas?",
        status: "pending",
      },
      {
        roomId: loftRoom.id,
        applicantId: "seed-roomie-luis",
        message:
          "Me gusta Condesa y el loft se ve genial. Puedo mudarme este mes.",
        status: "pending",
      },
      {
        roomId: qroRoom.id,
        applicantId: "seed-roomie-luis",
        message:
          "Busco algo en Centro Sur cerca del trabajo. Soy ordenado y sin drama.",
        status: "pending",
      },
    ]);
  }

  const existingStays = await db.query.Stay.findMany({ limit: 1 });
  if (existingStays.length > 0) {
    return;
  }

  const pastStart = new Date("2024-01-15");
  const pastEnd = new Date("2025-06-01");

  const [anaStay] = await db
    .insert(Stay)
    .values({
      roomId: romaRoom.id,
      userId: "seed-roomie-ana",
      startedAt: pastStart,
      endedAt: pastEnd,
      status: "past",
    })
    .returning();

  const [luisStay] = await db
    .insert(Stay)
    .values({
      roomId: qroRoom.id,
      userId: "seed-roomie-luis",
      startedAt: pastStart,
      endedAt: pastEnd,
      status: "past",
    })
    .returning();

  if (!anaStay || !luisStay) {
    return;
  }

  await db.insert(RoommeRating).values([
    {
      raterId: "seed-roomie-ana",
      rateeId: "seed-host-cdmx",
      stayId: anaStay.id,
      score: 5,
      comment:
        "María es una anfitriona excelente: clara, limpia y súper amable.",
    },
    {
      raterId: "seed-host-cdmx",
      rateeId: "seed-roomie-ana",
      stayId: anaStay.id,
      score: 5,
      comment:
        "Ana fue una roomie ideal. Respetuosa y siempre dejaba todo ordenado.",
    },
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
  ]);
}

async function seed(): Promise<void> {
  await upsertUsers();

  const existingComplexes = await db.query.Complex.findMany({ limit: 1 });
  if (existingComplexes.length > 0) {
    await backfillRoomFilters();
    await seedApplicationsAndRatings();
    console.log("Seed listings already exist, updated profiles/applications.");
    return;
  }

  const [roma] = await db
    .insert(Complex)
    .values({
      title: "Casa Roma Norte",
      description:
        "Departamento luminoso a dos cuadras de Álvaro Obregón. Áreas comunes con cocina completa, rooftop y lavandería. Ideal para roomies que trabajan en la Roma o Condesa.",
      addressLine1: "Calle Orizaba 123",
      city: "cdmx",
      neighborhood: "Roma Norte",
      postalCode: "06700",
      country: "MX",
      latitude: 19.4194,
      longitude: -99.1606,
      amenities: ["wifi", "rooftop", "laundry", "kitchen"],
      petFriendly: true,
    })
    .returning();

  const [condesa] = await db
    .insert(Complex)
    .values({
      title: "Loft Condesa",
      description:
        "Loft con techos altos cerca de Parque México. Seguridad 24/7 y terraza compartida. Perfecto para expats y nómadas en CDMX.",
      addressLine1: "Avenida Amsterdam 45",
      city: "cdmx",
      neighborhood: "Condesa",
      postalCode: "06100",
      country: "MX",
      latitude: 19.4116,
      longitude: -99.1703,
      amenities: ["wifi", "security", "terrace", "furnished"],
      petFriendly: false,
    })
    .returning();

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

  if (!roma || !condesa || !centroSur || !juriquilla) {
    throw new Error("Failed to insert seed complexes");
  }

  await db.insert(ComplexImage).values([
    {
      complexId: roma.id,
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      alt: "Sala en Roma Norte",
      kind: "common",
      sortOrder: 0,
    },
    {
      complexId: condesa.id,
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      alt: "Loft en Condesa",
      kind: "common",
      sortOrder: 0,
    },
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
  ]);

  const rooms = await db
    .insert(Room)
    .values([
      {
        hostId: "seed-host-cdmx",
        complexId: roma.id,
        addressLine1: "Calle Orizaba 123",
        city: "cdmx",
        neighborhood: "Roma Norte",
        latitude: 19.4194,
        longitude: -99.1606,
        title: "Habitación con luz natural",
        description:
          "Recámara amueblada con closet, escritorio y ventana a la calle. Incluye Wi-Fi, agua, gas y limpieza de áreas comunes.",
        rentPriceCents: 1_200_000,
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
        hostId: "seed-host-cdmx",
        complexId: condesa.id,
        addressLine1: "Avenida Amsterdam 45",
        city: "cdmx",
        neighborhood: "Condesa",
        latitude: 19.4116,
        longitude: -99.1703,
        title: "Cuarto privado en loft",
        description:
          "Espacio privado con cama queen y baño compartido. A pasos de cafés y Parque México.",
        rentPriceCents: 1_450_000,
        currency: "MXN",
        includes: ["wifi", "water", "electricity"],
        capacity: 3,
        householdGender: "mixed",
        preferredAgeMin: 24,
        preferredAgeMax: 40,
        hasPets: false,
        acceptsPets: false,
        bathroomType: "shared",
        furnished: "furnished",
        depositMonths: 1,
        leaseMonths: 12,
        couplesAllowed: true,
        smokingPolicy: "outdoor",
        overnightGuests: "yes",
        wfhFriendly: true,
        quietHome: false,
        cleanliness: "average",
        availableFrom: now,
        status: "listed",
      },
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
    ])
    .returning();

  const roomImageUrls = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
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
  console.log(`Seeded ${rooms.length} rooms in CDMX and Querétaro.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
