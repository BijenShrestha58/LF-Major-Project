export function damageCalc(
  attacker,
  defender,
  move,
  isCritical: boolean = false,
  typeEffectiveness: number = 1
): number {
  let damage: number;
  if (move.moveDamageClass === "physical") {
    damage =
      (((2 * 50) / 5 + 2) * move.power * attacker.attack) /
        defender.defense /
        50 +
      2;
  } else {
    damage =
      (((2 * 50) / 5 + 2) * move.power * attacker.specialAttack) /
        defender.specialDefense /
        50 +
      2;
  }

  // Critical hit
  if (isCritical) {
    damage *= 1.5;
  }

  // Type effectiveness
  damage *= typeEffectiveness;

  // Random factor (between 0.85 and 1.00)
  const randomFactor = Math.random() * (1 - 0.85) + 0.85;
  damage *= randomFactor;

  // STAB (Same Type Attack Bonus)
  // We're simplifying this by assuming STAB is always applied
  // In a real implementation, you'd check if the move type matches one of the attacker's types
  damage *= 1.5;

  // Round down to nearest integer
  return Math.floor(damage);
}
