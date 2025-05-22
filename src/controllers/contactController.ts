import { Request, Response } from "express";
import { identifyContact } from "../services/contactServices";

export async function identify(req: Request, res: Response) {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: "At least one of email or phoneNumber must be provided" });
    }

    const contact = await identifyContact({ email, phoneNumber });

    return res.status(200).json({ contact });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
