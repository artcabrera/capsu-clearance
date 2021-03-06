import dbconnect from "../../../lib/dbconnect";
import Request from "../../../models/Request";

export default async function handler(req, res) {
  const { requestId, reason, data, name, course } = req.body;
  await dbconnect();
  const newrequest = new Request({ requestId, reason, data, name, course });
  const response = await newrequest.save();

  res.status(200).json({ response });
}
