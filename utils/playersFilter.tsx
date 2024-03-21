export function checkwk(p: string) {
  if (p == "wicketkeeper" || p == "wk-batsman" || p == "wicket keeper") {
    return true;
  }
  return false;
}

export function checkar(p: string) {
  if (
    p == "allrounder" ||
    p == "batting allrounder" ||
    p == "bowling allrounder" ||
    p == "all rounder"
  ) {
    return true;
  }
  return false;
}

export function getPlayerName(players: any, id: any) {
  let player: any = {}
  player = players?.find((p: any) => p?.playerId == id)
  if (player?.playerName) {
    let a: any = getShrtName(player?.playerName)
    return a;
  }
  else {
    return "ab"
  }
}

export function getShrtName(name: string) {
  if (name) {
    let names = name.split(" ")
    if (names?.length > 1) {
      let a: any = names[0]?.charAt(0);
      let b: any = names[1];
      return a + " " + b;
    }
    else if (names?.length == 1) {
      return names[0];
    }
    else {
      return names[0] + names[1] + names[2];
    }
  }
  else {
    return "ab"
  }
}

export function isUnAnnounced(id: string, players: []) {
  return true;
}

