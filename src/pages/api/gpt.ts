import { NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "next-validations";
import { z } from "zod";

import { askQuestion } from "../../ai";
import logger from "../../logger";

const schema = z.object({
  question: z.string().min(6),
});

const validate = withValidation({
  schema,
  type: "Zod",
  mode: "body",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { question, keys } = req.body;
  logger.info(req.body);
  try {
    const msg = await askQuestion(question, keys);
    logger.info({ msg });

    res.status(200).json({ msg });
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

export default validate(handler);
