interface IRate {
  recentAttempts?: number;
  recentCorrectAttempts?: number;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

export const calculateCorrectRate = ({
  recentAttempts,
  recentCorrectAttempts,
  totalAttempts,
  totalCorrectAttempts,
}: IRate) => {
  let recentRate = null;
  let totalRate = null;

  if (recentAttempts && recentCorrectAttempts)
    recentRate = Math.round((recentCorrectAttempts / recentAttempts) * 100);
  if (totalAttempts)
    totalRate = Math.round((totalCorrectAttempts / totalAttempts) * 100);

  return { recentRate, totalRate };
};
