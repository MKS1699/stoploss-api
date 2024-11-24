import express from "express";
import { IPOTYPES } from "types/@types";
import {
  addPostIdToIPOByIPOId,
  createNewIPO,
  deleteIPOById,
  findAllIPO,
  findIPOAndUpdate,
  findIPObyId,
  findIPObyName,
  getIPOByUserId,
  getIPOByUserName,
  removePostIdFromIPOByIPOId,
} from "../db/models/ipoModels";

// create new IPO
export async function createIPO(req: express.Request, res: express.Response) {
  try {
    const {
      category,
      dates,
      exPremium,
      linkedPostsId,
      logo,
      lotSize,
      name,
      offerPrice,
      status,
      subscription,
      allotmentLink,
      allotmentStatus,
      ipoPhase,
      createdBy,
    }: IPOTYPES = req.body.ipo;

    const result = await createNewIPO({
      category,
      dates,
      exPremium,
      linkedPostsId,
      logo,
      lotSize,
      name,
      offerPrice,
      status,
      subscription,
      allotmentLink,
      allotmentStatus,
      ipoPhase,
      createdBy,
    });
    if (result.operation == "success") {
      res.status(201).json({
        result,
      });
    } else {
      res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// get IPO
// by id
export async function getIPOById(req: express.Request, res: express.Response) {
  try {
    const { id }: { id: string } = req.body;
    const result = await findIPObyId(id);
    if (result.operation == "success") {
      res.status(200).json({ result });
    } else if (result.operation == "fail") {
      res.status(202).json({ result });
    } else if (result.operation == "error") {
      res.status(400).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// by name
export async function getIPOByName(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name }: { name: string } = req.body;
    const result = await findIPObyName(name);
    if (result.operation == "success") {
      res.status(200).json({ result });
    } else if (result.operation == "fail") {
      res.status(202).json({ result });
    } else if (result.operation == "error") {
      res.status(400).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// get ipo created by userName
export async function getIPOCreatedByUserName(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userName }: { userName: string } = req.body;
    const result = await getIPOByUserName(userName);
    if (result.operation == "success") {
      res.status(200).json({ result });
    } else if (result.operation == "fail") {
      res.status(202).json({ result });
    } else if (result.operation == "error") {
      res.status(400).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}
// get ipo created by userId
export async function getIPOCreatedByUserId(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = req.body;
    const result = await getIPOByUserId(userId);
    if (result.operation == "success") {
      res.status(200).json({ result });
    } else if (result.operation == "fail") {
      res.status(202).json({ result });
    } else if (result.operation == "error") {
      res.status(400).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// update
// update IPO whole
export async function updateIPO(req: express.Request, res: express.Response) {
  try {
    const { id, ipoUpdate }: { id: string; ipoUpdate: IPOTYPES } = req.body;

    const result = await findIPOAndUpdate({ id, ipoUpdate });

    if (result.operation === "success") {
      res.status(201).json({
        result,
      });
    } else if (result.operation === "fail") {
      res.status(202).json({
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// add post Id to IPO
export async function addPostIdToIPO(
  req: express.Request,
  res: express.Response
) {
  try {
    const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    // add match case for id types for security later
    const result = await addPostIdToIPOByIPOId(postId, ipoId);
    if (result.operation === "success") {
      res.status(201).json({ result });
    } else if (result.operation === "duplicate") {
      res.status(202).json({ result });
    } else if (result.operation === "fail") {
      res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// delete postId from the IPO
export async function deletePostIdFromIPO(
  req: express.Request,
  res: express.Response
) {
  try {
    const { postId, ipoId }: { postId: string; ipoId: string } = req.body;
    const result = await removePostIdFromIPOByIPOId(postId, ipoId);
    if (result.operation === "success") {
      res.status(201).json({ result });
    } else if (result.operation === "fail") {
      res.status(200).json({ result });
    } else if (result.operation === null) {
      res.status(202).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// delete IPO
export async function deleteIPO(req: express.Request, res: express.Response) {
  try {
    const { ipoId }: { ipoId: string } = req.body;
    const result = await deleteIPOById(ipoId);
    if (result.operation === "success") {
      res.status(200).json({ result });
    } else if (result.operation === "fail") {
      res.status(202).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}

// get all the IPO
export async function getAllIPO(req: express.Request, res: express.Response) {
  try {
    const result = await findAllIPO();
    if (result.operation == "success") {
      res.status(200).json({ result });
    } else if (result.operation == "fail") {
      res.status(202).json({ result });
    } else if (result.operation == "error") {
      res.status(404).json({ result });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
}
