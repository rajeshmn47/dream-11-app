export function showBalls(balls: any) {
    const k = balls?.split("|");
    let a;
    if (k?.length < 2) {
        a = balls?.split("|")[0];
    } else if (k?.length < 3) {
        a = balls?.split("|")[1];
    } else {
        a = balls?.split("|")[2];
    }
    let arr = a?.split(" ");
    arr = arr?.filter((a: any) => !(a == ""));
    const rem = 6 - arr?.length;
    if (rem > 0) {
        for (let i = 0; i < rem; i++) {
            arr.push("E");
        }
    }
    if (arr) {
        return arr;
    }
    else {
        return [];
    }
}