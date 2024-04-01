import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/db/prisma";
import { createTeamSchema } from "@/lib/validation/team";
import { validateUser } from "@/lib/utils";

export async function GET() {
  try {
    const userId = validateUser();

    const teams = await prisma.team.findMany({
      where: { userId },
      include: { teamPlayers: { include: { player: true } } },
    });

    const teamsSimplified = teams.map((team) => {
      const players = team.teamPlayers
        .map((teamPlayer) => teamPlayer.player)
        .reverse();

      const { teamPlayers, ...playerWithoutTeamPlayers } = team;

      return { ...playerWithoutTeamPlayers, players };
    });

    return NextResponse.json(teamsSimplified, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = validateUser();

    const body = await req.json();
    const parsedRes = createTeamSchema.safeParse(body);

    if (!parsedRes.success) {
      console.error(parsedRes.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, playerIds, captain } = parsedRes.data;

    const team = await prisma.team.create({
      data: {
        userId,
        name,
        teamPlayers: {
          create: playerIds.map((playerId: string) => ({
            player: { connect: { id: playerId } },
          })),
        },
        captain,
      },
      include: { teamPlayers: true },
    });
    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
