const ONE_MILLION = 1000000;

const isNumberAndFinite = (num) => {
  return !isNaN(num) && isFinite(num);
};

const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = parseFloat(req.body.numWeeks);
  const weeklyRevenue = parseFloat(req.body.weeklyRevenue);

  if (!isNumberAndFinite(numWeeks) || !isNumberAndFinite(weeklyRevenue)) {
    return res
      .status(400)
      .send("numWeeks and weeklyRevenue must be a finite number");
  }

  if (numWeeks * weeklyRevenue < ONE_MILLION) {
    return res.status(400).send("Not a million dollar idea");
  }

  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
