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
  let name: any = player?.playerName?.split(" ");
  if(name){
  let a: any = name[0]?.charAt(0);
  let b: any = name[1];
  return a + " " + b;
  }
  else{
    return "ab"
  }
}

export function isUnAnnounced(id: string, players: []) {
  return true;
}

