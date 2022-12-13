import { NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "next-validations";
import { z } from "zod";

import { askQuestion } from "../../ai";

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
  console.log(req.body);
  try {
    const msg = await askQuestion(question, keys);
    console.log({ msg });

    res.status(200).json({ msg });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default validate(handler);
