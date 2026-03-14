import { get, has } from "lodash";

export interface TBAData {
  readonly code: string; // The event code
  readonly data: unknown; // The data received from the TBA API
}

// Checks if a TBA data object contains an error message.
export const isFailed = (data: unknown) => has(data, "Error");

// Gets the error message from a TBA data object.
export const getError = (data: unknown) => get(data, "Error");

// Gets a team's name given their number and a list of teams.
export const getTeamName = (num: number, teamsList?: unknown[]): string =>
	get(teamsList?.filter(team => get(team, "key") === `frc${num}`)[0], "nickname") ?? "No name available";
import { get, has } from "lodash";

export interface TBAData {
  readonly code: string; // Event key (ex: 2026miket)
  readonly data: unknown; // Raw TBA API response
}

export interface TBATeam {
  key: string;        // ex: "frc67"
  team_number: number;
  nickname?: string;
  name?: string;
}

// Checks if a TBA data object contains an error message
export const isFailed = (data: unknown): boolean => {
  return has(data, "Error");
};

// Gets the error message from a TBA data object
export const getError = (data: unknown): string | undefined => {
  return get(data, "Error");
};

// Gets a team's name given their number and a list of teams
export const getTeamName = (num: number, teamsList?: TBATeam[]): string => {
  if (!teamsList) return "No team list";

  const team = teamsList.find(team => team.key === `frc${num}`);

  return (
    team?.nickname ??
    team?.name ??
    `Team ${num}`
  );
};
